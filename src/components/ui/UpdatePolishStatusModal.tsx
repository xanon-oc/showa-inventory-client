/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Modal, Tooltip } from "antd";
import { Form, Input, Select } from "antd";
import { polishStatus } from "../../types/polishStatus.type";
import { useUpdatePolisStatusMutation } from "../../redux/features/shoes/shoeApi";
import { toast } from "sonner";
import { EditOutlined } from "@ant-design/icons";

const UpdatePolishStatusModal = ({ record }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadPolishStatus] = useUpdatePolisStatusMutation();
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
      const toastId = toast.loading("Updating");
      const values = form.getFieldsValue();
      const data = {
        _id: values._id,
        status: values.status,
      };

      const response: any = await uploadPolishStatus(data);
      if ((response as any).data?.success === true) {
        toast.success("Product status updated successfully", { id: toastId });
      } else if ((response as any)?.error) {
        toast.error((response as any).error.data.errorMessage, {
          id: toastId,
        });
      }

      setIsModalOpen(false);
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip placement="topLeft" title="Update Polish Status">
        <Button
          onClick={showModal}
          className="bg-green-400 text-white hover:bg-white flex justify-center items-center"
        >
          <EditOutlined />
        </Button>
      </Tooltip>
      <Modal
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          style: { backgroundColor: "#52c41a", color: "white" },
        }}
        cancelButtonProps={{
          style: { backgroundColor: "#f5222d", color: "white" },
        }}
      >
        <div className="flex justify-center items-center">
          <Form
            initialValues={{ ["_id"]: record.key, ["status"]: record.status }}
            form={form}
            layout="vertical"
          >
            <Form.Item label="ID" name="_id" hidden>
              <Input />
            </Form.Item>
            <Form.Item
              label="Update Polish Status"
              name="status"
              rules={[{ required: true }]}
            >
              <Select>
                {polishStatus.map((polish, i) => (
                  <Select.Option key={i} value={polish}>
                    {polish}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default UpdatePolishStatusModal;
