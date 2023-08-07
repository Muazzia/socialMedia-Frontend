import React from "react";
import { Navigate } from "react-router-dom";

const LogoutPrevent = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    return <Navigate to={"/home"} />;
  }

  return children;
};

export default LogoutPrevent;
