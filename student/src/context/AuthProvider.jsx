// src/context/AuthContext.js
import api from "@/api/customAxios";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";
import { getToken, getUser } from "@/config/sessionHandler";
import { useQuery } from "@tanstack/react-query";
import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(getToken());
  const authUser = getUser();

  const user = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await api.get(`/student-auth/${authUser.user}`);
      return res.data;
    },
    enabled: !!authUser.user,
  });

  const login = (token) => {
    setAccessToken(token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const logout = async () => {
    setAccessToken("");
    delete api.defaults.headers.common["Authorization"];
    await api.post("/student-auth/logout");

    // Clear user data from local storage or session storage
    localStorage.removeItem("@user");
    localStorage.removeItem("@user_refresh");
    sessionStorage.removeItem("@user");
  };

  // if (user.isLoading) {
  //   return <LoadingSpinner bgColor="#ffffff" />;
  // }
  if (user.isError) {
    return <div className="text-red-500">Error: {user.error.message}</div>;
  }


  return (
    <AuthContext.Provider
      value={{
        user: user?.data?.student,
        school_info: user?.data?.school,
        accessToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
