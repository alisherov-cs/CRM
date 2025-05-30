import { TableProps } from "antd";

export const tablePropsBuilder = <T>(
  columns: TableProps<T>["columns"],
  data: T[]
) => {
  const tableProps: TableProps<T> = {
    columns,
    dataSource: data || [],
    pagination: {
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    },
    scroll: { x: 800 },
    className: "shadow-sm",
  };

  return tableProps;
};
