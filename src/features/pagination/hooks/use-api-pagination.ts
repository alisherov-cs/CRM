import { TApiResponseWithPagination } from "@/types/api.types";
import { useSearchParams } from "react-router-dom";

export const useApiPagination = <T>() => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const limit = searchParams.get("limit") ?? 10;

  return {
    page,
    limit,
    infiniteQueryProps: {
      initialPageParam: page,
      getNextPageParam: (lastPage: TApiResponseWithPagination<T>) =>
        lastPage.meta.hasMore ? lastPage.meta.page + 1 : undefined,
      getPreviousPageParam: (firstPage: TApiResponseWithPagination<T>) =>
        firstPage.meta.page !== 1 ? firstPage.meta.page - 1 : undefined,
    },
  };
};
