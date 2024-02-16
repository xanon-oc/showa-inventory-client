import React from "react";
import { Table } from "antd";
import type { TableProps } from "antd";

interface DataType {
  key: string;
  name: string;
  role: string;
  email: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    role: "admin",
    email: "hello@gmail.com",
  },
  {
    key: "2",
    name: "John Brown",
    role: "admin",
    email: "hello@gmail.com",
  },
  {
    key: "3",
    name: "John Brown",
    role: "admin",
    email: "hello@gmail.com",
  },
];

const UserManagement: React.FC = () => (
  <Table columns={columns} dataSource={data} />
);

export default UserManagement;
