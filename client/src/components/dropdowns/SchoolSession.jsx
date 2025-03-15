import React, { useContext, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { getAllTerms } from "@/api/termAPI";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { UserContext } from "@/context/providers/UserProvider";

const SchoolSessionDropdown = () => {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const { userDispatch, user } = useContext(UserContext);
  const navigate = useNavigate();
  const [sessionError, setSessionError] = useState("");
  const [session, setSession] = useState({
    termId: "",
    academicYear: "",
    term: "",
  });

  const sessions = useQuery({
    queryKey: ["terms"],
    queryFn: () => getAllTerms(),
    select: (sessions) => {
      if (user?.role === "administrator") {
        return sessions;
      } else {
        return sessions.filter((session) => session.active);
      }
    },
  });
  // const currentPath = state?.path || '/';

  const handleSession = () => {
    setSessionError("");
    if (session.termId === "") {
      setSessionError("Session is Required*");
      return;
    }
    schoolSessionDispatch({ type: "setCurrentSession", payload: session });
    localStorage.setItem("@school_session", JSON.stringify(session));
    userDispatch({ type: "setSession", payload: session });

    navigate("/", {
      replace: true,
    });
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
      onChange={(e, value) => setSession(value)}
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
