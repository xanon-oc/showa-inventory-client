/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Space, Form, Button, Select, InputNumber, Tooltip } from "antd";
import { useGetAllShoesQuery } from "../../redux/features/shoes/shoeApi";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { getAllShoesWithQueryFilter } from "../../redux/features/shoes/shoesSlice";
import {
  ShoeColor,
  ShoeMaterial,
  ShoeSize,
  ShoeStyle,
} from "../form/shoe.constants";
import AddShoeModal from "./AddShoeModal";
const { Search } = Input;

const SearchField = () => {
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
      <div className="flex">
        <Form
          onFinish={onFinish}
          form={form}
          className="grid grid-cols-2 md:grid md:grid-cols-5 gap-4 "
        >
          <AddShoeModal />

          <div className="flex justify-center items-center h-[40px]">
            <Tooltip title="Min Price">
              <InputNumber
                size="large"
                min={1}
                value={minPrice}
                placeholder="min price"
                onChange={(value) => setMinPrice(value || 1)}
              />
            </Tooltip>
            <p>-</p>
            <Tooltip title="Max Price">
              <InputNumber
                size="large"
                value={maxPrice}
                placeholder="max price"
                onChange={(value) => setMaxPrice(value || 0)}
              />
            </Tooltip>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <Form.Item name="styleFromForm">
              <Select size="large" placeholder="Style">
                {ShoeStyle.map((shoe, i) => (
                  <Select.Option key={i} value={shoe}>
                    {shoe}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="sizeFromForm">
              <Select size="large" placeholder="Size">
                {ShoeSize.map((shoe, i) => (
                  <Select.Option key={i} value={shoe}>
                    {shoe}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <Form.Item name="materialFromForm">
              <Select size="large" placeholder="Material">
                {ShoeMaterial.map((shoe, i) => (
                  <Select.Option key={i} value={shoe}>
                    {shoe}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="colorFromForm">
              <Select size="large" placeholder="Color">
                {ShoeColor.map((shoe, i) => (
                  <Select.Option key={i} value={shoe}>
                    {shoe}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <div className="flex gap-2">
                <Button size="large" htmlType="submit">
                  Filter
                </Button>{" "}
                <Button
                  className="ml-2 md:ml-0 md:mt-0"
                  size="large"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Space>
  );
};

export default SearchField;
