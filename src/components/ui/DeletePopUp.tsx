/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, message, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const cancel = () => {
  message.error("Click on No");
};
const DeletePopUp = ({
  onDelete,
  itemId,
}: {
  onDelete: any;
  itemId: string;
}) => {
  return (
    <Popconfirm
      onConfirm={() => onDelete(itemId)}
      okText="Yes"
      title="Delete the task"
      description="Are you sure to delete this task?"
      onCancel={cancel}
      okButtonProps={{
        style: { backgroundColor: "#f5222d", color: "white" },
      }}
      cancelText="No"
    >
      <Tooltip placement="topLeft" title="Delete the shoe">
        <Button danger className="flex justify-center items-center">
          <DeleteOutlined />
        </Button>
      </Tooltip>
    </Popconfirm>
  );
};

export default DeletePopUp;
