/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, FloatButton, Table } from "antd";
import type { TableProps } from "antd";
import { useBulkDeleteMutation } from "../../../redux/features/shoes/shoeApi";
import { useState } from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { toast } from "sonner";
import { useSelector } from "react-redux";

import DefaultImg from "../../../assets/defaulPic.png";
import { DeleteOutlined } from "@ant-design/icons";

interface DataType {
  key: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  color: string;
  size: number;
  style: string;
  material: string;
  imageUrl: string;
  shoeId: string;
}
const ManagementTable = ({
  showHeader,
  toggleHeaderVisibility,
}: {
  showHeader: boolean;
  toggleHeaderVisibility: any;
}) => {
  const [ids, setIds] = useState<string[]>([]);

  const [deleteBulk, { isSuccess: bulkDeleteSuccess }] =
    useBulkDeleteMutation();
  const shoes = useSelector((state: any) => state.shoe.shoes) || [];

  const data: DataType[] = shoes?.data?.result?.map((shoe: any) => ({
    key: shoe._id,
    name: shoe.name,
    price: shoe.price,
    quantity: shoe.quantity,
    brand: shoe.brand,
    color: shoe.color,
    size: shoe.size,
    style: shoe.style,
    material: shoe.material,
    imageUrl: shoe.imageUrl,
    shoeId: shoe.shoeId,
  }));

  const columns: TableProps<DataType>["columns"] = [
    {
      title: (
        <button onClick={toggleHeaderVisibility} className="button">
          <svg
            className="svgIcon"
            viewBox="0 0 512 512"
            height="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
          </svg>
          Filters
        </button>
      ),
      dataIndex: "select",
      render: (_text, record) => (
        <div className="flex justify-center items-center gap-2">
          <Checkbox onChange={(e) => onChange(e, record)} />
          {record.imageUrl ? (
            <img
              className="rounded-lg object-cover"
              src={record.imageUrl}
              alt="Shoe"
              style={{ width: "100px", height: "80px" }}
            />
          ) : (
            <img
              className="rounded-lg"
              src={DefaultImg}
              alt="Default Shoe"
              style={{ width: "100px", height: "80px" }}
            />
          )}
        </div>
      ),
    },
    {
      title: "Details",
      dataIndex: "name",
      render: (text, record) => (
        <div className="flex flex-col">
          <span className="font-medium text-lg">{record.name} </span>
          <span>Brand → {record.brand} </span>
          <span>Quantity → {record.quantity}</span>
          <span className="text-[10px] font-semibold">
            ID → {record.shoeId}
          </span>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text) => (
        <p className="flex gap-1 items-center">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </span>
          <span className="font-semibold">{text}</span>
        </p>
      ),
    },
    {
      title: "Style",
      dataIndex: "style",
    },
    {
      title: "Color",
      dataIndex: "color",
      responsive: ["lg"],
    },
    {
      title: "Size",
      dataIndex: "size",
      responsive: ["lg"],
    },
    {
      title: "Material",
      dataIndex: "material",
      responsive: ["md"],
    },
  ];

  const onChange = (e: CheckboxChangeEvent, record: Record<string, any>) => {
    const selectedId = record.key;

    if (e.target.checked) {
      if (!ids.includes(selectedId)) {
        setIds([...ids, selectedId]);
      }
    } else {
      setIds(ids.filter((id) => id !== selectedId));
    }
  };

  const handleBulkDelete = (value: string[]) => {
    deleteBulk(value);
  };

  if (bulkDeleteSuccess) {
    toast.success("Bulk delete success", { id: 1, duration: 2000 });
  }

  return (
    <>
      <Table
        scroll={{ y: showHeader ? 470 : 570 }}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
      <div className="flex py-2">
        {ids.length > 0 && (
          <FloatButton
            onClick={() => handleBulkDelete(ids)}
            shape="square"
            tooltip={<div>BULK DELETE</div>}
            style={{ right: 80, bottom: 15 }}
            icon={<DeleteOutlined style={{ color: "black" }} />}
            className="hover:bg-white"
          />
        )}
      </div>
    </>
  );
};

export default ManagementTable;
