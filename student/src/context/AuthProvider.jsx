// src/context/AuthContext.js
import React from "react";
import api from "@/api/customAxios";
import Swal from "sweetalert2";
import {
  deleteUser,
  getUser,
  parseJwt,
  saveUser,
} from "@/config/sessionHandler";

import { createContext, useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import GlobalSpinner from "@/components/spinners/GlobalSpinner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const storedUser = getUser();
  const [user, setUser] = useState(getUser());
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshTimeoutRef = useRef(null);

  // //get user with use query
  // const userInfo = useQuery({
  //   queryKey: ["user", user?._id],
  //   queryFn: async () => {
  //     const res = await api.get(`/student-auth/${user?._id}`);
  //     return res.data;
  //   },
  //   initialData: getUser(),
  //   enabled: !!user?.id,
  //   refetchOnWindowFocus: false,
  //   refetchOnReconnect: false,
  //   refetchOnMount: false,
  // });

  // Only runs once on mount
  useEffect(() => {
    const tryInitialRefresh = async () => {
      setLoading(true);

      if (user?.id) {
        await refreshAccessToken();
      }
      setLoading(false);
    };
    tryInitialRefresh();
  }, []);

  // Request interceptor
  useEffect(() => {
    const interceptor = api.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
          api.defaults.headers.Authorization = `Bearer ${accessToken}`;
          axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => api.interceptors.request.eject(interceptor);
  }, [accessToken]);

  const scheduleRefresh = (token) => {
    if (!token) return;

    const decoded = parseJwt(token);
    const expInMs = decoded.exp * 1000;
    const now = Date.now();
    const delay = expInMs - now - 60000; // 1 min buffer

    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    if (delay > 0) {
      refreshTimeoutRef.current = setTimeout(() => {
        refreshAccessToken();
      }, delay);
    }
  };

  const refreshAccessToken = async () => {
    try {
      setLoading(true);
      const res = await api.post(
        "/student-auth/refresh",
        {},
        { withCredentials: true }
      );

      const token = res.data.token;
      const details = res.data.data;
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        axios.defaults.headers.Authorization = `Bearer ${token}`;

        const parsed = parseJwt(token);

        setUser(details);
        saveUser({
          id: parsed?.id,
          _id: parsed?._id,
        });

        setAccessToken(token);
        scheduleRefresh(token);
      }
    } catch (err) {
      console.error("Error refreshing access token:", err);
      handleAuthError();
    } finally {
      setLoading(false);
    }
  };

  const handleAuthError = () => {
    deleteUser();
    setUser(null);
    setAccessToken(null);

    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    Swal.fire({
      title: "Session Expired",
      text: "Please log in again.",
      icon: "warning",
      confirmButtonText: "Login",
    }).then(() => {
      location.href = "/login";
    });
  };

  const login = (token, details) => {
    const parsed = parseJwt(token);

    setUser(details);
    saveUser({
      id: parsed?.id,
      _id: parsed?._id,
    });

    setAccessToken(token);
    scheduleRefresh(token);
  };

  const logout = async () => {
    try {
      await api.post("/student-auth/logout");
    } finally {
      deleteUser();
      setUser(null);
      setAccessToken(null);

      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }

      delete api.defaults.headers.common["Authorization"];
    }
  };
  // console.log(user.student);

  return (
    <AuthContext.Provider
      value={{
        user: user?.student,
        school_info: user?.school,
        accessToken,
        loading,
        login,
        logout,
      }}
    >
      {children}
      {loading && <GlobalSpinner bgColor="#ffffff" />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
