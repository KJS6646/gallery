// 공통 타입(미사용)
export type ResponseType<T> = {
  success: boolean;
  data: T;
  message: string;
};

// ************************** 서버 관련 **************************
/**
 * 로그인 타입
 */
export type LoginResponseType = {
  data: {
    accessToken: string;
    refreshToken: string;
    userId: string;
  };
};
export type LoginType = {
  userId: string;
  password: string;
};
// ************************** 메인 **************************
/**
 * 게시판 타입
 */
export type getBoardType = {
  page: number;
  size: number;
  strDt: string;
  endDt: string;
};

export type BoardType = {
  boardId: string;
  boardTypeCd: string;
  boardTitle: string;
  boardContent: string;
  regId: string;
  regNm: string;
  regDt: string;
  hit: number;
};

export type BoardResponseType = {
  data: {
    totalCount: number;
    boardList: BoardType[];
  };
};
