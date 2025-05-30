import { Form, FormInstance, Input, message } from "antd";
import {
  TTaskStateCreateRequest,
  useCreateTaskState,
} from "../api/create-taskState.request";
import { useTaskStatesFormState } from "../state/form.state";
import { useEffect } from "react";
import { useUpdateTaskState } from "../api/update-taskState.request";
import { getChangedProps } from "@/utils/get-changed-props";
import { isObjectEmpty } from "@/utils/is-object-empty";

type TTaskStateForm = TTaskStateCreateRequest;

type TTaskStateFormProps = {
  form: FormInstance<TTaskStateForm>;
};

export const TaskStateForm = ({ form }: TTaskStateFormProps) => {
  const { data, onClose } = useTaskStatesFormState();
  const { mutateAsync: createTaskState } = useCreateTaskState();
  const { mutateAsync: updateTaskState } = useUpdateTaskState();

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const clear = () => {
    onClose();
    form.resetFields();
  };

  const handleFormSubmit = (values: TTaskStateForm) => {
    const payload = {
      ...values,
      name: values.name.trim(),
      key: values.key.trim(),
      order: +values.order,
    };

    if (data) {
      const diff = getChangedProps(data, payload);

      if (isObjectEmpty(diff)) clear();
      else {
        updateTaskState(
          {
            taskStateId: data.id,
            data: diff,
          },
          {
            onSuccess: () => {
              message.success("Task state updated successfully!");
              clear();
            },
            onError: () => {
              message.error("Failed to update task state!");
            },
          }
        );
      }
    }

    if (!data) {
      createTaskState(payload, {
        onSuccess: () => {
          message.success("Task state created successfully!");
          clear();
        },
        onError: () => {
          message.error("Failed to create task state!");
        },
      });
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFormSubmit}
      className="space-y-4"
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          { required: true, message: "Please enter the task state name" },
        ]}
      >
        <Input placeholder="Enter name" size="large" />
      </Form.Item>
      <Form.Item
        name="key"
        label="Key"
        rules={[{ required: true, message: "Please enter the task state key" }]}
      >
        <Input placeholder="Enter key" size="large" />
      </Form.Item>
      <Form.Item
        name="order"
        label="Order"
        rules={[
          { required: true, message: "Please enter the task state order" },
        ]}
      >
        <Input type="number" placeholder="Enter order" size="large" />
      </Form.Item>
    </Form>
  );
};
