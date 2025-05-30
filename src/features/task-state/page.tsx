import { Button, Drawer, Form, Space } from "antd";
import { TaskStateTable } from "./components/table";
import { TaskStateForm } from "./components/form";
import { useTaskStatesFormState } from "./state/form.state";

export default function TaskState() {
  const [form] = Form.useForm();
  const { data, open, onClose } = useTaskStatesFormState();

  const handleDrawerClose = () => {
    onClose();
    form.resetFields();
  };

  return (
    <div>
      <TaskStateTable />

      <Drawer
        title={data ? "Edit Task State" : "Add New Task State"}
        placement="right"
        width={480}
        onClose={handleDrawerClose}
        open={open}
        extra={
          <Space>
            <Button onClick={handleDrawerClose}>Cancel</Button>
            <Button
              type="primary"
              onClick={() => form.submit()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {data ? "Update" : "Create"}
            </Button>
          </Space>
        }
      >
        <TaskStateForm form={form} />
      </Drawer>
    </div>
  );
}
