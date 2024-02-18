/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useGetSpecificShoePolishServiceQuery } from "../../../redux/features/user/userServices.api";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import moment from "moment";

interface DataType {
  userId: string;
  polishType: JSX.Element;
  shineLevel: JSX.Element;
  instructions: string | undefined;
  status: JSX.Element;
  requestDate: string;
}

const PolishManagementTable = () => {
  const currentUser = useAppSelector(selectCurrentUser);

  const { data: shoePolishData, isFetching } =
    useGetSpecificShoePolishServiceQuery((currentUser as any).user.email);

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
      key: "status",
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

  const data: DataType[] | undefined = sortedData?.map((polish: any) => ({
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

  return <Table columns={columns} dataSource={data} loading={isFetching} />;
};

export default PolishManagementTable;
