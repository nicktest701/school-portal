import { UserContext } from "@/context/providers/UserProvider";
import _ from "lodash";
import { use, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, session } = use(UserContext);


  // Replace this with your actual authentication logic
  const isAuthenticated = !_.isEmpty(user?.id);

  const isSessionAuthenticated = !_.isEmpty(session?.termId);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
    }
    if (!isSessionAuthenticated) {
      navigate("/school-session");
    }
  }, [isAuthenticated, isSessionAuthenticated, navigate, location]);

  return isAuthenticated && isSessionAuthenticated ? children : null;
};

export default ProtectedRoute;
