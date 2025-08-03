// src/components/ProtectedRoute.js
import { useAuth } from "@/context/AuthProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { accessToken } = useAuth();
  return accessToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
