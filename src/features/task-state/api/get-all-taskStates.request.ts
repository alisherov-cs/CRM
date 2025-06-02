import { axiosPrivate } from "@/api";
import { endpoints } from "@/api/endpoints";
import { useApiPagination } from "@/features/pagination/hooks/use-api-pagination";
import { useSearch } from "@/features/search/hooks/useSearch";
import { TApiResponseWithPagination } from "@/types/api.types";
import { useInfiniteQuery } from "@tanstack/react-query";

export type TTaskState = {
  id: string;
  name: string;
};

export const useGetAllTaskStates = () => {
  const { search } = useSearch();
  const { page, limit, infiniteQueryProps } = useApiPagination<TTaskState[]>();

  return useInfiniteQuery({
    queryKey: [endpoints.taskState.list, { search, page, limit }],
    queryFn: async () => {
      return (
        await axiosPrivate.get<TApiResponseWithPagination<TTaskState[]>>(
          endpoints.taskState.list,
          {
            params: { search, page, limit },
          }
        )
      ).data;
    },
    ...infiniteQueryProps,
  });
};
