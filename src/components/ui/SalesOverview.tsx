/* eslint-disable @typescript-eslint/no-explicit-any */

const SalesOverview = ({ salesPeriod }: any) => {
  const capitalizeFirstLetter = (string: any) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="p-2 bg-gray-100 rounded-md">
      <h1 className="text-2xl font-semibold mb-2">
        {capitalizeFirstLetter(salesPeriod)} Shoe Sales Overview
      </h1>
      <p className="text-gray-600 mb-4">
        Welcome to the {capitalizeFirstLetter(salesPeriod)} Sales Trends
        section! This bar chart provides a quick snapshot of your {salesPeriod}{" "}
        shoe sales, helping you monitor and analyze trends effectively.
      </p>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">How to Use:</h2>
        <ol className="list-decimal list-inside">
          <li>
            Date Representation: Dates are displayed on the horizontal axis.
            Each bar represents a specific {salesPeriod}.
          </li>
          <li>
            Total Quantity: The vertical axis shows the total quantity of shoes
            sold on each {salesPeriod}.
          </li>
          <li>
            Interact with Bars: Hover over bars to view detailed information,
            such as the exact total quantity for a specific {salesPeriod}.
          </li>
          <li>
            Tooltip: Get additional insights with tooltips, offering a quick
            glance at key data points.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default SalesOverview;
