import styled from "styled-components";
import backgroundImg from "image/test.jpg";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  height: 100vh; /* 화면 전체 높이 */
  width: 100vw; /* 화면 전체 너비 */
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-size: cover;

  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.2); /* 폼 배경 */
    height: 30em; /* 폼 높이 */
    width: 25em; /* 폼 너비 */
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15); /* 그림자 */
    border-radius: 2em; /* 둥근 모서리 */
    padding: 30px;
  }

  .login-title1 {
    font-size: 2.5em;
    color: linen;
    text-align: center;
  }

  .login-title2 {
    font-size: 2em;
    margin-bottom: 20px;
    color: darkblue;
    border-bottom: 1px solid #0958d9;
    padding-bottom: 10px;
    text-align: left;
    width: 200px;
  }

  .form-item {
    width: 200px;
  }

  button {
    width: 100%;
    background-color: darkblue;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 30px;
  }

  button:hover {
    background-color: #074ab0;
  }
`;

export { LoginContainer };
