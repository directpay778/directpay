import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ element }) => {
  const auth = useAuth();

  return auth.isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
