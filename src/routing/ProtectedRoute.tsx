import { ReactNode } from "react";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector.hook";
type ProtectedRouteProps = {
  children: React.ReactNode | JSX.Element;
};
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuth } = useAppSelector((state) => state.auth);
  let location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
