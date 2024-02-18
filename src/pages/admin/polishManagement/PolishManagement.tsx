/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useGetAllShoeDataQuery } from "../../../redux/features/user/userServices.api";
import moment from "moment";
import UpdatePolishStatusModal from "../../../components/ui/UpdatePolishStatusModal";

interface DataType {
  userId: string;
  polishType: string;
  shineLevel: string;
  instructions: string | undefined;
  status: string;
  requestDate: string;
}

const PolishManagement = () => {
  const { data: shoePolishData, isFetching } =
    useGetAllShoeDataQuery(undefined);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Email",
      dataIndex: "userId",
      key: "userId",
      render: (text) => <a>{text}</a>,
      responsive: ["lg"],
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Polish Type",
      dataIndex: "polishType",
      key: "polishType",
    },
    {
      title: "Shine Level",
      dataIndex: "shineLevel",
      key: "shineLevel",
      responsive: ["sm"],
    },
    {
      title: "Instructions",
      dataIndex: "instructions",
      key: "instructions",
      responsive: ["sm"],
    },

    {
      title: "Request Date",
      dataIndex: "requestDate",
      key: "requestDate",
      responsive: ["lg"],
    },
    {
      title: <p className="flex justify-center">Status Action</p>,
      render: (_text, record) => (
        <Space size="large" className="flex justify-end">
          <div className="grid xl:grid-cols-2 md:grid-cols-2 gap-4 ">
            <UpdatePolishStatusModal record={record} />
          </div>
        </Space>
      ),
    },
  ];

  const sortedData = shoePolishData?.data
    ? [...shoePolishData.data]
    : undefined;
  sortedData?.sort((a, b) => {
    const momentA = moment(a.requestDate);
    const momentB = moment(b.requestDate);
    if (momentA.isBefore(momentB)) {
      return 1;
    } else if (momentA.isAfter(momentB)) {
      return -1;
    }
    return 0;
  });

  const data: DataType[] | undefined | any = sortedData?.map((polish: any) => ({
    key: polish._id,
    userId: polish.userId,
    polishType: (
      <>
        {polish.preferences?.polishType === "premium" && (
          <Tag color={"orange"}>
            {polish.preferences?.polishType.toUpperCase()}
          </Tag>
        )}
        {polish.preferences?.polishType === "regular" && (
          <Tag color={"gray"}>
            {polish.preferences?.polishType.toUpperCase()}
          </Tag>
        )}
      </>
    ),
    shineLevel: (
      <>
        {polish.preferences?.shineLevel === "low" && (
          <Tag color={"red"}>
            {polish.preferences?.shineLevel.toUpperCase()}
          </Tag>
        )}
        {polish.preferences?.shineLevel === "medium" && (
          <Tag color={"gray"}>
            {polish.preferences?.shineLevel.toUpperCase()}
          </Tag>
        )}
        {polish.preferences?.shineLevel === "high" && (
          <Tag color={"orange"}>
            {polish.preferences?.shineLevel.toUpperCase()}
          </Tag>
        )}
      </>
    ),
    instructions: polish.preferences?.instructions,
    status: (
      <>
        {polish.status === "pending" && (
          <Tag color={"orange"}>{polish.status.toUpperCase()}</Tag>
        )}
        {polish.status === "processing" && (
          <Tag color={"geekblue"}>{polish.status.toUpperCase()}</Tag>
        )}
        {polish.status === "completed" && (
          <Tag color={"green"}>{polish.status.toUpperCase()}</Tag>
        )}
      </>
    ),
    requestDate: moment(polish.requestDate).format("MMM Do YY , h:mm a"),
  }));

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data}
      loading={isFetching}
    />
  );
};

export default PolishManagement;
