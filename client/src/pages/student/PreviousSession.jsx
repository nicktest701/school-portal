import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { getAllPreviousLevels } from '../../api/levelAPI';
import { getAllTerms } from '../../api/termAPI';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import { UserContext } from '../../context/providers/UserProvider';
import moment from 'moment';

function PreviousSession({ open, setOpen }) {
  const {
    userState: { session },
  } = useContext(UserContext);

  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const [selectedLevel, setSelectedLevel] = useState({
    _id: '',
    levelType: '',
    students: [],
  });

  const [selectedSession, setSelectedSession] = useState({
    termId: '',
    sessionId: '',
    label: '',
  });

  const termOptions = useQuery({
    queryKey: ['terms'],
    queryFn: () => getAllTerms(),
    enabled: !!session?.sessionId,
    select: (sessions) => {
      const filteredSchoolSession = sessions.filter(({ to }) => {
        return moment(new Date(session.to)) > moment(new Date(to));
      });

      return filteredSchoolSession.map(
        ({ termId, sessionId, academicYear, term }) => {
          return {
            termId,
            sessionId,
            label: `${academicYear},${term}`,
          };
        }
      );
    },
  });

  const levelOptions = useQuery({
    queryKey: ['previous-levels', selectedSession?.termId],
    queryFn: () => getAllPreviousLevels(selectedSession),
    enabled: !!selectedSession?.termId,
    select: (levels) => {
      return levels.map(({ _id, level, students }) => {
        return {
          _id,
          levelType: `${level.name}${level.type}`,
          students,
        };
      });
    },
  });

  //LOAD students
  const handleLoadStudents = () => {
    if (selectedLevel?.students?.length !== 0) {
      schoolSessionDispatch({
        type: 'openAddStudentFileDialog',
        payload: { data: selectedLevel?.students, type: 'previous' },
      });
    }
  };

  return (
    <Dialog open={open} maxWidth='xs' fullWidth>
      <DialogTitle> Students from Session</DialogTitle>
      <DialogContent>
        <Stack spacing={2} paddingY={2}>
          <Autocomplete
            size='small'
            options={termOptions.data ?? []}
            noOptionsText='No session available'
            disableClearable={true}
            fullWidth
            value={selectedSession}
            onChange={(e, value) => {
              setSelectedLevel({
                _id: '',
                levelType: '',
                students: [],
              });
              setSelectedSession(value);
            }}
            isOptionEqualToValue={(option, value) =>
              option.termId === value.termId ||
              value.termId === '' ||
              value.termId === null ||
              value.termId === undefined
            }
            getOptionLabel={(option) => option.label || ''}
            renderInput={(params) => (
              <TextField {...params} label='Select School Session' />
            )}
          />
          <Autocomplete
            size='small'
            options={levelOptions?.data ?? []}
            noOptionsText='No level available'
            disableClearable={true}
            fullWidth
            value={selectedLevel}
            onChange={(e, value) => setSelectedLevel(value)}
            isOptionEqualToValue={(option, value) =>
              option._id === value._id ||
              value._id === '' ||
              value._id === null ||
              value._id === undefined
            }
            getOptionLabel={(option) => option.levelType || ''}
            renderInput={(params) => (
              <TextField {...params} label='Select Level' />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button
          variant='contained'
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
