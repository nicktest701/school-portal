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
import { Scrollbars } from 'react-custom-scrollbars';
import {
  EditRounded,
  NotificationsRounded,
  Person3,
} from '@mui/icons-material';
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
import UpdateUserProfile from '../components/dialog/UpdateUserProfile';

const Dashboard = () => {
  const {
    userState: { user, session },
    userDispatch,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const { palette } = useTheme();

  const [openUserProfile, setOpenUserProfile] = useState(false);

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
  return (
    <>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <Sidebar onLogOut={handleLogOut} />
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
          <Container
            sx={{
              height: '100vh',
              overscrollBehaviorInline: 'contain',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Stack>
                <HorizontalSidebar onLogOut={handleLogOut} />
                <Typography variant='h4' textTransform='capitalize'>
                  Welcome, {user?.fullname?.split(' ')[0]}!
                </Typography>
                <Typography variant='body2'>
                  {new Date().toDateString()}
                </Typography>
              </Stack>

              <Stack direction='row'>
                <IconButton>
                  <NotificationsRounded />
                </IconButton>
                <IconButton>
                  <MoreVertRoundedIcon />
                </IconButton>
              </Stack>
            </Box>
            <Typography
              variant='h6'
              sx={{ textAlign: 'right', color: 'primary.main' }}
            >
              {session?.academicYear}-{session?.term}
            </Typography>

            <Typography variant='h6' sx={{ paddingY: 1 }}>
              Dashboard
            </Typography>
            <Divider />
            <DashboardCardsContainer />
            <Typography variant='h6' sx={{ paddingY: 1 }}>
              Recent News
            </Typography>
            <Divider />
            <DashboardSwiper />
          </Container>
        </Scrollbars>
        <Container
          sx={{
            width: 300,
            display: { xs: 'none', md: 'inline-block' },
            backgroundColor: '#F7F7F7',
            height: '100vh',
            padding: 2,
            paddingY: 4,
            transition: 'all 0.4s ease-in-out',
          }}
        >
          <Box>
            <Stack direction='row' justifyContent='space-between'>
              <Typography variant='subtitle2'>Profile</Typography>
              <IconButton onClick={handleOpenUserProfile}>
                <EditRounded />
              </IconButton>
            </Stack>

            <Stack alignItems='center' paddingBottom={2}>
              <Avatar
                src={`/api/images/users/${user?.profile}`}
                sx={{ width: 80, height: 80 }}
              />
              <Typography variant='subtitle2' color='primary'>
                {_.startCase(user?.fullname)}
              </Typography>
              <Typography variant='body2'>@{user?.username}</Typography>
            </Stack>
          </Box>
          <Stack rowGap={2}>
            {/* <Typography variant='subtitle2'>Calendar</Typography> */}
            <Box>
              <Calendar onChange={onChange} value={value} />
            </Box>

            {/* birthday */}
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

export default Dashboard;
