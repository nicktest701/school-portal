import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/providers/userProvider';
import _ from 'lodash';
import Swal from 'sweetalert2';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { getSchoolInfo, verifyUser } from '../api/userAPI';
import { useQuery } from '@tanstack/react-query';
import GlobalAlert from '../components/alerts/GlobalAlert';
import QuickMessage from '../components/modals/QuickMessage';
import Footer from './layouts/Footer';
import Scrollbars from 'react-custom-scrollbars';
import {
  Alert,
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  useTheme,
} from '@mui/material';
import { SchoolSessionContext } from '../context/providers/SchoolSessionProvider';
import Sidebar from './layouts/Sidebar';
import { ArrowDropDown, Menu, NotificationsSharp } from '@mui/icons-material';
import HorizontalSidebar from './layouts/HorizontalSidebar';
import ViewUserProfile from '../components/dialog/ViewUserProfile';

const Shell = () => {
  const [openMiniBar, setOpenMiniBar] = useState(false);
  const [openUserProfile, setOpenUserProfile] = useState(false);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    userState: { default_school_info, user },
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

  //LOG OUT from System
  const handleLogOut = () => {
    Swal.fire({
      title: 'Exiting',
      text: 'Do you want to exit app?',
      confirmButtonColor: palette.primary.main,
      showCancelButton: true,
      backdrop: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        userDispatch({ type: 'signOut' });
        localStorage.removeItem('@school_session');
        localStorage.removeItem('@user');
        navigate('/login');
      }
    });
  };

  const handleOpenBar = () => setOpenMiniBar(true);

  //OPEN user profile
  const handleOpenUserProfile = () => setOpenUserProfile(true);

  return (
    <>
      <GlobalAlert />
      {generalAlert?.message && (
        <Alert
          severity={generalAlert?.severity}
          onClose={closeGeneralAlert}
          sx={{
            zIndex: 999999,
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          {generalAlert?.message}
        </Alert>
      )}
      <QuickMessage />
      <HorizontalSidebar
        open={openMiniBar}
        setOpen={setOpenMiniBar}
        onLogOut={handleLogOut}
      />
      <div
        style={{
          display: 'grid',
          gridAutoRows: '1fr auto',
          height: '100dvh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start',
            overscrollBehaviorInline: 'contain',
            gap: 1,
            pb: 2,
          }}
        >
          <Sidebar onLogOut={handleLogOut} />
          <div
            style={{
              flexGrow: 1,
              display: 'grid',
              gridTemplateRows: '1fr auto',
            }}
          >
            <Scrollbars style={{ width: '100%', height: '100vh' }} autoHide>
              <AppBar
                position='sticky'
                sx={{ bgcolor: 'white', py: 1, px: 2 }}
                elevation={0}
              >
                {/* <Toolbar> */}
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <IconButton
                    sx={{
                      // display: { xs: 'block', sm: 'none' },
                      alignSelf: 'flex-end',
                      py: 1,
                    }}
                    onClick={handleOpenBar}
                  >
                    <Menu />
                  </IconButton>

                  <Stack direction='row' spacing={3} alignItems='center'>
                    <IconButton>
                      <Badge badgeContent={2} color='error'>
                        <NotificationsSharp />
                      </Badge>
                    </IconButton>
                    <Button
                      startIcon={
                        <Avatar
                          src={`${import.meta.env.VITE_BASE_URL}/images/users/${
                            user?.profile
                          }`}
                          sx={{ width: 30, height: 30, cursor: 'pointer' }}
                        />
                      }
                      endIcon={<ArrowDropDown />}
                      onClick={handleOpenUserProfile}
                    >
                      {_.startCase(user?.fullname)}
                    </Button>
                  </Stack>
                </Box>
                {/* </Toolbar> */}
              </AppBar>
              <Container>
                <Outlet />
              </Container>
            </Scrollbars>
          </div>
        </Box>

        <Footer bgcolor='transparent' color='#333' />
      </div>
      <ViewUserProfile open={openUserProfile} setOpen={setOpenUserProfile} />
    </>
  );
};

export default Shell;
