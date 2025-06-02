import { axiosPrivate } from "@/api";
import { endpoints } from "@/api/endpoints";
import { useApiPagination } from "@/features/pagination/hooks/use-api-pagination";
import { useSearch } from "@/features/search/hooks/useSearch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type TTaskStateCreateRequest = {
  name: string;
  key: string;
  order: number;
};

export const useCreateTaskState = () => {
  const { search } = useSearch();
  const { page, limit } = useApiPagination();

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
