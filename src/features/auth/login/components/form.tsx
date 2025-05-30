import { Button, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useLoginRequest } from "../api/login.request";
import { useNavigate } from "react-router-dom";

interface LoginFormValues {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutateAsync: login, isPending } = useLoginRequest();

  const onFinish = (values: LoginFormValues) => {
    login(values, {
      onSuccess: () => {
        form.resetFields();
        message.success("Login successful!");
        navigate("/");
      },
      onError: () => {
        message.error("Failed to login!");
      },
    });
  };

  return (
    <Form
      form={form}
      name="login"
      className="mt-8 space-y-6"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
      size="large"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          prefix={<UserOutlined className="text-gray-400" />}
          placeholder="Username"
          className="rounded-md"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="text-gray-400" />}
          placeholder="Password"
          className="rounded-md"
        />
      </Form.Item>

      <div className="flex items-center justify-between">
        <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
          Forgot password?
        </a>
      </div>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-md"
          loading={isPending}
        >
          Sign in
        </Button>
      </Form.Item>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="#" className="text-blue-600 hover:text-blue-800">
            Sign up
          </a>
        </p>
      </div>
    </Form>
  );
};
