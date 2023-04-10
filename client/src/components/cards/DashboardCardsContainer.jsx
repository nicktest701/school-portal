import React, { useContext } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import SubjectIcon from '@mui/icons-material/Subject';
import ClassIcon from '@mui/icons-material/Class';
import { Box, Typography } from '@mui/material';
import { Person3 } from '@mui/icons-material';
import DashboardCard from './DashboardCard';
import { useQuery } from '@tanstack/react-query';
import { getDashboardInfo } from '../../api/levelAPI';
import { UserContext } from '../../context/providers/userProvider';
import { useErrorBoundary } from 'react-error-boundary';

function DashboardCardsContainer() {
  const { showBoundary } = useErrorBoundary();
  const {
    userState: {
      session: { sessionId: session, termId: term },
    },
  } = useContext(UserContext);

  const info = useQuery({
    queryKey: ['dashboard-info'],
    queryFn: () => getDashboardInfo({ session, term }),
    enabled: !!session && !!term,
    onError: (error) => {
      showBoundary(error);
    },
  });

  if (info.isLoading) return <Typography>Loading</Typography>;

  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
        gap: 2,
        paddingY: 2,
      }}
    >
      <DashboardCard
        title='Students'
        value={info?.data?.students}
        icon={
          <GroupsIcon
            sx={{
              width: 50,
              height: 50,
              color: '#ffc09f',
            }}
          />
        }
      />

      <DashboardCard
        title='Tutors'
        value={info?.data?.teachers}
        icon={
          <Person3
            sx={{
              width: 50,
              height: 50,
              color: '#ffc09f',
            }}
          />
        }
      />
      <DashboardCard
        title='Levels'
        value={info?.data?.levels}
        icon={
          <SubjectIcon
            sx={{
              width: 50,
              height: 50,
              color: '#ffc09f',
            }}
          />
        }
      />
      <DashboardCard
        title='Courses'
        value={info?.data?.courses}
        icon={
          <ClassIcon
            sx={{
              width: 50,
              height: 50,
              color: '#ffc09f',
            }}
          />
        }
      />
    </Box>
  );
}

export default DashboardCardsContainer;
