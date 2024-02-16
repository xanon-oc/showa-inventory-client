/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Space, Form, Button, Select, InputNumber, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { getAllShoesWithQueryFilter } from "../../../redux/features/shoes/shoesSlice";
import { useGetAllShoesQuery } from "../../../redux/features/shoes/shoeApi";
import {
  ShoeColor,
  ShoeMaterial,
  ShoeSize,
  ShoeStyle,
} from "../../../components/form/shoe.constants";
const { Search } = Input;

const ManagementHeader = () => {
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(0);
  const [searchTerm, setQuery] = useState("");
  const [style, setStyle] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");

  const { data } = useGetAllShoesQuery({
    searchTerm,
    style,
    size,
    color,
    material,
    minPrice,
    maxPrice,
  });

  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getAllShoesWithQueryFilter(data));
  }, [data, dispatch]);

  const handleReset = () => {
    setQuery("");
    setStyle("");
    setSize("");
    setColor("");
    setMaterial("");
    setMinPrice(1);
    setMaxPrice(0);
    form.resetFields();
    dispatch(getAllShoesWithQueryFilter(data));
  };

  const onSearch = (value: string) => {
    setQuery(value);
  };

  const onFinish = (values: any) => {
    const { styleFromForm, sizeFromForm, colorFromForm, materialFromForm } =
      values;

    if (styleFromForm !== undefined) {
      setStyle(styleFromForm);
    }
    if (sizeFromForm !== undefined) {
      setSize(sizeFromForm);
    }
    if (colorFromForm !== undefined) {
      setColor(colorFromForm);
    }
    if (materialFromForm !== undefined) {
      setMaterial(materialFromForm);
    }
  };

  return (
    <div>
      <Space direction="vertical">
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          style={{
            backgroundColor: "#1677ff",
            color: "white",
            borderRadius: "7px",
          }}
        />
        <div className="grid lg:grid-cols-12">
          <div>
            <Tooltip title="Min Price">
              <InputNumber
                min={1}
                size="large"
                value={minPrice}
                placeholder="min price"
                onChange={(value) => setMinPrice(value || 1)}
              />
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Max Price">
              <InputNumber
                size="large"
                value={maxPrice}
                placeholder="max price"
                onChange={(value) => setMaxPrice(value || 0)}
              />
            </Tooltip>
          </div>
          <Form onFinish={onFinish} form={form} className="flex gap-4">
            <div className="md:flex md:gap-4">
              <Form.Item name="styleFromForm">
                <Select size="large" placeholder="Select Style">
                  {ShoeStyle.map((shoe, i) => (
                    <Select.Option key={i} value={shoe}>
                      {shoe}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="sizeFromForm">
                <Select size="large" placeholder="Select Size">
                  {ShoeSize.map((shoe, i) => (
                    <Select.Option key={i} value={shoe}>
                      {shoe}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="materialFromForm">
                <Select size="large" placeholder="Select Material">
                  {ShoeMaterial.map((shoe, i) => (
                    <Select.Option key={i} value={shoe}>
                      {shoe}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <Form.Item name="colorFromForm">
              <Select size="large" placeholder="Select Color">
                {ShoeColor.map((shoe, i) => (
                  <Select.Option key={i} value={shoe}>
                    {shoe}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button size="large" htmlType="submit">
                Filter
              </Button>
            </Form.Item>{" "}
            <Button
              className="ml-2 md:ml-0 mt-2 md:mt-0"
              size="large"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Form>
        </div>
      </Space>
    </div>
  );
};

export default ManagementHeader;