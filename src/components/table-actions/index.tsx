import { Button, Tooltip } from "antd";

type TEditRecordProps = {
  onEdit: () => void;
};

export const EditRecord = ({ onEdit }: TEditRecordProps) => {
  return (
    <Tooltip title="Edit">
      <Button onClick={onEdit} type="primary" size="small" className="p-0">
        Edit
      </Button>
    </Tooltip>
  );
};

type TDeleteRecordProps = {
  onDelete: () => void;
};

export const DeleteRecord = ({ onDelete }: TDeleteRecordProps) => {
  return (
    <Tooltip title="Delete">
      <Button
        danger
        onClick={onDelete}
        type="primary"
        size="small"
        className="p-0"
      >
        Delete
      </Button>
    </Tooltip>
  );
};
