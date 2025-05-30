import { axiosPrivate } from "@/api";
import { endpoints } from "@/api/endpoints";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

type TLoginRequest = {
  username: string;
  password: string;
};

type TLoginResponse = {
  accessToken: string;
};

export const useLoginRequest = () => {
  return useMutation({
    mutationFn: async (data: TLoginRequest) => {
      return await axiosPrivate.post<TLoginResponse>(
        endpoints.auth.login,
        data
      );
    },
    onSuccess: ({ data: { accessToken } }: AxiosResponse<TLoginResponse>) => {
      localStorage.setItem("accessToken", accessToken);
    },
  });
};
