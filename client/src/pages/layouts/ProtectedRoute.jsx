import { UserContext } from "@/context/providers/UserProvider";
import _ from "lodash";
import { use, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, session, school_info } = use(UserContext);

  // Replace this with your actual authentication logic
  const isAuthenticated = !_.isEmpty(user?.id);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
    }
  }, [isAuthenticated, navigate, location]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
