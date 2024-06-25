import React, { useContext } from 'react';
import {
  Stack,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
} from '@mui/material';
import _ from 'lodash';
import { Formik } from 'formik';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoadingButton } from '@mui/lab';
import {
  LEVEL_OPTIONS,
  LEVEL_TYPE_OPTIONS,
} from '../../mockup/columns/sessionColumns';
import { levelValidationSchema } from '../../config/validationSchema';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';
import useLevel from '../../components/hooks/useLevel';
import { putLevel } from '../../api/levelAPI';

import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import { getAllTeachers } from '../../api/teacherAPI';

const EditLevel = () => {
  const queryClient = useQueryClient();
  const {
    schoolSessionState: {
      editLevel: { open, data },
    },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);
  const { levelsOption } = useLevel();

  const teachers = useQuery({
    queryKey: ['teachers'],
    queryFn: () => getAllTeachers(),
    select: (teachers) => {
      const modifiedTeachers = teachers?.map((teacher) => {
        return {
          _id: teacher?._id,
          fullName: teacher?.fullName,
        };
      });
      return modifiedTeachers;
    },
  });

  //ADD New Level
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: putLevel,
  });

  const onSubmit = (values, options) => {
    const newType = `${values.level}${values.type}`;
    const isMatch = levelsOption.find(
      ({ type }) => type === newType.toUpperCase()
    );

    if (!_.isEmpty(isMatch)) {
      schoolSessionDispatch(alertError('Level already exists!!!'));
      options.setSubmitting(false);
      return;
    }

    const newLevel = {
      _id: values?._id,
      level: {
        name: values.level,
        type: values.type,
      },
      teacher: values.teacher,
    };

    console.log(newLevel);

    mutateAsync(newLevel, {
      onSettled: () => {
        options.setSubmitting(false);
        queryClient.invalidateQueries(['levels']);
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

  const handleClose = () => {
    schoolSessionDispatch({
      type: 'editLevel',
      payload: { open: false, data: {} },
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
      <CustomDialogTitle title='Edit Level' onClose={handleClose} />
      <Formik
        initialValues={data}
        onSubmit={onSubmit}
        validationSchema={levelValidationSchema}
        enableReinitialize={true}
      >
        {({ values, errors, touched, handleSubmit, setFieldValue }) => {
          return (
            <>
              <DialogContent>
                <Stack spacing={2} paddingY={2}>
                  <Autocomplete
                    freeSolo
                    options={LEVEL_OPTIONS}
                    getOptionLabel={(option) => option || ''}
                    value={values?.level || ''}
                    onInputChange={(e, value) => setFieldValue('level', value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Level'
                        size='small'
                        error={Boolean(touched.level && errors.level)}
                        helperText={touched.level && errors.level}
                      />
                    )}
                  />
                  <Autocomplete
                    freeSolo
                    options={LEVEL_TYPE_OPTIONS}
                    getOptionLabel={(option) => option || ''}
                    value={values?.type || ''}
                    onInputChange={(e, value) => setFieldValue('type', value)}
                    renderInput={(params) => (
                      <TextField {...params} label='type' size='small' />
                    )}
                  />

                  <Autocomplete
                    options={teachers.data}
                    loading={teachers.isLoading}
                    getOptionLabel={(option) => option?.fullName || ''}
                    defaultValue={values?.teacher}
                    value={values?.teacher}
                    onChange={(e, value) => setFieldValue('teacher', value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Assign Teacher'
                        size='small'
                      />
                    )}
                  />
                </Stack>
              </DialogContent>
              <DialogActions sx={{ padding: 2 }}>
                <LoadingButton
                  loading={isLoading}
                  variant='contained'
                  onClick={handleSubmit}
                >
                  Save Changes
                </LoadingButton>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default EditLevel;
