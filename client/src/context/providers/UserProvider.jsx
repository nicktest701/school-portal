import React, { useEffect, useReducer, useRef, useState } from "react";
import Swal from "sweetalert2";
// import jwtDecode from "jwt-decode";
import UserReducer from "../reducers/UserReducer";
import { useMutation, useQuery } from "@tanstack/react-query";
// import { generateNewCurrentLevelDetailsFromLevels } from "@/api/levelAPI";
import { getUser as getUserAuth, logOut } from "@/api/userAPI";
import { useNavigate } from "react-router-dom";
import { getUser, parseJwt } from "@/config/sessionHandler";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";
import useLevel from "@/components/hooks/useLevel";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getSchool } from "@/api/schoolAPI";
import { getTerm } from "@/api/termAPI";
import api from "@/api/customAxios";

export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshTimeoutRef = useRef(null);

  const [session, setSession] = useLocalStorage("@school_session", null);
  const [schoolInformation, setSchoolInformation] = useLocalStorage(
    "@school_info",
    null
  );

  const navigate = useNavigate();
  const [user, setUser] = useState(
    getUser() || {
      _id: "",
      id: "",
      profile: "",
      username: "",
      firstname: "",
      lastname: "",
      permissions: [],
      role: "",
    }
  );

  const schoolInfo = useQuery({
    queryKey: ["school-info", schoolInformation?.code],
    queryFn: () => getSchool({ code: schoolInformation?.code }),
    initialData: schoolInformation,
    enabled: !!schoolInformation?.code,
  });

  const schoolSession = useQuery({
    queryKey: ["terms/:id", session?.termId],
    queryFn: () => getTerm(session?.termId),
    initialData: session,
    enabled: !!session?.sessionId && !!session?.termId,
    select: (sess) => {
      if (!sess?.termId) return session;
      const { core, ...rest } = sess;

      return {
        ...core,
        ...rest,
      };
    },
  });

  const scheduleRefresh = (token) => {
    if (!token) return;

    const decoded = parseJwt(token);

    // const decoded = jwtDecode(token);
    const expInMs = decoded.exp * 1000;
    const now = Date.now();
    const delay = expInMs - now - 60000; // 1 min before expiration

    if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);

    if (delay > 0) {
      refreshTimeoutRef.current = setTimeout(() => {
        refreshAccessToken();
      }, delay);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const res = await api.post(
        "/users/verify",
        {
          refresh_token: refreshTimeoutRef.current,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = res.data.token;
      setAccessToken(token);
      scheduleRefresh(token);
    } catch (err) {
      console.error("Token refresh failed", err);
      // logOutUser();
      setAccessToken(null);
      if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);

      navigate("/login");
      localStorage.removeItem("@school_info");
      localStorage.removeItem("@user");
      localStorage.removeItem("@school_session");
      setSchoolInformation(null);
      localStorage.removeItem("@user_refresh");
      setSchoolInformation(null);
      setUser(null);
      setSession(null);
    }
  };

  const currentUser = useQuery({
    queryKey: ["user/:id", user?.id],
    queryFn: () => getUserAuth(user?.id),
    initialData: user,
    enabled: !!!user?.id,
  });

  const { levelLoading, students } = useLevel();

  //check if current level details exists
  // useQuery({
  //   queryKey: [
  //     "generate-current-level-details",
  //     session?.sessionId,
  //     session?.termId,
  //   ],
  //   queryFn: () =>
  //     generateNewCurrentLevelDetailsFromLevels({
  //       sessionId: session?.sessionId,
  //       termId: session?.termId,
  //     }),
  //   enabled:
  //     !!session?.sessionId &&
  //     !!session?.termId &&
  //     !!user?.role === "administrator",
  // });

  const initState = {
    isPending: true,
    session: schoolSession.data,
    user: currentUser?.data,
    school_info: schoolInfo?.data,
  };

  const [userState, userDispatch] = useReducer(UserReducer, initState);

  const logInUser = (data) => {
    setUser(parseJwt(data));
  };

  const updateSession = (data) => {
    setSession((prev) => {
      return { ...prev, ...data };
    });
  };

  const updateSchoolInformation = (data) => {
    setSchoolInformation((prev) => {
      return { ...prev, ...data };
    });
  };

  //LOG OUT from System

  const { mutateAsync, isPending } = useMutation({
    mutationFn: logOut,
  });

  const logOutUser = () => {
    Swal.fire({
      title: "Exiting",
      text: "Do you want to exit app?",
      showCancelButton: true,
      backdrop: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutateAsync(
          {},
          {
            onSettled: () => {
              setAccessToken(null);
              if (refreshTimeoutRef.current)
                clearTimeout(refreshTimeoutRef.current);

              navigate("/login");
              localStorage.removeItem("@school_info");
              localStorage.removeItem("@user");
              localStorage.removeItem("@school_session");
              setSchoolInformation(null);
              localStorage.removeItem("@user_refresh");
              setSchoolInformation(null);
              setUser(null);
              setSession(null);
            },
          }
        );
      }
    });
  };

  useEffect(() => {
    const tryInitialRefresh = async () => {
      setLoading(true);
      await refreshAccessToken();
      setLoading(false);
    };
    tryInitialRefresh();
  }, []);

  useEffect(() => {
    const interceptor = api.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    return () => api.interceptors.request.eject(interceptor);
  }, [accessToken]);

  return (
    <UserContext
      value={{
        userState,
        school_info: schoolInfo?.data,
        session: schoolSession?.data,
        user: currentUser?.data,
        updateSession,
        logInUser,
        logOutUser,
        updateSchoolInformation,
        userDispatch,
        students,

        accessToken,
        setAccessToken,
        scheduleRefresh,
        loading,
      }}
    >
      {children}
      {isPending && <LoadingSpinner value="Signing Out" />}
      {loading && <LoadingSpinner />}
      {levelLoading && <LoadingSpinner />}
    </UserContext>
  );
};

export default UserProvider;
