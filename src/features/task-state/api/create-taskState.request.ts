import { axiosPrivate } from "@/api";
import { endpoints } from "@/api/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export type TTaskStateCreateRequest = {
  name: string;
  key: string;
  order: number;
};

export const useCreateTaskState = () => {
  const page = 1;
  const limit = 10;
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TTaskStateCreateRequest) => {
      return (await axiosPrivate.post(endpoints.taskState.list, data)).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [endpoints.taskState.list, { search, page, limit }],
      });
    },
  });
};
