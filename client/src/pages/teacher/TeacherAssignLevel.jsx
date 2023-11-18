import React, { useContext, useState } from 'react';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Formik } from 'formik';
import { assignTeacherLevel } from '../../api/levelAPI';
import { currentLevelValidationSchema } from '../../config/validationSchema';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import useLevel from '../../components/hooks/useLevel';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';

const TeacherAssignLevel = ({ open, setOpen, teacher }) => {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const queryClient = useQueryClient();

  const [currentLevel, setCurrentLevel] = useState({
    _id: '',
    type: '',
  });

  const { levelsOption, levelLoading } = useLevel();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: assignTeacherLevel,
  });
  const onSubmit = (values, options) => {
    const info = {
      _id: values?._id,
      teacher,
    };

    mutateAsync(info, {
      onSettled: () => {
        queryClient.invalidateQueries(['levels']);
        options.setSubmitting(false);
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

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} maxWidth='xs' fullWidth onClose={handleClose}>
      <CustomDialogTitle
        title='Assign New Level'
        subtitle='Assign management of a level to teacher'
        onClose={handleClose}
      />

      <Formik
        initialValues={currentLevel}
        validationSchema={currentLevelValidationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ errors, touched, handleSubmit }) => {
          return (
            <>
              <DialogContent>
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
                  onChange={(e, value) => setCurrentLevel(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Select a level'
                      error={Boolean(touched.type && errors.type)}
                      helperText={touched.type && errors.type}
                    />
                  )}
                  sx={{ marginY: 2 }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <LoadingButton
                  loading={isLoading}
                  variant='contained'
                  onClick={handleSubmit}
                  disabled={currentLevel?._id === ''}
                >
                  Assign Level
                </LoadingButton>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default React.memo(TeacherAssignLevel);
