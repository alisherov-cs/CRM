export type TApiError = {
  message: string;
  status: number;
};

export type TApiResponseWithPagination<T> = {
  data: T;
  meta: {
    page: number;
    total: number;
    limit: number;
    hasMore: boolean;
  };
};
