import React, { useContext, useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import SaveAltRounded from '@mui/icons-material/SaveAltRounded';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import { addSubjectsToLevel } from '../../api/levelAPI';
import CustomDialogTitle from '../dialog/CustomDialogTitle';
import LevelSubjectItem from '../items/LevelSubjectItem';
import { getSubjects } from '../../api/subjectAPI';

import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';
import useLevelById from '../hooks/useLevelById';

const AddCurrentSubjects = ({ open, setOpen }) => {
  const queryClient = useQueryClient();
  const {
    schoolSessionState: { currentLevel },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const [subject, setSubject] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  const { subjects, levelLoading } = useLevelById(currentLevel?._id);

  const subjectOptions = useQuery({
    queryKey: ['subjects'],
    queryFn: () => getSubjects(),
    select: (subjects) => {
      return _.map(subjects, 'name');
    },
  });

  useEffect(() => {
    setSubjectList(subjects);
  }, [currentLevel._id, subjects]);

  //Add Subjects to subject list
  const handleAddSubject = () => {
    const newSubjects = _.uniq([...subjectList, ...subject]);
    setSubjectList(newSubjects);

    setSubject([]);
  };

  //Remove subject from class
  const handleRemoveSubject = (searchSubject) => {
    setSubjectList((prev) => {
      const filteredSubjects = prev.filter(
        (subject) => subject !== searchSubject
      );

      return filteredSubjects;
    });
  };

  const { mutateAsync, isLoading } = useMutation(addSubjectsToLevel);

  //Save subjects to db
  const handleSaveSubjects = () => {
    const values = {
      levelId: currentLevel._id,
      subjects: subjectList,
    };

    mutateAsync(values, {
      onSettled: () => {
        queryClient.invalidateQueries(['subjects']);
        queryClient.invalidateQueries(['level', currentLevel._id]);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        setOpen(false);
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth='sm' fullWidth>
      <CustomDialogTitle
        title={`Current Courses for ${currentLevel.type}`}
        onClose={() => setOpen(false)}
      />

      <DialogContent>
        <Stack spacing={2} paddingY={2}>
          <Typography variant='caption'>Add new courses </Typography>

          <Stack direction='row' spacing={2} alignItems='center'>
            <Autocomplete
              multiple={true}
              freeSolo
              fullWidth
              options={subjectOptions.data ?? []}
              disableCloseOnSelect
              getOptionLabel={(option) => option || ''}
              value={subject}
              onChange={(e, value) => setSubject(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Select Course'
                  size='small'
                  // onChange={(e) => setSubject(e.target.value)}
                  focused
                />
              )}
            />
            <Button variant='contained' size='small' onClick={handleAddSubject}>
              Add
            </Button>
          </Stack>
          <List sx={{ maxHeight: 400 }}>
            {levelLoading && <Typography variant='h6'>Loading.... </Typography>}
            <Typography variant='h6'>
              {subjectList.length} Courses Available
            </Typography>
            {subjectList?.map((subject) => {
              return (
                <LevelSubjectItem
                  key={subject}
                  name={subject}
                  removeSubject={handleRemoveSubject}
                />
              );
            })}
          </List>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <LoadingButton
          startIcon={<SaveAltRounded />}
          loading={isLoading}
          variant='contained'
          onClick={handleSaveSubjects}
          disabled={subjectList?.length === 0}
        >
          Save Courses
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddCurrentSubjects;
