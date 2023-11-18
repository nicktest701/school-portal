import React, { useContext, useState } from 'react';
import { UserContext } from '../context/providers/UserProvider';
import _ from 'lodash';
import Swal from 'sweetalert2';
import { useNavigate, useLocation, Outlet, Navigate } from 'react-router-dom';
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
  const [shadow, setShadow] = useState('none');

  window.onscroll = function (e) {
    if (window.scrollY > 5) {
      setShadow('2px 3px 5px rgba(0,0,0,0.15)');
    } else {
      setShadow('none');
    }
  };

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

  if (session?.id || !user?.id) {
    <Navigate to='/login' />;
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
          // overscrollBehaviorInline: 'contain',
          gap: 1,
          // pb: 2,
        }}
      >
        <Sidebar onLogOut={logOutUser} />

        <div
          style={{
            flexGrow: 1,
          }}
        >
          <AppBar
            position='sticky'
            sx={{ bgcolor: 'white', boxShadow: shadow }}
            elevation={0}
          >
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
