// react
import { useMutation } from "@tanstack/react-query";

// Custom modules from project
import { getBoardList, handleLogin } from "services/apiService";
import { BoardResponseType, getBoardType } from "types/index";

export const useGetBoardList = () => {
  return useMutation<BoardResponseType, Error, getBoardType>({
    mutationFn: async (boardDt: getBoardType) => await getBoardList(boardDt),
  });
};
