import { TPagination } from "@/types/api.types";
import { TableProps } from "antd";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useTablePropsBuilder = <T>(
  columns: TableProps<T>["columns"],
  data: T[],
  meta?: TPagination
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const limit = useMemo(() => {
    const pageSize = searchParams.get("limit");
    if (pageSize) {
      return Number(pageSize);
    }
    return 10;
  }, [searchParams]);

  const tableProps: TableProps<T> = {
    columns,
    dataSource: data || [],
    pagination: {
      pageSize: limit ?? 10,
      showSizeChanger: true,
      showQuickJumper: true,
      total: meta?.total,
      onChange: (page, limit) => {
        searchParams.set("page", page.toString());
        searchParams.set("limit", limit.toString());
        setSearchParams(searchParams, { replace: true });
      },
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    },
    scroll: { x: 800 },
    className: "shadow-sm",
  };

  return tableProps;
};
