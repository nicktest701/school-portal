import React, { useContext, useState } from "react";
import { Add, ArrowForwardRounded, SchoolRounded } from "@mui/icons-material";
import {
  Container,
  Autocomplete,
  Button,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { getAllTerms } from "../api/termAPI";
import { SchoolSessionContext } from "../context/providers/SchoolSessionProvider";
import { UserContext } from "../context/providers/UserProvider";
import AddSchoolSession from "./session/AddSchoolSession";

const SchoolSession = () => {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const { userDispatch, user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAddSession, setOpenAddSession] = useState(false);
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

  const handleOpenAddSession = () => setOpenAddSession(true);

  if (_.isEmpty(user?.id)) {
    return <Navigate to="/login" />;
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        height: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        alignItems="center"
        spacing={2}
        sx={{
          boxShadow: "0 2px 3px rgba(0,0,0,0.1)",
          p: 4,
        }}
      >
        {user?.role === "administrator" && (
          <Button
            color="primary"
            startIcon={<Add />}
            sx={{
              // alignSelf: "flex-end",
              mb: 4,
            }}
            onClick={handleOpenAddSession}
          >
            New School Session
          </Button>
        )}
        <SchoolRounded sx={{ width: 80, height: 80 }} />
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          School Portal
        </Typography>
        <Typography variant="body2" paragraph sx={{ textAlign: "center" }}>
          Choose a session (academic term/semester) to begin with.
        </Typography>
        <Autocomplete
          options={sessions?.data ? sessions.data : []}
          noOptionsText="School Session not found"
          closeText=""
          clearText=" "
          disableClearable={true}
          fullWidth
          value={session}
          onChange={(e, value) => setSession(value)}
          isOptionEqualToValue={(option, value) =>
            value.termId === "" ||
            value.termId === undefined ||
            option.termId === value.termId
          }
          getOptionLabel={(option) =>
            option?.termId !== ""
              ? `${option?.academicYear},${option?.term}`
              : ""
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select School Session"
              error={sessionError !== "" ? true : false}
              helperText={sessionError}
              FormHelperTextProps={{
                sx: { color: "error.main" },
              }}
            />
          )}
        />

        <Button
          variant="contained"
          endIcon={<ArrowForwardRounded />}
          fullWidth
          onClick={handleSession}
        >
          Continue
        </Button>

        <AddSchoolSession open={openAddSession} setOpen={setOpenAddSession} />
      </Stack>
    </Container>
  );
};

export default SchoolSession;
