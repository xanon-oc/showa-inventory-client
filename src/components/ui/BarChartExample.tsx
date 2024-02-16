/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import SalesOverview from "./SalesOverview";

const formatDate = (dateString: any) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    year: "numeric",
    day: "numeric",
  };

  return new Date(dateString).toLocaleDateString(undefined, options);
};

const BarChartComponent = ({ data, dateType }: any) => {
  const formattedData = data.map((item: any) => {
    const formattedItem = { ...item };
    if (dateType === "daily") {
      formattedItem.date = formatDate(item.date);
    }
    return formattedItem;
  });

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [
              value,
              name === "totalQuantity" ? "Total Quantity" : name,
            ]}
          />
          <Legend />
          <Bar dataKey="totalQuantity" name="Total Quantity" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <div>
        <SalesOverview salesPeriod={dateType} />
      </div>
    </div>
  );
};

export default BarChartComponent;
