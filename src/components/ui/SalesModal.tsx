/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Modal, Tooltip } from "antd";
import { DatePicker, Form, Input, InputNumber } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import { useAddShoeToSaleMutation } from "../../redux/features/sales/saleApi";
import { toast } from "sonner";

const SalesModal = ({ itemId }: { itemId: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [uploadSale] = useAddShoeToSaleMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const toastId = toast.loading("Adding sale");
    try {
      const values = await form.validateFields();
      const response = await uploadSale(values);

      if ((response as any).data.success === true) {
        toast.success("Product added to sale successfully", { id: toastId });
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
      <Tooltip placement="topLeft" title="Sale the shoe">
        <Button
          onClick={showModal}
          className=" flex justify-center items-center"
        >
          <DollarOutlined />
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
        <Form
          initialValues={{
            ["productId"]: itemId,
          }}
          form={form}
          layout="vertical"
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            hidden
            label="Product Id"
            name="productId"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Buyer Name"
            name="buyerName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <div className="flex  gap-12">
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                {
                  type: "number",
                  min: 1,
                  message: "- Figure & 0 not allowed",
                },
                { required: true },
              ]}
            >
              <InputNumber />
            </Form.Item>{" "}
            <Form.Item
              label="DatePicker"
              name="saleDate"
              rules={[{ required: true }]}
            >
              <DatePicker />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default SalesModal;
