import React, { useContext } from 'react';

import {
  Stack,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import { Formik } from 'formik';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putSubject } from '../../api/subjectAPI';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';
import { LoadingButton } from '@mui/lab';

function EditSubject() {
  const {
    schoolSessionState: {
      editSubject: { open, data },
    },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: putSubject,
  });
  const onSubmit = (values) => {
    mutateAsync(values, {
      onSettled: () => {
        queryClient.invalidateQueries(['subjects']);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        handleCloseDialog();
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };
  const handleCloseDialog = () => {
    schoolSessionDispatch({
      type: 'editSubject',
      payload: { open: false, data: {} },
    });
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth='xs'
      //   TransitionComponent={Transition}
    >
      <CustomDialogTitle title='Edit Subject' onClose={handleCloseDialog} />
      <Formik
        initialValues={data}
        onSubmit={onSubmit}
        // validationSchema={sessionValidationSchema}
        enableReinitialize={true}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => {
          return (
            <>
              <DialogContent>
                <Stack spacing={2} paddingY={2}>
                  <FormControlLabel
                    sx={{ alignSelf: 'flex-end' }}
                    label='Core Subject'
                    control={
                      <Checkbox
                        value={values.isCore || false}
                        checked={values?.isCore}
                        onChange={handleChange('isCore')}
                      />
                    }
                  />
                  <TextField
                    label='Code'
                    size='small'
                    value={values.code || ''}
                    onChange={handleChange('code')}
                    error={Boolean(touched.code && errors.code)}
                    helperText={touched.code && errors.code}
                  />
                  <TextField
                    label='Name'
                    size='small'
                    value={values.name || ''}
                    onChange={handleChange('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Stack>
              </DialogContent>
              <DialogActions sx={{ padding: 2 }}>
                <LoadingButton
                  loading={isLoading}
                  variant='contained'
                  onClick={handleSubmit}
                >
                  {isLoading ? 'Saving' : 'Save Changes'}
                </LoadingButton>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
}

export default EditSubject;
