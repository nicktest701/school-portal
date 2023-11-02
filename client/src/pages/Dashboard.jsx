import React, { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';


import { useQuery } from '@tanstack/react-query';
import { generateNewCurrentLevelDetailsFromLevels } from '../api/levelAPI';
import DashboardSwiper from '../components/swiper/DashboardSwiper';
import CustomParticle from '../components/animations/CustomParticle';
import Birthday from '../components/items/Birthday';
import 'react-calendar/dist/Calendar.css';
import '../theme/Calendar.css';
import { UserContext } from '../context/providers/userProvider';
import DashboardCardsContainer from '../components/cards/DashboardCardsContainer';

const Dashboard = () => {
  const {
    userState: { user, session },
  } = useContext(UserContext);

  const navigate = useNavigate();

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

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          overscrollBehaviorInline: 'contain',
          gap: 1,
          pt: 2,
        }}
      >
        <Container
          sx={{
            overscrollBehaviorInline: 'contain',
          }}
        >
          
          <Typography variant='h6' paragraph>
            Dashboard
          </Typography>
          <DashboardCardsContainer />
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

          <Divider />
          <Typography variant='h6' paragraph>
            Recent News
          </Typography>
          <DashboardSwiper />
        </Container>
        {/* </Scrollbars> */}

        <Container
          sx={{
            width: { xs: 0, sm: 280 },
            display: { xs: 'none', md: 'block' },
            transition: 'all 0.4s ease-in-out',
            position: 'sticky',
            top: 0,
          }}
        >
          <Stack spacing={3}>
            <Calendar onChange={onChange} value={value} />
            <Birthday />
          </Stack>
        </Container>
      </Box>

      <CustomParticle />
    </>
  );
};

Dashboard.propTypes = {};

export default React.memo(Dashboard);
