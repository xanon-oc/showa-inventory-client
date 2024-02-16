// import CustomizeShoeManagement from "../pages/user/customizeShoes/CustomizeShoeManagement";
import Management from "../pages/user/manageInventory/Management";
import PolishServiceManagement from "../pages/user/polishManagement/PolishServiceManagement";
import VerifyProductManagement from "../pages/user/verifyProductManagement/VerifyProductManagement";

export const userPaths = [
  {
    name: "INVENTORY",
    path: "shoes-sales-management",
    element: <Management />,
  },
  {
    name: "POLISH SERVICES",
    path: "polish-services",
    element: <PolishServiceManagement />,
  },
  // {
  //   name: "CUSTOMIZE SHOES",
  //   path: "customize-shoes",
  //   element: <CustomizeShoeManagement />,
  // },
  {
    name: "VERIFY PRODUCT",
    path: "verify-product",
    element: <VerifyProductManagement />,
  },
];
