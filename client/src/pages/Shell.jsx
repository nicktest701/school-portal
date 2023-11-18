import React, { useContext, useState } from 'react';
import { UserContext } from '../context/providers/UserProvider';
import _ from 'lodash';
import { Outlet, Navigate } from 'react-router-dom';
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
  IconButton,
  Stack,
} from '@mui/material';
import { SchoolSessionContext } from '../context/providers/SchoolSessionProvider';
import Sidebar from './layouts/Sidebar';
import { ArrowDropDown, Menu, NotificationsSharp } from '@mui/icons-material';
import HorizontalSidebar from './layouts/HorizontalSidebar';
import ViewUserProfile from '../components/dialog/ViewUserProfile';


const Shell = () => {
  const [openMiniBar, setOpenMiniBar] = useState(false);
  const [openUserProfile, setOpenUserProfile] = useState(false);
  const { user, logOutUser, session } = useContext(UserContext);

  const {
    schoolSessionState: { generalAlert },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const closeGeneralAlert = () => {
    schoolSessionDispatch({
      type: 'openGeneralAlert',
      payload: {
        message: '',
        severity: '',
      },
    });
  };

  const handleOpenBar = () => setOpenMiniBar(true);

  //OPEN user profile
  const handleOpenUserProfile = () => setOpenUserProfile(true);


  if (_.isEmpty(session?.sessionId) || _.isEmpty(user?.id)) {
    return <Navigate to='/login' />;
  }

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
        onLogOut={logOutUser}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
        }}
      >
        <Sidebar onLogOut={logOutUser} />

        <div
          style={{
            flexGrow: 1,
            paddingBottom: '8px',
          }}
        >
          <AppBar position='sticky' sx={{ bgcolor: 'white' }} elevation={1}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <IconButton
                sx={{
                  display: { xs: 'block', sm: 'none', px: 1 },
                }}
                onClick={handleOpenBar}
              >
                <Menu />
              </IconButton>

              <Stack
                flex={1}
                direction='row'
                spacing={3}
                alignSelf='flex-end'
                justifyContent='flex-end'
              >
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
          </AppBar>

          <Scrollbars style={{ width: '100%', height: '100dvh' }} autoHide>
            <Outlet />
          </Scrollbars>
        </div>
      </Box>

      <Footer bgcolor='transparent' color='#333' />

      <ViewUserProfile open={openUserProfile} setOpen={setOpenUserProfile} />
    </>
  );
};

export default Shell;
