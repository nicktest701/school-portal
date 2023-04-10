import React, { useState } from 'react';
import { PersonRounded, StyleOutlined } from '@mui/icons-material';
import ClassIcon from '@mui/icons-material/Class';
import SubjectIcon from '@mui/icons-material/Subject';
import  Person3  from '@mui/icons-material/Person3';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Divider, Stack, Tab, Typography } from '@mui/material';
import LevelDashboardCard from '../../components/cards/LevelDashboardCard';
import Back from '../../components/Back';
import LevelTab from './LevelTab';
import useLevel from '../../components/hooks/useLevel';
import CustomTitle from '../../components/custom/CustomTitle';
import level_icon from '../../assets/images/header/level_ico.svg';
import DashboardCard from '../../components/cards/DashboardCard';

const LevelDashboard = () => {
  const [tab, setTab] = useState('1');
  const { levelsOption, levelSummary } = useLevel();

  return (
    <Box
      sx={{
        position: 'relative',
        height: 300,
        color: 'primary.contrastText',
        bgcolor: 'secondary.main',
      }}
    >
      <Container
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <CustomTitle
          title='School Class & Subjects'
          subtitle='Add and Track new Classes and Subjects'
          img={level_icon}
          color='primary.main'
        />

        <Typography
          variant='h6'
          sx={{
            paddingY: 2,
            color: 'primary.contrastText',
          }}
        >
          Overview
        </Typography>

        {levelsOption.length !== 0 && (
          <Box
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
          </Box>
        )}

        <TabContext value={tab}>
          <TabList onChange={(e, value) => setTab(value)}>
            <Tab
              value='1'
              label='Level'
              icon={<PersonRounded />}
              iconPosition='start'
            />
          </TabList>
          <Divider />
          <TabPanel value='1'>
            <LevelTab />
          </TabPanel>
        </TabContext>
      </Container>
    </Box>
  );
};

export default LevelDashboard;
