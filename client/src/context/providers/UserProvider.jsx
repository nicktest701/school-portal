import React, { useEffect, useReducer, useState } from "react";
import Swal from "sweetalert2";
import UserReducer from "../reducers/UserReducer";
import PropTypes from "prop-types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  generateNewCurrentLevelDetailsFromLevels,
  getAllLevels,
} from "@/api/levelAPI";
import { getSchoolInfo, logOut } from "@/api/userAPI";
import { getAllNotifications } from "@/api/notificationAPI";
import { useNavigate } from "react-router-dom";
import Loader from "@/config/Loader";
import { getUser, parseJwt } from "@/config/sessionHandler";
import { getItem, saveItem } from "@/config/helper";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";
import useLevel from "@/components/hooks/useLevel";
export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const session = JSON.parse(localStorage.getItem("@school_session"));
  const navigate = useNavigate();
  const [user, setUser] = useState(
    getUser() || {
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
    queryKey: ["school-info"],
    queryFn: getSchoolInfo,
    initialData: {
      unique: "school-info",
      badge: "",
      name: "Frebby School Portal",
      address: "Plot 15,Block D,Kwaprah",
      location: "Kronum-Kwaprah",
      email: "frebbytechconsults@gmail.com",
      phonenumber: "0543772591-0560372844-0239602580",
      motto: "Always at your tech service!",
    },
    onSuccess: (data) => {
      localStorage.setItem("@school_info", JSON.stringify(data));
    },
  });

  const {levelLoading, students } = useLevel();

  //check if current level details exists
  useQuery({
    queryKey: [
      "generate-current-level-details",
      session?.sessionId,
      session?.termId,
    ],
    queryFn: () =>
      generateNewCurrentLevelDetailsFromLevels({
        sessionId: session?.sessionId,
        termId: session?.termId,
      }),
    enabled:
      !!session?.sessionId &&
      !!session?.termId &&
      !!user?.role === "administrator",
  });

  const notifications = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getAllNotifications(),
    initialData: [],
    select: (notifications) => {
      if (notifications === undefined || notifications?.length === 0) {
        return [];
      } else {
        const removedNotifications = getItem("d_no");
        return notifications?.filter((notification) => {
          return !removedNotifications?.includes(notification?._id);
        });
      }
    },
    retry: false,
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (getItem("r_no") === null) {
      saveItem("r_no", []);
    }
    if (getItem("d_no") === null) {
      saveItem("d_no", []);
    }
  }, []);

  const initState = {
    isPending: true,
    session,
    user: user,
    school_info: schoolInfo?.data,
  };

  const [userState, userDispatch] = useReducer(UserReducer, initState);

  const logInUser = (data) => {
    setUser(parseJwt(data));
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
              localStorage.removeItem("@school_session");
              navigate("/login");
              localStorage.removeItem("@user");
              setUser(null);
            },
          }
        );
      }
    });
  };

  if (schoolInfo?.isPending) {
    return <Loader />;
  }

  return (
    <UserContext
      value={{
        userState,
        session,
        user,
        notifications: notifications?.data,
        logInUser,
        logOutUser,
        school_info: schoolInfo?.data,
        userDispatch,
        students
      }}
    >
      {children}
      {isPending && <LoadingSpinner value="Signing Out" />}
      {levelLoading && <LoadingSpinner  />}
    </UserContext>
  );
};
UserProvider.propTypes = {
  children: PropTypes.node,
};

export default UserProvider;
