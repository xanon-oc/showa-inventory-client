import { Tabs } from "antd";
import { useGetSalesHistoryQuery } from "../../../redux/features/sales/salesHistoryApi";
import Loader from "../../../components/ui/Loader";
import { useState } from "react";
import { historyFuncForHistorySales } from "./SalesHistory.func";
import BarChartComponent from "../../../components/ui/BarChartExample";

const SalesHistory = () => {
  const [state, setState] = useState("daily");
  const { data, isLoading } = useGetSalesHistoryQuery(state);

  if (isLoading) {
    return <Loader />;
  }
  const mainHistoryData = data?.data;

  const items = [
    {
      label: "Daily",
      name: "daily",
      key: "1",
      children: (
        <BarChartComponent
          data={mainHistoryData}
          title="Daily Sales"
          dateType="daily"
        />
      ),
    },
    {
      label: "Weekly",
      name: "weekly",
      key: "2",
      children: (
        <BarChartComponent
          data={mainHistoryData}
          title="Weekly Sales"
          dateType="weekly"
        />
      ),
    },
    {
      label: "Monthly",
      name: "monthly",
      key: "3",
      children: (
        <BarChartComponent
          data={mainHistoryData}
          title="Monthly Sales"
          dateType="monthly"
        />
      ),
    },
    {
      label: "Yearly",
      name: "yearly",
      key: "4",
      children: (
        <BarChartComponent
          data={mainHistoryData}
          title="Yearly Sales"
          dateType="yearly"
        />
      ),
    },
  ];

  const handleTabChange = (key: string) => {
    historyFuncForHistorySales(key, setState);
  };

  return (
    <Tabs
      onChange={handleTabChange}
      defaultActiveKey="1"
      centered
      items={items.map((item) => {
        return {
          label: item.label,
          key: item.key,
          children: item.children,
        };
      })}
    />
  );
};

export default SalesHistory;
