import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const auth = useAuth();
  let location = useLocation();

  if (!auth.user?.token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return children;
  }
};

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;
