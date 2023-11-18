import React, { useContext, useEffect, useState } from 'react';
import { SchoolRounded } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Avatar,
  Box,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CustomParticle from '../components/animations/CustomParticle';
import { Formik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { loginUserValidationSchema } from '../config/validationSchema';
import { getUserAuth } from '../api/userAPI';
import { UserContext } from '../context/providers/UserProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import StudentFeeSkeleton from '../components/skeleton/StudentFeeSkeleton';

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { school_info, logInUser } = useContext(UserContext);
  const initialValues = {
    username: '',
    password: '',
  };
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (typeof state?.error === 'string') {
      setMsg(state?.error);
    }
  }, [state]);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: getUserAuth,
  });
  const onSubmit = (values) => {
    setMsg('');
    mutateAsync(values, {
      onSuccess: (data) => {
     
        logInUser(data);
        navigate('/school-session', { replace: true });
      },
      onError: (error) => {
        setMsg(error);
      },
    });
  };

  return (
    <>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          bgcolor='primary.main'
          sx={{
            height: '100%',
            flex: 1,
            display: { xs: 'none', md: 'grid' },
            placeItems: 'center',
            color: 'primary.contrastText',
          }}
        >
          <Stack
            rowGap={3}
            justifyContent='çenter'
            alignItems='center'
            sx={{
              filter: 'blur',
              background: 'linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1))',
              padding: 4,
            }}
          >
            {school_info?.badge ? (
              <Avatar
                alt='school logo'
                loading='lazy'
                srcSet={`${import.meta.env.VITE_BASE_URL}/images/users/${
                  school_info?.badge
                }`}
                sx={{
                  width: 150,
                  height: 150,
                }}
              />
            ) : (
              <SchoolRounded sx={{ width: 100, height: 100 }} />
            )}

            <Typography variant='h3' textAlign='center'>
              {school_info?.name}
            </Typography>
            <Typography variant='body2' fontStyle='italic' textAlign='center'>
              {`" ${school_info?.motto} "`}
            </Typography>
          </Stack>
        </Box>
        <Container
          maxWidth='xs'
          sx={{
            height: '100%',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: 2,
          }}
        >
          {school_info?.badge ? (
            <Avatar
              alt='school logo'
              loading='lazy'
              srcSet={`${import.meta.env.VITE_BASE_URL}/images/users/${
                school_info?.badge
              }`}
              sx={{
                width: 150,
                height: 150,
                display: { sm: 'block', md: 'none' },
                color: 'primary.main',
              }}
            />
          ) : (
            <SchoolRounded
              sx={{
                width: 150,
                height: 150,
                display: { sm: 'block', md: 'none' },
                color: 'primary.main',
              }}
            />
          )}

          <Typography variant='h3' alignSelf='flex-start'>
            Welcome
          </Typography>
          <Typography alignSelf='flex-start' fontStyle='italic'>
            Login into your account
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={loginUserValidationSchema}
          >
            {({
              isSubmitting,
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
            }) => {
              return (
                <>
                  {msg && <Alert severity='error'>{msg}</Alert>}
                  <TextField
                    fullWidth
                    placeholder='Username here'
                    value={values.username}
                    onChange={handleChange('username')}
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
                  />
                  <TextField
                    fullWidth
                    type='password'
                    placeholder='Password here'
                    value={values.password}
                    onChange={handleChange('password')}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <LoadingButton
                    loading={isLoading}
                    fullWidth
                    variant='contained'
                    onClick={handleSubmit}
                  >
                    Log in
                  </LoadingButton>
                </>
              );
            }}
          </Formik>
        </Container>
      </Box>
      <CustomParticle />
    </>
  );
};

export default Login;
