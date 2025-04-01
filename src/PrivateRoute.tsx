import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// 인증 상태를 확인하는 함수 (예: 세션, 쿠키 또는 Redux 상태 활용)
const isAuthenticated = () => {
  // 실제 구현: 예를 들어, 세션 쿠키 또는 상태를 확인
  const user = localStorage.getItem("userId"); // 세션 스토리지에서 유저 정보 확인
  return user !== null;
};

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
