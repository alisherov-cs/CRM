import { axiosPrivate } from "@/api";
import { endpoints } from "@/api/endpoints";
import { useQuery } from "@tanstack/react-query";

export const useAuthMe = () => {
  return useQuery({
    queryKey: [endpoints.auth.me],
    queryFn: async () => {
      return (await axiosPrivate.get(endpoints.auth.me)).data;
    },
  });
};
