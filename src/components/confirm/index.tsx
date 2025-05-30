import { Modal, ModalFuncProps } from "antd";

export const Confirm = (props: ModalFuncProps) => {
  return Modal.confirm({
    okText: "Yes",
    cancelText: "No",
    okButtonProps: { danger: true },
    cancelButtonProps: { type: "primary" },
    ...props,
  });
};
