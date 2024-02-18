/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Modal } from "antd";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import {
  ShoeColor,
  ShoeMaterial,
  ShoeSize,
  ShoeStyle,
} from "../form/shoe.constants";
import { useAddShoeMutation } from "../../redux/features/shoes/shoeApi";
import { toast } from "sonner";

const AddShoeModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const [uploadShoe] = useAddShoeMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const toastId = toast.loading("Adding Product");
    try {
      const values = await form.validateFields();
      console.log("Form values:", values);
      const response = await uploadShoe(values);
      if ((response as any).data.success === true) {
        toast.success("Product added successfully", { id: toastId });
      } else if (
        (response as any)?.error &&
        (response as any)?.error.data &&
        (response as any)?.error.data.errorMessage
      ) {
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
      <Button onClick={showModal} size="large" className=" font-semibold">
        Add Shoes
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
          <Form form={form} layout="vertical" style={{ maxWidth: 600 }}>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Image Url"
              name="imageUrl"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <div className="flex justify-between">
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true }]}
              >
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
                  { required: true },
                ]}
              >
                <InputNumber className="w-[150px] " />
              </Form.Item>
            </div>

            <div className="flex justify-between">
              <Form.Item
                label="Brand"
                name="brand"
                rules={[{ required: true }]}
              >
                <Input className="w-[150px] " />
              </Form.Item>
              <Form.Item
                label="Model"
                name="model"
                rules={[{ required: true }]}
              >
                <Input className="w-[150px] " />
              </Form.Item>
            </div>

            <Form.Item label="Style" name="style" rules={[{ required: true }]}>
              <Select placeholder="Select Style">
                {ShoeStyle.map((shoe, i) => (
                  <Select.Option key={i} value={shoe}>
                    {shoe}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Material"
              name="material"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select Style">
                {ShoeMaterial.map((shoe, i) => (
                  <Select.Option key={i} value={shoe}>
                    {shoe}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Size" name="size" rules={[{ required: true }]}>
              <Select placeholder="Select Size">
                {ShoeSize.map((shoe, i) => (
                  <Select.Option key={i} value={shoe}>
                    {shoe}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <div className="flex justify-between">
              <Form.Item
                label="Color"
                name="color"
                rules={[{ required: true }]}
              >
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

export default AddShoeModal;
