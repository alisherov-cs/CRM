import { axiosPrivate } from "@/api";
import { endpoints } from "@/api/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TTaskStateCreateRequest } from "./create-taskState.request";
import { useSearchParams } from "react-router-dom";

export type TTaskStateUpdateRequest = {
  taskStateId: string;
  data: Partial<TTaskStateCreateRequest>;
};

export const useUpdateTaskState = () => {
  const page = 1;
  const limit = 10;
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

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
