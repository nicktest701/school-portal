import React, { useContext, useState } from 'react';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Formik } from 'formik';
import { assignLevelValidationSchema } from '../../config/validationSchema';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import useLevel from '../../components/hooks/useLevel';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import useLevelById from '../../components/hooks/useLevelById';
import { TeacherContext } from '../../context/providers/TeacherProvider';
import { UserContext } from '../../context/providers/UserProvider';
import { postCourse } from '../../api/courseAPI';

const TeacherAssignCourse = () => {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const {
    userState: { session },
  } = useContext(UserContext);

  const {
    teacherState: {
      assignTeacherCourse: { open, data },
    },
    teacherDispatch,
  } = useContext(TeacherContext);
  const queryClient = useQueryClient();
  const [subject, setSubject] = useState('');
  const [currentLevel, setCurrentLevel] = useState({
    _id: '',
    type: '',
  });

  const initialValues = {
    currentLevel,
    subject,
  };

  const { levelsOption, levelLoading } = useLevel();
  const { subjects, levelLoading: subjectLoading } = useLevelById(
    currentLevel?._id
  );
  
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: postCourse,
  });

  const onSubmit = (values, options) => {
    
    const info = {
      session: session?.sessionId,
      term: session?.termId,
      teacher: data?.id,
      level: values?.currentLevel?._id,
      subject: values?.subject,
    };


    mutateAsync(info, {
      onSettled: () => {
        queryClient.invalidateQueries(['courses', data?.id]);
        options.setSubmitting(false);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        handleClose();
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  //CLOSE view Teacher Info
  const handleClose = () => {
    teacherDispatch({
      type: 'assignTeacherCourse',
      payload: {
        open: false,
        data: {
          id: '',
        },
      },
    });
  };

  return (
    <Dialog open={open} maxWidth='xs' fullWidth onClose={handleClose}>
      <CustomDialogTitle
        title='Assign  Course'
        subtitle='Assign a selected course to a teacher'
        onClose={handleClose}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={assignLevelValidationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ errors, touched, handleSubmit }) => {
          return (
            <>
              <DialogContent>
                <Stack spacing={1}>
                  <Autocomplete
                    size='small'
                    options={levelsOption}
                    loading={levelLoading}
                    loadingText='Loading levels.Please wait...'
                    getOptionLabel={(option) => option?.type || ''}
                    isOptionEqualToValue={(option, value) =>
                      value._id === undefined ||
                      value._id === '' ||
                      value._id === option._id
                    }
                    value={currentLevel}
                    onChange={(e, value) => {
                      setCurrentLevel(value);
                      setSubject('');
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Select a level'
                        error={Boolean(
                          touched.currentLevel?.type &&
                            errors.currentLevel?.type
                        )}
                        helperText={
                          touched.currentLevel?.type &&
                          errors.currentLevel?.type
                        }
                      />
                    )}
                    sx={{ marginY: 2 }}
                  />
                  <Autocomplete
                    freeSolo
                    fullWidth
                    noOptionsText='No subject available'
                    loading={subjectLoading}
                    loadingText={'Please Wait...'}
                    options={subjects ? subjects : []}
                    closeText=' '
                    getOptionLabel={(option) => option || ''}
                    value={subject}
                    onChange={(e, value) => setSubject(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Select Subject'
                        size='small'
                        error={Boolean(touched.subject && errors.subject)}
                        helperText={touched.subject && errors.subject}
                      />
                    )}
                  />
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <LoadingButton
                  loading={isLoading}
                  variant='contained'
                  onClick={handleSubmit}
                  disabled={currentLevel?._id === '' && subjects?.length === 0}
                >
                  Assign Course
                </LoadingButton>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default React.memo(TeacherAssignCourse);
