/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "antd";
import type { TableProps } from "antd";
import DateComponent from "../../../components/ui/DateComponent";

interface DataType {
  key: string;
  totalQuantity: number;
  productDetails: {
    name: string;
    price: number;
    quantity: number;
    releaseDate: string;
    brand: string;
    style: string;
    size: string;
    color: string;
  }[];
  date: string | JSX.Element;
}

const SalesHistoryTable = ({
  mainHistoryData,
  state,
}: {
  mainHistoryData: DataType[];
  state: string;
}) => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: <p className="uppercase">{state}</p>,
      dataIndex: "date",
      key: "date",
    },
    {
      title: "TOTAL QUANTITY",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
    },
    {
      title: "PRODUCT DETAILS",
      dataIndex: "productDetails",
      key: "productDetails",
      render: (productDetails) => (
        <ul>
          {productDetails.map((product: any, index: any) => (
            <li key={index}>
              Name: {product.name}, Price: {product.price},
            </li>
          ))}
        </ul>
      ),
    },
  ];
  let data: DataType[] = [];

  if (state === "daily") {
    data = mainHistoryData?.map((item, index) => ({
      key: item.key || index.toString(), // Use a unique key from your data if available
      totalQuantity: item.totalQuantity,
      productDetails: item.productDetails,
      date: <DateComponent dateString={item.date} />,
    }));
  } else if (state === "weekly") {
    data = mainHistoryData?.map((item, index) => ({
      key: item.key || index.toString(), // Use a unique key from your data if available
      totalQuantity: item.totalQuantity,
      productDetails: item.productDetails,
      date: <p>{item.date}</p>,
    }));
  } else if (state === "monthly") {
    data = mainHistoryData?.map((item, index) => ({
      key: item.key || index.toString(), // Use a unique key from your data if available
      totalQuantity: item.totalQuantity,
      productDetails: item.productDetails,
      date: <p>{item.date}</p>,
    }));
  } else if (state === "yearly") {
    data = mainHistoryData?.map((item, index) => ({
      key: item.key || index.toString(), // Use a unique key from your data if available
      totalQuantity: item.totalQuantity,
      productDetails: item.productDetails,
      date: <p>{item.date}</p>,
    }));
  }

  console.log(state);

  return (
    <Table
      scroll={{ y: 360 }}
      pagination={{ pageSize: 7 }}
      columns={columns}
      dataSource={data}
    />
  );
};

export default SalesHistoryTable;
