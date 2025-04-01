// react
import axios from "axios";

// Custom modules from project
import { store } from "../redux/store";
import { logout } from "../redux/slices/userSlice"; // 로그아웃 액션 import
import { Alert } from "antd";

const BASE_URL = "http://211.231.136.205:8080";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 30초 타임아웃 설정
});

// 토큰 갱신 함수
export const refreshTokens = async () => {
  console.log("리프레쉬");
  try {
    const refreshToken = await localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("리프레시 토큰이 없습니다.");
    }

    const response = await axios.post(`${BASE_URL}/account/refresh`, {
      refreshToken,
    });

    const accessToken = response.data.data.accessToken;
    const newRefreshToken = response.data.data.refreshToken;
    // 새로운 토큰 저장
    await localStorage.setItem("accessToken", accessToken);
    await localStorage.setItem("refreshToken", newRefreshToken);
    return accessToken; // 갱신된 액세스 토큰 반환
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    throw error;
  }
};

// Axios 인터셉터 설정
apiClient.interceptors.request.use(async (config) => {
  const accessToken = await localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error.response.request._url);
    if (error.code === "ERR_NETWORK") {
      // 타임아웃 처리
      alert(
        "요청 실패\n서버 응답 시간이 초과되었습니다. 잠시 후 다시 시도해주세요."
      );
      return Promise.reject(error);
    }

    if (error.response) {
      switch (error.response.status) {
        case 401:
          try {
            // 토큰 갱신 시도
            const newAccessToken = await refreshTokens();
            if (newAccessToken) {
              // 갱신된 토큰으로 요청 재시도
              error.config.headers.Authorization = `Bearer ${newAccessToken}`;
              return axios(error.config);
            }
          } catch (refreshError) {
            await localStorage.clear();
            store.dispatch(logout()); // 로그아웃 액션 호출
            console.error("Token refresh failed:", refreshError);
            alert("세션이 만료되었습니다. 다시 로그인해주세요.");
            // navigate("Login" as never);
          }
          break;

        case 400:
          alert("요청 실패" + error.response.data.message);
          break;

        case 403:
          alert("잘못된 접근" + error.response.data.message);
          break;

        case 404:
          alert("404 Not Found" + error.response.data.message);
          break;

        case 408:
          alert("요청시간 초과\n요청이 너무 오래 지연되었습니다.");
          break;

        default:
          alert("요청 실패" + error.response.data.message);
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
