import React, { useContext, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { getAllTerms } from "@/api/termAPI";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { UserContext } from "@/context/providers/UserProvider";

const SchoolSessionDropdown = () => {
  const {pathname}=useLocation()
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const {
    userDispatch,
    user,
    session: currentSession,
  } = useContext(UserContext);
 

  const [sessionError, setSessionError] = useState("");
  const [session, setSession] = useState({
    termId: currentSession?.termId,
    academicYear: currentSession?.academicYear,
    term: currentSession?.term,
  });

  const sessions = useQuery({
    queryKey: ["terms"],
    queryFn: () => getAllTerms(),
    select: (sessions) => {
      if (sessions?.length > 0) {
        const modifieldSessions = sessions?.map(({ core, ...rest }) => {
          return {
            ...core,
            ...rest,
          };
        });
        if (user?.role === "administrator") {
          return modifieldSessions;
        } else {
          return modifieldSessions.filter((session) => session.active);
        }
      }
      return [];
    },
  });
  // const currentPath = state?.path || '/';

  const handleChangeSession = (value) => {
    if (currentSession.termId === value?.termId) return;

    Swal.fire({
      title: `You are about to change the current session to ${value?.academicYear},${value?.term}`,
      text: "Do you wish to proceed?",
      showCancelButton: true,
      backdrop: false,
      allowOutsideClick: false,
      // customClass: {
      //   container: "my-swal",
      // },
    })
      .then(({ isConfirmed }) => {
        if (isConfirmed) {
          setSessionError("");
          if (value?.termId === "") {
            setSessionError("Session is Required*");
            return;
          }
          schoolSessionDispatch({
            type: "setCurrentSession",
            payload: value,
          });
          localStorage.setItem("@school_session", JSON.stringify(value));
          userDispatch({ type: "setSession", payload: value });

          setSession(value);
          window.location.href = pathname||"/";
        }
      })
      
  };

  return (
    <Autocomplete
      options={sessions?.data ? sessions.data : []}
      noOptionsText="School Session not found"
      closeText=""
      clearText=" "
      disableClearable={true}
      fullWidth
      size="small"
      value={session}
      onChange={(e, value) => handleChangeSession(value)}
      isOptionEqualToValue={(option, value) =>
        value.termId === "" ||
        value.termId === undefined ||
        option.termId === value.termId
      }
      getOptionLabel={(option) =>
        option?.termId !== "" ? `${option?.academicYear},${option?.term}` : ""
      }
      sx={{ width: 250 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Current Session"
          error={sessionError !== "" ? true : false}
          sx={{ width: 250 }}
          helperText={sessionError}
          FormHelperTextProps={{
            sx: { color: "error.main" },
          }}
        />
      )}
    />
  );
};

export default SchoolSessionDropdown;
