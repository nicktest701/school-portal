import { Backdrop, useTheme } from '@mui/material';
import React, { useContext, useEffect, useRef } from 'react';
// import { InfinitySpin } from "react-loader-spinner";
import Wifi from '../components/spinners/Wifi';
import { UserContext } from '../context/providers/userProvider';
import _ from 'lodash';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { verifyUser } from '../api/userAPI';

const Loader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userDispatch } = useContext(UserContext);

  const schoolSession = useRef(
    JSON.parse(localStorage.getItem('@school_session'))
  );

  const path = location.pathname || '/';

  useQuery({
    refetchOnMount: true,
    queryKey: ['verify-user'],
    queryFn: verifyUser,
    onSuccess: (data) => {
      console.log('success');
      console.log(data);

      if (_.isEmpty(data?.id)) {
        userDispatch({
          type: 'signOut',
        });
        navigate('/login', {
          state: { path },
          replace: true,
        });
      } else {
        userDispatch({
          type: 'signIn',
          payload: { user: data, session: schoolSession.current },
        });

        navigate(path, {
          replace: true,
        });
      }
    },

    onError: (error) => {
      console.log('error');
      console.log(error);

      navigate('/login', {
        replace: true,
        state: { error },
      });
    },
  });

  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'transparent',
      }}
      open={true}
    >
      {/* <InfinitySpin width="200" color={palette.primary.main} /> */}
      <Wifi />
    </Backdrop>
  );
};

export default Loader;
