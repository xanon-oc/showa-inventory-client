import { useState } from "react";
import { Button, Modal, Tooltip } from "antd";
import { Form, Input, InputNumber, Select } from "antd";
import {
  ShoeColor,
  ShoeMaterial,
  ShoeSize,
  ShoeStyle,
} from "../form/shoe.constants";
import { EditOutlined } from "@ant-design/icons";
import { useUpdateShoeMutation } from "../../redux/features/shoes/shoeApi";
import { toast } from "sonner";

const UpdateModal = ({ record }: { record: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [updateShoeData, { isLoading, isSuccess }] = useUpdateShoeMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const toastId = toast.loading("Updating");
    form
      .validateFields()
      .then((values) => {
        const options = { id: record.key, data: values };
        updateShoeData(options);
        if (isLoading) {
          toast.loading("Updating shoe data", { id: toastId });
        }
        if (isSuccess) {
          toast.success("Shoe data Updating", { id: toastId, duration: 2000 });
        }
        setIsModalOpen(false);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip placement="topLeft" title="Update the shoe">
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
            initialValues={{
              ["name"]: record.name,
              ["quantity"]: record.quantity,
              ["brand"]: record.brand,
              ["price"]: record.price,
              ["model"]: record.model,
              ["style"]: record.style,
              ["material"]: record.material,
              ["size"]: record.size,
              ["color"]: record.color,
              ["releaseDate"]: record.releaseDate,
              ["imageUrl"]: record.imageUrl,
            }}
            form={form}
            layout="vertical"
            style={{ maxWidth: 600 }}
          >
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Image Url" name="imageUrl">
              <Input />
            </Form.Item>
            <div className="flex justify-between">
              <Form.Item label="Price" name="price">
                <InputNumber className="w-[150px] mr-4" />
              </Form.Item>
              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[
                  {
                    type: "number",
                    min: 1,
                    message: "- Figure & 0 not allowed",
                  },
                ]}
              >
                <InputNumber className="w-[150px]" />
              </Form.Item>
            </div>

            <div className="flex justify-between">
              <Form.Item label="Brand" name="brand">
                <Input className="w-[150px] " />
              </Form.Item>
              <Form.Item label="Model" name="model">
                <Input className="w-[150px] " />
              </Form.Item>
            </div>

            <Form.Item label="Style" name="style">
              <Select placeholder="Select Style">
                {ShoeStyle.map((shoe, i) => (
                  <Select.Option key={i} value={shoe}>
                    {shoe}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Material" name="material">
              <Select placeholder="Select Style">
                {ShoeMaterial.map((shoe, i) => (
                  <Select.Option key={i} value={shoe}>
                    {shoe}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Size" name="size">
              <Select placeholder="Select Size">
                {ShoeSize.map((shoe, i) => (
                  <Select.Option key={i} value={shoe}>
                    {shoe}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Color" name="color">
              <Select placeholder="Select Color">
                {ShoeColor.map((shoe, i) => (
                  <Select.Option key={i} value={shoe}>
                    {shoe}
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

export default UpdateModal;
