import React, { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import Sidebar from './layouts/Sidebar';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Swal from 'sweetalert2';

import { EditRounded, Menu, NotificationsRounded } from '@mui/icons-material';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { useQuery } from '@tanstack/react-query';
import { generateNewCurrentLevelDetailsFromLevels } from '../api/levelAPI';
import ViewUserProfile from '../components/dialog/ViewUserProfile';
import DashboardSwiper from '../components/swiper/DashboardSwiper';
import CustomParticle from '../components/animations/CustomParticle';
import Birthday from '../components/items/Birthday';
import 'react-calendar/dist/Calendar.css';
import '../theme/Calendar.css';
import { UserContext } from '../context/providers/userProvider';
import HorizontalSidebar from './layouts/HorizontalSidebar';
import DashboardCardsContainer from '../components/cards/DashboardCardsContainer';

const Dashboard = () => {
  const {
    userState: { user, session },
    userDispatch,
  } = useContext(UserContext);

  const navigate = useNavigate();
  const { palette } = useTheme();
  const [openUserProfile, setOpenUserProfile] = useState(false);
  const [openMiniBar, setOpenMiniBar] = useState(false);
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    if (_.isEmpty(user?.id)) {
      navigate('/login', { replace: true });
      return;
    }
  }, []);

  //check if current level details exists
  useQuery(
    ['generate-current-level-details'],
    () => generateNewCurrentLevelDetailsFromLevels(session),
    {
      enabled: !!session,
    }
  );

  //OPEN user profile
  const handleOpenUserProfile = () => setOpenUserProfile(true);

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
  return (
    <>
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
        <Container
          sx={{
            overscrollBehaviorInline: 'contain',
            pt: 2,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <IconButton
              sx={{
                display: { xs: 'block', sm: 'none' },
                alignSelf: 'flex-end',
                py: 1,
              }}
              onClick={handleOpenBar}
            >
              <Menu />
            </IconButton>
            <HorizontalSidebar
              open={openMiniBar}
              setOpen={setOpenMiniBar}
              onLogOut={handleLogOut}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Stack spacing={1}>
              <Typography variant='h5' textTransform='capitalize'>
                Welcome, {user?.fullname?.split(' ')[0]}!
              </Typography>
              <Typography variant='body2'>
                {new Date().toDateString()}
              </Typography>
            </Stack>

            {/* <Stack direction='row'>
              <IconButton>
                <NotificationsRounded />
              </IconButton>
              <IconButton>
                <MoreVertRoundedIcon />
              </IconButton>
            </Stack> */}
          </Box>
          <Typography
            variant='h6'
            sx={{ textAlign: 'right', color: 'primary.main' }}
          >
            {session?.academicYear}-{session?.term}
          </Typography>

          <Typography variant='h6' paragraph>
            Dashboard
          </Typography>
          <Divider />
          <DashboardCardsContainer />
          <Typography variant='h6' paragraph>
            Recent News
          </Typography>
          <DashboardSwiper />
        </Container>
        {/* </Scrollbars> */}

        <Container
          sx={{
            width: { xs: 0, sm: 300 },
            display: { xs: 'none', md: 'block' },
            pt: 1,
            transition: 'all 0.4s ease-in-out',
            height: '100%',
            position: 'sticky',
            top: 0,
          }}
        >
          <Box>
            <Stack direction='row' justifyContent='space-between'>
              <Typography variant='subtitle2'>Profile</Typography>
              <IconButton onClick={handleOpenUserProfile}>
                <EditRounded />
              </IconButton>
            </Stack>

            <Stack alignItems='center' paddingBottom={2} spacing={1}>
              <Avatar
                src={`${import.meta.env.VITE_BASE_URL}/images/users/${
                  user?.profile
                }`}
                sx={{ width: 60, height: 60 }}
              />
              <Typography variant='subtitle2' color='primary'>
                {_.startCase(user?.fullname)}
              </Typography>
              <Typography variant='body2'>@{user?.username}</Typography>
            </Stack>
          </Box>
          <Stack spacing={3}>
            <Calendar onChange={onChange} value={value} />
            <Birthday />
          </Stack>
        </Container>
      </Box>

      <CustomParticle />

      <ViewUserProfile open={openUserProfile} setOpen={setOpenUserProfile} />
    </>
  );
};

Dashboard.propTypes = {};

export default React.memo(Dashboard);
