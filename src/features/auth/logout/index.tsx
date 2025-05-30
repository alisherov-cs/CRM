import { Button, message } from "antd";
import { useLogout } from "./api/logout.request";
import { useNavigate } from "react-router-dom";
import { LogOutIcon } from "lucide-react";
import { Confirm } from "@/components/confirm";

export default function Logout() {
  const navigate = useNavigate();
  const { mutateAsync: logout, isPending } = useLogout();

  const onLogout = () => {
    Confirm({
      title: "Logout",
      content: "Are you sure you want to logout?",
      onOk: () => {
        logout()
          .then(() => {
            navigate("/auth/login");
            message.success("Logout successful!");
          })
          .catch((error) => {
            message.error(error.response.data.message);
          });
      },
    });
  };

  return (
    <Button onClick={onLogout} loading={isPending} danger>
      <span>logout</span>
      <LogOutIcon size={16} />
    </Button>
  );
}
