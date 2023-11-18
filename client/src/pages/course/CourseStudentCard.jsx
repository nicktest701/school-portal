import { Box, IconButton } from '@mui/material';
import React from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import SubjectIcon from '@mui/icons-material/Subject';
import Person3 from '@mui/icons-material/Person3';
import DashboardCard from '../../components/cards/DashboardCard';

function CourseStudentCard({ data }) {
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
        title='Levels'
        value={data?.levels}
        icon={
          <IconButton sx={{ bgcolor: 'error.lighter' }}>
            <GroupsIcon
              sx={{
                width: 20,
                height: 20,
                color: 'error.darker',
              }}
            />
          </IconButton>
        }
      />

      <DashboardCard
        title='Courses'
        value={data?.courses}
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
        title='Students'
        value={data?.students}
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
    </Box>
  );
}

export default CourseStudentCard;
