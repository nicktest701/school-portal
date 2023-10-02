import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/providers/userProvider';
import _ from 'lodash';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { getSchoolInfo, verifyUser } from '../api/userAPI';
import { useQuery } from '@tanstack/react-query';
import GlobalAlert from '../components/alerts/GlobalAlert';
import QuickMessage from '../components/modals/QuickMessage';
import Footer from './layouts/Footer';
import Scrollbars from 'react-custom-scrollbars';
import { Alert } from '@mui/material';
import { SchoolSessionContext } from '../context/providers/SchoolSessionProvider';

const Shell = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    userState: { default_school_info },
    userDispatch,
  } = useContext(UserContext);
  const {
    schoolSessionState: { generalAlert },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const schoolSession = JSON.parse(localStorage.getItem('@school_session'));
  const path = location.pathname || '/';

  useQuery({
    queryKey: ['school'],
    queryFn: () => getSchoolInfo(),
    onSuccess: (data) => {
      userDispatch({
        type: 'setSchoolInfo',
        payload: !_.isEmpty(data) ? data : default_school_info,
      });
      // localStorage.setItem('@school_info', JSON.stringify(data));
    },
  });

  useEffect(() => {
    //Set default loading
    userDispatch({ type: 'setLoading' });

    //Get user information
    async function getData() {
      try {
        const data = await verifyUser();
        //  console.log(data);
        if (_.isEmpty(data?.id) || _.isEmpty(schoolSession)) {
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
            payload: { user: data, session: schoolSession },
          });

          navigate(path, {
            replace: true,
          });
        }
      } catch (error) {
        navigate('/login', {
          replace: true,
          state: { error },
        });
      }
    }
    getData();

    return () => getData;
  }, []);

  const closeGeneralAlert = () => {
    schoolSessionDispatch({
      type: 'openGeneralAlert',
      payload: {
        message: '',
        severity: '',
      },
    });
  };

  return (
    <div
      style={{
        display: 'grid',
        gridAutoRows: '1fr auto',
        height: '100dvh',
        backgroundColor: 'white',
      }}
    >
      <GlobalAlert />
      {generalAlert?.message && (
        <Alert
          severity={generalAlert?.severity}
          onClose={closeGeneralAlert}
          sx={{ zIndex: 999999, position: 'fixed', bottom: 0, left: 0, right: 0 }}
        >
          {generalAlert?.message}
        </Alert>
      )}
      <Scrollbars style={{ width: '100%', height: '100vh' }} autoHide>
        <Outlet />
        <QuickMessage />
      </Scrollbars>
      <Footer bgcolor='transparent' color='#333' />
    </div>
  );
};

export default Shell;
