import { Box, IconButton } from '@mui/material';
import React from 'react';
import SubjectIcon from '@mui/icons-material/Subject';
import Person3 from '@mui/icons-material/Person3';
import DashboardCard from '../../components/cards/DashboardCard';

function CourseAttendanceCard({ data }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))',
        gap: 2,
        py: 4,
      }}
    >
      <DashboardCard
        title='Present'
        value={data?.present}
        icon={
          <IconButton sx={{ bgcolor: 'info.lighter' }}>
            <Person3
              sx={{
                width: 20,
                height: 20,
                color: 'info.darker',
              }}
            />
          </IconButton>
        }
      />
      <DashboardCard
        title='Absent '
        value={data?.absent}
        icon={
          <IconButton sx={{ bgcolor: 'success.lighter' }}>
            <SubjectIcon
              sx={{
                width: 20,
                height: 20,
                color: 'success.darker',
              }}
            />
          </IconButton>
        }
      />
      <DashboardCard
        title='Unmarked'
        value={data?.unknown}
        icon={
          <IconButton sx={{ bgcolor: 'warning.lighter' }}>
            <SubjectIcon
              sx={{
                width: 20,
                height: 20,
                color: 'warning.darker',
              }}
            />
          </IconButton>
        }
      />
    </Box>
  );
}

export default CourseAttendanceCard;
