import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { getPreviousLevels } from "@/api/levelAPI";
import { getAllSessions } from "@/api/termAPI";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";

function PreviousSession({ open, setOpen }) {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const [selectedLevel, setSelectedLevel] = useState({
    _id: "",
    file: "",
    data: [],
  });

  const [selectedSession, setSelectedSession] = useState({
    termId: "",
    sessionId: "",
    academicYear: "",
    term: "",
  });

  const termOptions = useQuery({
    queryKey: ["previous-sessions"],
    queryFn: () => getAllSessions(),
    initialData: [],

  });

  const levelOptions = useQuery({
    queryKey: [
      "previous-sessions",
      selectedSession.sessionId,
      selectedSession._id,
    ],
    queryFn: () =>
      getPreviousLevels(
        selectedSession.sessionId,
        selectedSession._id,
        "student"
      ),
    enabled: !!selectedSession.sessionId && !!selectedSession._id,
    initialData: [],
  });

  //LOAD students
  const handleLoadStudents = () => {
    if (selectedLevel?.data?.length === 0) {
      Swal.fire({
        icon:'info',
        title: "Empty Data Set",
        text: "No student found!",
        backdrop: false,
      });
      return;
    }
    schoolSessionDispatch({
      type: "openAddStudentFileDialog",
      payload: { data: selectedLevel?.data, type: "previous" },
    });
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle> Students from previous sessions</DialogTitle>
      <DialogContent>
        <Stack spacing={2} paddingY={2}>
          <Autocomplete
            size="small"
            options={termOptions.data}
            noOptionsText="No session available"
            loading={termOptions.isPending}
            loadingText="Loading Sessions.Please wait..."
            disableClearable={true}
            fullWidth
            value={selectedSession}
            onChange={(e, value) => {
              setSelectedLevel({
                _id: "",
                levelName: "",
                students: [],
              });
              setSelectedSession(value);
            }}
            isOptionEqualToValue={(option, value) =>
              option?.termId === value?.termId ||
              value?.termId === "" ||
              value?.termId === null ||
              value?.termId === undefined
            }
            getOptionLabel={(option) =>
              option?.termId !== "" ? `${option?.name}` : ""
            }
            renderInput={(params) => (
              <TextField {...params} label="Select Previous Session" />
            )}
          />
          <Autocomplete
            size="small"
            options={levelOptions?.data ?? []}
            noOptionsText="No level available"
            loading={levelOptions.isPending}
            loadingText="Loading Levels.Please wait..."
            disableClearable={true}
            fullWidth
            value={selectedLevel}
            onChange={(e, value) => setSelectedLevel(value)}
            isOptionEqualToValue={(option, value) =>
              option._id === value._id ||
              value._id === "" ||
              value._id === null ||
              value._id === undefined
            }
            getOptionLabel={(option) => option.file || ""}
            renderInput={(params) => (
              <TextField {...params} label="Select Level" />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleLoadStudents}
          disabled={!selectedLevel?._id}
        >
          Load Students
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PreviousSession;
