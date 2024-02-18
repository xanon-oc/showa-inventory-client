/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { TUser } from "../redux/features/auth/authSlice";

const SecureRoute = ({ children }: { children: ReactNode }) => {
  const user: TUser = useSelector((state: any) => state?.auth?.user?.user);
  if (user?.role === "seller" || user?.role === "user") {
    return children;
  }

  return <Navigate to="/login" />;
};

export default SecureRoute;
