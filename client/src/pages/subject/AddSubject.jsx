import React, { useContext, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Autocomplete,
  TextField,
  List,
  Alert,
  Typography,
  Divider,
  ListItem,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { SUBJECTS } from '../../mockup/columns/sessionColumns';

import SubjectItem from '../../components/list/SubjectItem';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import { postSubjects } from '../../api/subjectAPI';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';

const AddSubject = ({ open, setOpen }) => {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const queryClient = useQueryClient();
  const [subjects, setSubjects] = useState([]);
  const [msg, setMsg] = useState({
    severity: '',
    text: '',
  });
  const [subjectList, setSubjectList] = useState([]);

  const appendSubjectCode = (subject) => {
    const newSubjects = _.values(
      _.merge(_.keyBy([...subjectList, subject], 'name'))
    );
    setSubjectList(newSubjects);
  };

  const handleAddSubject = () => {
    const newSubjects = _.values(
      _.merge(_.keyBy([...subjectList, ...subjects], 'name'))
    );

    setSubjectList(newSubjects);

    setSubjects([]);
  };

  const handleRemoveSubject = (searchSubject) => {
    setSubjectList((prev) => {
      const filteredSubjects = prev.filter(
        ({ name }) => name !== searchSubject
      );

      return filteredSubjects;
    });
  };

  const handleIsCoreSubject = (searchSubject, isCore) => {
    
    const filteredSubject = subjectList.find(
      ({ name }) => name === searchSubject
    );

    filteredSubject.isCore = isCore;

    const newSubjects = _.values(
      _.merge(_.keyBy([...subjectList, filteredSubject], 'name'))
    );

    setSubjectList(newSubjects);
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: postSubjects,
  });

  const handleSaveSubjects = () => {
    setMsg({ text: '' });

    mutateAsync(subjectList, {
      onSettled: () => {
        queryClient.invalidateQueries(['subjects']);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        setSubjectList([]);
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
        title='New Subjects'
        subtitle='Add new subjects'
        onClose={() => setOpen(false)}
      />
      <DialogContent>
        {msg.text && <Alert severity={msg.severity}>{msg.text}</Alert>}
        <Stack spacing={2} paddingY={2}>
          <Typography variant='h5' sx={{ textAlign: 'right' }}></Typography>
          <Divider />
          <Stack direction='row' spacing={2} alignItems='center'>
            <Autocomplete
              multiple
              freeSolo
              fullWidth
              defaultValue={SUBJECTS}
              options={SUBJECTS}
              disableCloseOnSelect
              getOptionLabel={(option) => option?.name || ''}
              renderOption={(props, option, state) => {
                return (
                  <ListItem
                    {...props}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Checkbox checked={state?.selected} />
                    <ListItemText primary={option?.name} />
                  </ListItem>
                );
              }}
              value={subjects}
              onChange={(e, value) => setSubjects(value)}
              renderInput={(params) => (
                <TextField {...params} label='Select Subject' size='small' />
              )}
            />
            <Button variant='contained' size='small' onClick={handleAddSubject}>
              Add
            </Button>
          </Stack>
          <List sx={{ maxHeight: 400 }}>
            {_.isEmpty(subjectList) ? (
              <Typography>No Subject selected</Typography>
            ) : (
              subjectList.map((subject) => {
                return (
                  <SubjectItem
                    key={subject?.name}
                    {...subject}
                    removeSubject={handleRemoveSubject}
                    appendCode={appendSubjectCode}
                    handleIsCore={handleIsCoreSubject}
                  />
                );
              })
            )}
          </List>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <LoadingButton
          disabled={subjectList.length === 0}
          variant='contained'
          onClick={handleSaveSubjects}
          loading={isLoading}
        >
          {isLoading ? 'Please wait' : 'Save Changes'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddSubject;
