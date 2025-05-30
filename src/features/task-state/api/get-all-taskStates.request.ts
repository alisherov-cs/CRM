import { axiosPrivate } from "@/api";
import { endpoints } from "@/api/endpoints";
import { TApiResponseWithPagination } from "@/types/api.types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export type TTaskState = {
  id: string;
  name: string;
};

export const useGetAllTaskStates = () => {
  const page = 1;
  const limit = 10;
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

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
    initialPageParam: page,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasMore ? lastPage.meta.page + 1 : undefined,
    getPreviousPageParam: (firstPage) =>
      firstPage.meta.page !== 1 ? firstPage.meta.page - 1 : undefined,
  });
};
