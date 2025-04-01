// react
import { useMutation } from "@tanstack/react-query";

// Custom modules from project
import { handleLogin } from "services/apiService";
import { LoginResponseType, LoginType } from "types/index";

export const useLogin = () => {
  return useMutation<LoginResponseType, Error, LoginType>({
    mutationFn: async (userInfo: LoginType) => await handleLogin(userInfo),
  });
};
