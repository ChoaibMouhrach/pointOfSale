import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { fetchUserConnected } from "../features/slices/userSlice";

const AuthLayout = () => {
  const connected = useSelector(fetchUserConnected);

  if (connected) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
