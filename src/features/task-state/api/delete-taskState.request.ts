import { axiosPrivate } from "@/api";
import { endpoints } from "@/api/endpoints";
import { useApiPagination } from "@/features/pagination/hooks/use-api-pagination";
import { useSearch } from "@/features/search/hooks/useSearch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTaskState = () => {
  const { search } = useSearch();
  const { page, limit } = useApiPagination();

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
