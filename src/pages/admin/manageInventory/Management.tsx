import { useState } from "react";
import ManagementHeader from "./ManagementHeader";
import ManagementTable from "./ManagementTable";

const Management = () => {
  const [showHeader, setShowHeader] = useState(true);

  const toggleHeaderVisibility = () => {
    setShowHeader(!showHeader);
  };

  return (
    <>
      <div
        className={`transition-opacity duration-500 ${
          showHeader ? "opacity-100" : "opacity-0"
        }`}
      >
        {showHeader && <ManagementHeader />}
      </div>
      {/* main area */}
      <ManagementTable
        showHeader={showHeader}
        toggleHeaderVisibility={toggleHeaderVisibility}
      />
    </>
  );
};

export default Management;
