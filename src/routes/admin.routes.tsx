import SalesHistory from "../pages/admin/salesHistory/SalesHistory";
import Management from "../pages/admin/manageInventory/Management";
import PolishManagement from "../pages/admin/polishManagement/PolishManagement";

export const adminPaths = [
  {
    name: "INVENTORY",
    path: "shoes-sales-management",
    element: <Management />,
  },
  {
    name: "POLISH REQUEST",
    path: "polish-request",
    element: <PolishManagement />,
  },
  {
    name: "SALES HISTORY",
    path: "sales-history",
    element: <SalesHistory />,
  },
];
