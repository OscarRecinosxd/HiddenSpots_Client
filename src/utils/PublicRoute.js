import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const auth = useAuth();
  let location = useLocation();

  if (auth.user?.token) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  } else {
    return children;
  }
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
