import React from 'react';
import ClassIcon from '@mui/icons-material/Class';
import SubjectIcon from '@mui/icons-material/Subject';
import Person3 from '@mui/icons-material/Person3';

import {Container, Divider } from '@mui/material';
import LevelTab from './LevelTab';
import useLevel from '../../components/hooks/useLevel';
import CustomTitle from '../../components/custom/CustomTitle';
import level_icon from '../../assets/images/header/level_ico.svg';
import DashboardCard from '../../components/cards/DashboardCard';

const LevelDashboard = () => {
  const { levelsOption, levelSummary } = useLevel();

  return (
    <Container
      sx={{
        position: 'relative',
        height: 300,
        color: 'primary.contrastText',
        // bgcolor: 'secondary.main',
      }}
    >
      <CustomTitle
        title='School Class & Subjects'
        subtitle='Add and Track new Classes and Subjects'
        img={level_icon}
        color='primary.main'
      />
      <Divider />
      {levelsOption.length !== 0 && (
        <Container
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
            gap: 2,
          }}
        >
          <DashboardCard
            title='Levels'
            value={levelSummary.noOfLevels}
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
            title='Courses Offered'
            value={levelSummary.noOfSubjects}
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
          <DashboardCard
            title='Assigned Teachers'
            value={levelSummary.noOfAssignedTeachers}
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
        </Container>
      )}

      <LevelTab />
    </Container>
  );
};

export default LevelDashboard;
