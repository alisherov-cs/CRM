export type TApiError = {
  message: string;
  status: number;
};

export type TPagination = {
  page: number;
  total: number;
  limit: number;
  hasMore: boolean;
};

export type TApiResponseWithPagination<T> = {
  data: T;
  meta: TPagination;
};
