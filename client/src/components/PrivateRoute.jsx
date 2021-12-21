import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { userInfo, loading } = useSelector((state) => state.userLogin);
  return !userInfo && !loading ? <Navigate to="/login" /> : children;
};

export default PrivateRoute;
