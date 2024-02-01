import React, { useContext, useState } from 'react';
import Calendar from 'react-calendar';
import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { generateNewCurrentLevelDetailsFromLevels } from '../api/levelAPI';
import DashboardSwiper from '../components/swiper/DashboardSwiper';
import CustomParticle from '../components/animations/CustomParticle';
import Birthday from '../components/items/Birthday';
import 'react-calendar/dist/Calendar.css';
import '../theme/Calendar.css';
import { UserContext } from '../context/providers/UserProvider';
import DashboardCardsContainer from '../components/cards/DashboardCardsContainer';
import CustomCard from '../components/cards/CustomCard';

const Dashboard = () => {
  const {
    user,
    userState: { session },
  } = useContext(UserContext);

  const [value, onChange] = useState(new Date());

  //check if current level details exists
  useQuery({
    queryKey: [
      'generate-current-level-details',
      session?.sessionId,
      session?.termId,
    ],
    queryFn: () =>
      generateNewCurrentLevelDetailsFromLevels({
        sessionId: session?.sessionId,
        termId: session?.termId,
      }),
    enabled: !!session?.sessionId && !!session?.termId,
  });

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
            position: 'sticky',
            top: 0,
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

        <Box
          sx={{
            width: { xs: 0, sm: 280 },
            display: { xs: 'none', md: 'block' },
            transition: 'all 0.4s ease-in-out',
            position: 'sticky',
            top: 0,
          }}
        >
          <Stack spacing={3}>
            <CustomCard title='Recent Events'>
              <Calendar onChange={onChange} value={value} />
            </CustomCard>
            <Birthday />
          </Stack>
        </Box>
      </Box>

      <CustomParticle />
    </>
  );
};

Dashboard.propTypes = {};

export default React.memo(Dashboard);
