import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const auth = useAuth();
  let location = useLocation();

  if (auth.user?.role !== 1) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  } else {
    return children;
  }
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
