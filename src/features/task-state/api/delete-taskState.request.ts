import { axiosPrivate } from "@/api";
import { endpoints } from "@/api/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useDeleteTaskState = () => {
  const page = 1;
  const limit = 10;
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskStateId: string) => {
      return await axiosPrivate.delete(endpoints.taskState.one(taskStateId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [endpoints.taskState.list, { search, page, limit }],
      });
    },
  });
};
