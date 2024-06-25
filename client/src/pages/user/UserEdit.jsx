import React, { useContext, useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik } from 'formik';
import { putUser } from '../../api/userAPI';
import CustomFormControl from '../../components/inputs/CustomFormControl';
import { userEditValidationSchema } from '../../config/validationSchema';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import { uploadProfileImage } from '../../api/sessionAPI';
import moment from 'moment';
import CustomDatePicker from '../../components/inputs/CustomDatePicker';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import CustomImageChooser from '../../components/inputs/CustomImageChooser';

const UserEdit = () => {
  const queryClient = useQueryClient();

  const [dob, setDob] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const {
    schoolSessionState: { userEditData },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const user = userEditData?.data;

  useEffect(() => {
    setDob(moment(user?.dateofbirth));
    setProfileImage(
      `${import.meta.env.VITE_BASE_URL}/images/users/${user?.profile}`
    );
  }, [user]);

  //CLOSE Edit User
  const handleClose = () => {
    schoolSessionDispatch({
      type: 'editUser',
      payload: {
        open: false,
        data: {},
      },
    });
  };

  //PUT user
  const { mutateAsync } = useMutation(putUser);
  const onSubmit = (values, options) => {
    delete values.profile;
    values.dateofbirth = moment(dob).format('L');

    // //console.log(values);
    mutateAsync(values, {
      onSettled: () => {
        queryClient.invalidateQueries(['users']);
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

  const uploadProfile = async (e) => {
    const profile = e.target?.files[0];
    const info = {
      _id: user?._id,
      profile,
      type: 'users',
    };

    try {
      const data = await uploadProfileImage(info);
      schoolSessionDispatch(alertSuccess(data));
      setProfileImage(URL.createObjectURL(profile));
    } catch (error) {
      schoolSessionDispatch(alertError(error));
    }
    queryClient.invalidateQueries(['users']);
  };

  return (
    <Dialog open={userEditData.open} maxWidth='md' fullWidth>
      <CustomDialogTitle title='Edit User' onClose={handleClose} />
      <Divider />
      <Formik
        initialValues={user}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={userEditValidationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => {
          return (
            <>
              <DialogContent>
                <Stack padding={2} spacing={1}>
                  <Stack sx={{ position: 'relative' }}>
                    <Avatar
                      srcSet={profileImage}
                      sx={{ width: 100, height: 100, alignSelf: 'center' }}
                    />
                    <CustomImageChooser handleImageUpload={uploadProfile} />
                  </Stack>
                  <Typography
                    variant='body2'
                    color='primary.main'
                    sx={{ fontWeight: 'bold' }}
                  >
                    Personal information
                  </Typography>
                  <CustomFormControl>
                    <TextField
                      label='Fullname'
                      type='text'
                      fullWidth
                      size='small'
                      value={values.fullname || ''}
                      onChange={handleChange('fullname')}
                      error={Boolean(touched.fullname && errors.fullname)}
                      helperText={touched.fullname && errors.fullname}
                    />

                    <TextField
                      label='Username'
                      fullWidth
                      size='small'
                      value={values.username || ''}
                      onChange={handleChange('username')}
                      error={Boolean(touched.username && errors.username)}
                      helperText={touched.username && errors.username}
                    />
                  </CustomFormControl>
                  <CustomFormControl>
                    <CustomDatePicker
                      label='Date of Birth'
                      date={dob}
                      setDate={setDob}
                      disableFuture={true}
                      error={Boolean(touched.dateofbirth && errors.dateofbirth)}
                      helperText={touched.dateofbirth && errors.dateofbirth}
                    />

                    <TextField
                      label='Gender'
                      select
                      fullWidth
                      size='small'
                      value={values.gender || ''}
                      onChange={handleChange('gender')}
                      error={Boolean(touched.gender && errors.gender)}
                      helperText={touched.gender && errors.gender}
                    >
                      <MenuItem value='male'>male</MenuItem>
                      <MenuItem value='female'>female</MenuItem>
                    </TextField>

                    <TextField
                      label='Role'
                      select
                      fullWidth
                      size='small'
                      value={values.role || ''}
                      onChange={handleChange('role')}
                      error={Boolean(touched.role && errors.role)}
                      helperText={touched.role && errors.role}
                    >
                      <MenuItem value='administrator'>Administrator</MenuItem>
                      <MenuItem value='director'>Director</MenuItem>
                      <MenuItem value='secretary'>Secretary</MenuItem>
                      <MenuItem value='coordinator'>Exams Coordinator</MenuItem>
                    </TextField>
                  </CustomFormControl>
                  <CustomFormControl>
                    <TextField
                      label='Email'
                      fullWidth
                      size='small'
                      row={3}
                      maxRows={3}
                      value={values.email || ''}
                      onChange={handleChange('email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <TextField
                      label='Telephone No.'
                      inputMode='tel'
                      type='tel'
                      fullWidth
                      size='small'
                      value={values.phonenumber || ''}
                      onChange={handleChange('phonenumber')}
                      error={Boolean(touched.phonenumber && errors.phonenumber)}
                      helperText={touched.phonenumber && errors.phonenumber}
                    />
                  </CustomFormControl>
                  <TextField
                    label='Address'
                    fullWidth
                    size='small'
                    row={3}
                    maxRows={3}
                    value={values.address || ''}
                    onChange={handleChange('address')}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  <CustomFormControl>
                    <TextField
                      label='Place of Birth'
                      type='text'
                      fullWidth
                      size='small'
                      value={values.residence || ''}
                      onChange={handleChange('residence')}
                      error={Boolean(touched.residence && errors.residence)}
                      helperText={touched.residence && errors.residence}
                    />
                    <TextField
                      label='Nationality'
                      fullWidth
                      size='small'
                      value={values.nationality || ''}
                      onChange={handleChange('nationality')}
                      error={Boolean(touched.nationality && errors.nationality)}
                      helperText={touched.nationality && errors.nationality}
                    />
                  </CustomFormControl>
                </Stack>
              </DialogContent>
              <DialogActions>
                <LoadingButton
                  loading={isSubmitting}
                  variant='contained'
                  color='primary'
                  sx={{ minWidth: { xs: 100, sm: 150 } }}
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

UserEdit.propTypes = {};

export default UserEdit;
