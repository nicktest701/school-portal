import { useAuth } from "@/hooks/useAuth";
import _ from "lodash";
import { useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, session } = useAuth();

  const isAuthenticated = !_.isEmpty(user?.id);
  const isSessionAuthenticated = !_.isEmpty(session?.termId);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location }, replace: true });
    }

    if (!isSessionAuthenticated) {
      navigate("/school-session", { replace: true });
    }
  }, [isAuthenticated, isSessionAuthenticated, navigate, location]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!isSessionAuthenticated) {
    return <Navigate to="/school-session" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
