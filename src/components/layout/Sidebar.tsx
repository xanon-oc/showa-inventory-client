/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, FloatButton, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import Logo from "../../assets/pngwing.com.png";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  TUser,
  logOut,
  selectCurrentUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/veryfyToken";
import { TSidebarItem, userRole } from "../../types";
import { userPaths } from "../../routes/user.routes";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);
  const { user: currentUser }: any = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  let user;

  if (token) {
    user = verifyToken(token);
  }

  let sidebarItems: TSidebarItem[] = [];

  switch ((user as TUser)!.role) {
    case userRole.seller:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.seller);
      break;
    case userRole.user:
      sidebarItems = sidebarItemsGenerator(userPaths, userRole.user);
      break;

    default:
      break;
  }
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };
  return (
    <Sider
      breakpoint="xl"
      collapsedWidth="0"
      style={{ backgroundColor: "#fff" }}
    >
      <div
        className="demo-logo-vertical flex flex-col gap-4"
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "3rem",
        }}
      >
        <img src={Logo} alt="" />
        <p className="text-black bg-gray-200 p-1 px-2 rounded-xl flex justify-center items-center gap-2">
          <span className="bg-white py-1 rounded-full px-2">
            <UserOutlined />
          </span>

          <Badge count={currentUser?.role} showZero color="#faad14">
            {currentUser?.email}
          </Badge>
        </p>
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
      <FloatButton
        onClick={handleLogout}
        shape="square"
        tooltip={<div>Logout</div>}
        style={{ right: 30, bottom: 15 }}
        icon={<LogoutOutlined style={{ color: "black" }} />}
        className="hover:bg-white"
      />
    </Sider>
  );
};

export default Sidebar;
