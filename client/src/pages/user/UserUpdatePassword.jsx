import { useContext } from 'react';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Swal from 'sweetalert2';
import { Formik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userResetPasswordValidationSchema } from '../../config/validationSchema';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import { PasswordRounded } from '@mui/icons-material';
import { updateUserPassword } from '../../api/userAPI';

function UserUpdatePassword({ open, setOpen }) {
  const queryClient = useQueryClient();
  const {
    schoolSessionState: { userViewData },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const user = userViewData?.data;

  const iniitalValues = {
    id: user?._id,
    password: '',
    confirmPassword: '',
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: updateUserPassword,
  });

  const onSubmit = (values, options) => {
    delete values.confirmPassword;
  
    Swal.fire({
      title: 'Updating Password',
      text: 'Do you wish to proceed?',
      showCancelButton: true,
      allowOutsideClick: false,
    }).then(({ isConfirmed, isDenied, isDismissed }) => {
      if (isConfirmed) {
        // console.log(values);
        mutateAsync(values, {
          onSuccess: (data) => {
            queryClient.invalidateQueries(['users']);
            schoolSessionDispatch(alertSuccess(data));
            options.setSubmitting(false);
            handleClose();
            schoolSessionDispatch({
              type: 'viewUser',
              payload: {
                open: false,
                data: {},
              },
            });
          },
          onError: (error) => {
            schoolSessionDispatch(alertError(error));
          },
        });
      }
      if ((isDenied, isDismissed)) {
        options.setSubmitting(false);
      }
    });
  };

  //CLOSE view User Info
  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} maxWidth='xs' fullWidth>
      <CustomDialogTitle title='Password Reset' onClose={handleClose} />
      <Formik
        initialValues={iniitalValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={userResetPasswordValidationSchema}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => {
          return (
            <>
              <DialogContent>
                <Stack padding={2} spacing={1}>
                  <TextField
                    type='password'
                    label='Password'
                    fullWidth
                    size='small'
                    autoComplete='no'
                    value={values.password}
                    onChange={handleChange('password')}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <TextField
                    type='password'
                    label='Confirm Password'
                    fullWidth
                    size='small'
                    value={values.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    error={Boolean(
                      touched.confirmPassword && errors.confirmPassword
                    )}
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                  />
                </Stack>
              </DialogContent>
              <DialogActions>
                <LoadingButton
                  loading={isLoading}
                  variant='contained'
                  color='primary'
                  onClick={handleSubmit}
                  startIcon={<PasswordRounded />}
                >
                  Update Password
                </LoadingButton>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
}

export default UserUpdatePassword;
