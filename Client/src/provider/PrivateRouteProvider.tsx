import React, { ReactNode } from "react";
import { TUserRole } from "../types/user.type";
import { useCurrentUser } from "./CurrentUserProvider";
import Loading from "../components/ui/Loading";
import { Navigate, useNavigate } from "react-router-dom";
import RouteLoading from "../components/ui/RouteLoading";

interface IProps {
  roles: TUserRole[];
  children: ReactNode;
}

const PrivateRouteProvider = ({ roles, children }: IProps) => {
  const { isLoading, user } = useCurrentUser();
  if (isLoading) return <RouteLoading />;
  else if (!user || !roles.includes(user.role)) return <Navigate to={"/"} />;
  return children;
};

export default PrivateRouteProvider;
