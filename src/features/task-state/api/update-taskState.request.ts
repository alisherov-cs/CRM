import { axiosPrivate } from "@/api";
import { endpoints } from "@/api/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TTaskStateCreateRequest } from "./create-taskState.request";
import { useSearch } from "@/features/search/hooks/useSearch";
import { useApiPagination } from "@/features/pagination/hooks/use-api-pagination";

export type TTaskStateUpdateRequest = {
  taskStateId: string;
  data: Partial<TTaskStateCreateRequest>;
};

export const useUpdateTaskState = () => {
  const { search } = useSearch();
  const { page, limit } = useApiPagination();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskStateId, data }: TTaskStateUpdateRequest) => {
      return await axiosPrivate.patch(
        endpoints.taskState.one(taskStateId),
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [endpoints.taskState.list, { search, page, limit }],
      });
    },
  });
};
