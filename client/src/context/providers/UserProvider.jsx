import React, { useReducer, useState } from "react";
import Swal from "sweetalert2";
import UserReducer from "../reducers/UserReducer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { generateNewCurrentLevelDetailsFromLevels } from "@/api/levelAPI";
import { getUser as getUserAuth, logOut } from "@/api/userAPI";
import { useNavigate } from "react-router-dom";
import { getUser, parseJwt } from "@/config/sessionHandler";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";
import useLevel from "@/components/hooks/useLevel";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getSchool } from "@/api/schoolAPI";
import { getTerm } from "@/api/termAPI";
export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
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
    enabled: !!schoolInformation?._id,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  const schoolSession = useQuery({
    queryKey: ["terms/:id", session?.termId],
    queryFn: () => getTerm(session?.termId),
    initialData: session,
    enabled: !!schoolInfo?._id && !!session?.sessionId && !!session?.termId,
    select: (sess) => {
      if (!sess?.termId) return session;
      const { core, ...rest } = sess;

      return {
        ...core,
        ...rest,
      };
    },
  });

  const currentUser = useQuery({
    queryKey: ["user/:id", user?._id],
    queryFn: () => getUserAuth(user?._id),
    initialData: user,
    enabled: !!schoolInfo?._id,
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
    session,
    user,
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
              localStorage.removeItem("@school_info");
              localStorage.removeItem("@school_session");
              navigate("/login");
              setSchoolInformation(null);
              localStorage.removeItem("@user");
              setUser(null);
            },
          }
        );
      }
    });
  };

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
      }}
    >
      {children}
      {isPending && <LoadingSpinner value="Signing Out" />}
      {levelLoading && <LoadingSpinner />}
    </UserContext>
  );
};

export default UserProvider;
