import { Avatar, Box, Container, Stack, TextField } from '@mui/material';
import { Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import CustomImageChooser from '../../components/inputs/CustomImageChooser';
import { uploadProfileImage } from '../../api/sessionAPI';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';
import { useMutation } from '@tanstack/react-query';
import { putSchoolInfo } from '../../api/userAPI';

function SchoolSettingsTab() {
  const school_info = JSON.parse(localStorage.getItem('@school_info'));
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const [profileImg, setProfileImg] = useState(null);
  const [badge, setBadge] = useState('');

  useEffect(() => {
    setBadge(school_info?.badge);
    setProfileImg(
      `/api/images/users/${
        school_info?.badge
      }`
    );
  }, [school_info]);

  const initialValues = {
    badge,
    name: school_info?.name,
    address: school_info?.address,
    location: school_info?.location,
    email: school_info?.email,
    phonenumber: school_info?.phonenumber,
    motto: school_info?.motto,
  };

  const { mutateAsync } = useMutation({
    mutationFn: putSchoolInfo,
  });

  const onSubmit = (values, options) => {
    values.unique = 'school-info';

    mutateAsync(values, {
      onSettled: () => {
        options.setSubmitting(false);
      },
      onSuccess: (data) => {
        localStorage.setItem('@school_info', JSON.stringify(values));
        schoolSessionDispatch(alertSuccess(data));
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  const uploadProfile = async (e) => {
    const profile = e.target?.files[0];
    const info = {
      _id: '456-456',
      profile,
      type: 'users',
    };

    try {
      const uploadedBadge = await uploadProfileImage(info);
      schoolSessionDispatch(alertSuccess('School Image Uploaded'));
      setBadge(uploadedBadge);
      setProfileImg(URL.createObjectURL(profile));
    } catch (error) {
      schoolSessionDispatch(alertError(error));
    }
  };

  return (
    <Container maxWidth='sm'>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
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
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',

                  marginY: 2,
                }}
              >
                <Avatar
                  variant='square'
                  src={profileImg}
                  sx={{
                    width: 100,
                    height: 100,
                    justifySelf: 'center',
                    alignSelf: 'center',
                  }}
                />
                <CustomImageChooser handleImageUpload={uploadProfile} />
              </Box>

              <Stack padding={2} spacing={2}>
                <TextField
                  label='School Name'
                  placeholder='School Name'
                  type='text'
                  fullWidth
                  size='small'
                  value={values.name}
                  onChange={handleChange('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  label='Address'
                  placeholder='Address'
                  type='text'
                  fullWidth
                  size='small'
                  value={values.address}
                  onChange={handleChange('address')}
                  error={Boolean(touched.address && errors.address)}
                  helperText={touched.address && errors.address}
                />
                <TextField
                  label='Location'
                  placeholder='Location'
                  type='text'
                  fullWidth
                  size='small'
                  value={values.location}
                  onChange={handleChange('location')}
                  error={Boolean(touched.location && errors.location)}
                  helperText={touched.location && errors.location}
                />
                <TextField
                  label='Email Address'
                  placeholder='Email Address'
                  type='email'
                  inputMode='email'
                  fullWidth
                  size='small'
                  value={values.email}
                  onChange={handleChange('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  label='Phone Number'
                  placeholder='e.g. 0244192831-0233847287'
                  type='text'
                  fullWidth
                  size='small'
                  value={values.phonenumber}
                  onChange={handleChange('phonenumber')}
                  error={Boolean(touched.phonenumber && errors.phonenumber)}
                  helperText={
                    touched.phonenumber && errors.phonenumber
                      ? errors.phonenumber
                      : 'Separate multiple phone numbers with " - "'
                  }
                />
                <TextField
                  label='Motto'
                  placeholder='Motto'
                  type='text'
                  fullWidth
                  size='small'
                  value={values.motto}
                  onChange={handleChange('motto')}
                  error={Boolean(touched.motto && errors.motto)}
                  helperText={touched.motto && errors.motto}
                />

                <LoadingButton
                  loading={isSubmitting}
                  variant='contained'
                  color='primary'
                  onClick={handleSubmit}
                >
                  Save Settings
                </LoadingButton>
              </Stack>
            </>
          );
        }}
      </Formik>
    </Container>
  );
}

export default SchoolSettingsTab;
