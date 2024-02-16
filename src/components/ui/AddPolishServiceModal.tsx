/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Modal } from "antd";
import { Form, Input, Select } from "antd";
import {
  polishType,
  shineLevel,
} from "../../pages/user/polishManagement/Polish.constant";
import TextArea from "antd/es/input/TextArea";
import { useAddShoePolishServiceMutation } from "../../redux/features/user/userServices.api";
import { toast } from "sonner";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

const AddPolishServiceModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const [uploadShoePolishService, { isLoading }] =
    useAddShoePolishServiceMutation();
  const currentUser = useAppSelector(selectCurrentUser);

  const showModal = () => {
    setIsModalOpen(true);
  };

  if (isLoading) {
    toast.loading("Uploading shoe polish request data", { id: 3 });
  }

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const preferences = {
        userId: values.userId,
        preferences: {
          polishType: values.polishType,
          shineLevel: values.shineLevel,
          instructions: values.instructions,
        },
      };

      const result: any = await uploadShoePolishService(preferences);

      if (result?.data?.success) {
        toast.success(result.data.message, { id: 3, duration: 2000 });
      }

      if (result?.error) {
        toast.error(result.error.data.message, { id: 3, duration: 2000 });
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
      <Button
        onClick={showModal}
        size="large"
        className="uppercase font-semibold"
      >
        Add Polish Request
      </Button>

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
          <Form form={form} layout="vertical">
            <Form.Item
              hidden
              label="User ID"
              name="userId"
              initialValue={(currentUser as any).user.email}
              rules={[{ required: true }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Polish Type"
              name="polishType"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select Style">
                {polishType.map((polish, i) => (
                  <Select.Option key={i} value={polish}>
                    {polish}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Shine Level"
              name="shineLevel"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select Style">
                {shineLevel.map((shine, i) => (
                  <Select.Option key={i} value={shine}>
                    {shine}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Instructions"
              name="instructions"
              style={{ width: "40vh" }}
            >
              <TextArea rows={4} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default AddPolishServiceModal;
