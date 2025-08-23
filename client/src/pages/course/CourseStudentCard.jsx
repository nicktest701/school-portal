import { Box, IconButton } from '@mui/material';
import React from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import SubjectIcon from '@mui/icons-material/Subject';
import DashboardCard from '../../components/cards/DashboardCard';
import { ListAltRounded } from '@mui/icons-material';

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
        title='Students'
        value={data?.students}
        icon={
          <IconButton sx={{ bgcolor: 'success.lighter' }}>
              <GroupsIcon
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
        title='Levels'
        value={data?.levels}
        icon={
          <IconButton sx={{ bgcolor: 'error.lighter' }}>
            <SubjectIcon
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
            <ListAltRounded
              sx={{
                width: 20,
                height: 20,
                color: 'info.darker',
              }}
            />
          </IconButton>
        }
      />
    
    </Box>
  );
}

export default CourseStudentCard;
