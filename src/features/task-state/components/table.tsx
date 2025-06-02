import { Button, message, Space, Table } from "antd";
import {
  TTaskState,
  useGetAllTaskStates,
} from "../api/get-all-taskStates.request";
import { DownloadOutlined, FilterOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { Search } from "@/features/search";
import { useTaskStatesFormState } from "../state/form.state";
import {
  Confirm,
  DeleteRecord,
  EditRecord,
  TableInterval,
  TableTitle,
} from "@/components";
import { useDeleteTaskState } from "../api/delete-taskState.request";
import { useTablePropsBuilder } from "@/features/pagination/hooks/use-table-props-builder";

export const TaskStateTable = () => {
  const { onOpen } = useTaskStatesFormState();
  const { data: taskStates, isLoading } = useGetAllTaskStates();
  const { mutateAsync: deleteTaskState } = useDeleteTaskState();

  const meta = useMemo(() => taskStates?.pages?.[0].meta, [taskStates]);
  const data = useMemo(() => taskStates?.pages?.[0].data, [taskStates]);

  const onDelete = (id: string) => {
    Confirm({
      title: "Delete task state",
      content: "Are you sure you want to delete this task state?",
      onOk: async () =>
        deleteTaskState(id, {
          onSuccess: () => {
            message.success("Task state deleted successfully!");
          },
          onError: () => {
            message.error("Failed to delete task state!");
          },
        }),
    });
  };

  const columns = [
    {
      title: "#",
      key: "#",
      width: 80,
      render: (_, __, index) =>
        meta && (meta?.page - 1) * meta?.limit + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      render: (record) => (
        <Space size="small">
          <EditRecord onEdit={() => onOpen(record)} />
          <DeleteRecord onDelete={() => onDelete(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <TableTitle
            title="Task States"
            description="Manage your task states and its information"
          />
          <div className="flex gap-2">
            <Button icon={<FilterOutlined />} className="flex items-center">
              Filters
            </Button>
            <Button icon={<DownloadOutlined />} className="flex items-center">
              Export
            </Button>
            <Button
              onClick={() => onOpen()}
              type="primary"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add Task State
            </Button>
          </div>
        </div>

        <Search />
      </div>

      <div className="table-container">
        <Table
          loading={isLoading}
          {...useTablePropsBuilder<TTaskState>(columns, data ?? [], meta)}
        />
      </div>

      <TableInterval
        title="task states"
        length={data?.length}
        total={meta?.total}
      />
    </>
  );
};
