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

  const [uploadShoePolishService] = useAddShoePolishServiceMutation();
  const currentUser = useAppSelector(selectCurrentUser);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const toastId = toast.loading("Adding polish request");
    try {
      await form.validateFields();
      const preferences = {
        userId: form.getFieldValue("userId"),
        preferences: {
          polishType: form.getFieldValue("polishType"),
          shineLevel: form.getFieldValue("shineLevel"),
          instructions: form.getFieldValue("instructions"),
        },
      };

      const response: any = await uploadShoePolishService(preferences);
      if ((response as any).data?.success === true) {
        toast.success((response as any).data?.message, { id: toastId });
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
