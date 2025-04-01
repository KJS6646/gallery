// nodejs
import { Buffer } from "buffer";

// Custom modules from project
import apiClient from "services/apiClient";
import {
  BoardResponseType,
  getBoardType,
  LoginResponseType,
  LoginType,
} from "types/index";

// 로그인 요청
export const handleLogin = async (userInfo: LoginType) => {
  return await apiClient
    .post<LoginResponseType>("/account/login", userInfo)
    .then((res) => res.data);
};

//게시판 리스트
export const getBoardList = async (boardDt: getBoardType) => {
  return await apiClient
    .post<BoardResponseType>("/board/getBoardList", boardDt)
    .then((res) => res.data);
};
