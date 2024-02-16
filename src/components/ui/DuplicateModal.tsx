/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Modal, Tooltip } from "antd";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import {
  ShoeColor,
  ShoeMaterial,
  ShoeSize,
  ShoeStyle,
} from "../form/shoe.constants";
import { CopyOutlined } from "@ant-design/icons";
import { useAddShoeMutation } from "../../redux/features/shoes/shoeApi";
import { toast } from "sonner";

const DuplicateModal = ({ record }: { record: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [uploadShoe, { isLoading, isSuccess }] = useAddShoeMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        uploadShoe(values);
        setIsModalOpen(false);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    toast.loading("Uploading shoe data", { id: 3 });
  }
  if (isSuccess) {
    toast.success("Shoe data uploaded", { id: 3, duration: 2000 });
  }
  return (
    <>
      <Tooltip placement="topLeft" title="Duplicate and edit">
        <Button
          onClick={showModal}
          className="bg-cyan-400 text-white hover:bg-white flex justify-center items-center"
        >
          <CopyOutlined />
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

            <div className="flex justify-between gap-2">
              <Form.Item label="Brand" name="brand">
                <Input />
              </Form.Item>
              <Form.Item label="Model" name="model">
                <Input />
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
            <div className="flex justify-between">
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
              <Form.Item
                label="Release Date"
                name="releaseDate"
                rules={[{ required: true }]}
              >
                <DatePicker />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default DuplicateModal;
