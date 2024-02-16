/* eslint-disable @typescript-eslint/no-explicit-any */
const DateComponent = ({ dateString }: { dateString: any }) => {
  const dateObject = new Date(dateString);

  // Format the date to display only year, month, and day
  const formattedDate = dateObject.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return <span>{formattedDate}</span>;
};

export default DateComponent;
