import React, { use, useState } from "react";
import { Add, ArrowForwardRounded, SchoolRounded } from "@mui/icons-material";
import {
  Container,
  Autocomplete,
  Button,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { getAllTerms } from "../api/termAPI";
import { SchoolSessionContext } from "../context/providers/SchoolSessionProvider";
import AddSchoolSession from "./session/AddSchoolSession";
import { useAuth } from "@/hooks/useAuth";

const SchoolSession = () => {
  const [loading, setLoading] = useState(false);
  const { schoolSessionDispatch } = use(SchoolSessionContext);
  const { user, updateSession } = useAuth();
  const navigate = useNavigate();
  const [openAddSession, setOpenAddSession] = useState(false);
  const [sessionError, setSessionError] = useState("");
  const [session, setSession] = useState({
    termId: "",
    academicYear: "",
    term: "",
  });

  const sessions = useQuery({
    queryKey: ["terms", user?._id],
    queryFn: () => getAllTerms(),
    enabled: !!user?._id,
    refetchOnMount: false,
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

  const handleSession = () => {
    setLoading(true);
    setSessionError("");
    if (session?.termId === "") {
      setSessionError("Session is Required*");
      return;
    }

    schoolSessionDispatch({
      type: "setCurrentSession",
      payload: session,
    });
    updateSession(session);
    navigate("/", {
      replace: true,
    });
    setLoading(false);
  };

  const handleOpenAddSession = () => setOpenAddSession(true);

  // if (mainSession?.termId) {
  //   return <Navigate to="/" />;
  // }

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
          loading={loading}
          disabled={!session?.termId}
        >
          Continue
        </Button>

        <AddSchoolSession open={openAddSession} setOpen={setOpenAddSession} />
      </Stack>
    </Container>
  );
};

export default SchoolSession;
