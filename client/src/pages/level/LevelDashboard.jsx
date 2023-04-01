import React, { useState } from 'react';
import { PersonRounded, StyleOutlined } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Divider, Stack, Tab, Typography } from '@mui/material';
import LevelDashboardCard from '../../components/cards/LevelDashboardCard';
import Back from '../../components/Back';
import LevelTab from './LevelTab';
import useLevel from '../../components/hooks/useLevel';

const LevelDashboard = () => {
  const [tab, setTab] = useState('1');
  const { levelsOption, levelSummary } = useLevel();

  return (
    <Box
      sx={{
        position: 'relative',
        height: 250,
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
        <Back />
        <Container
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            paddingY: 2,
          }}
        >
          <Stack color='primary.main'>
            <Typography variant='h5'>School Class & Subjects</Typography>
            <Typography>Add and Track new Classes and Subjects</Typography>
          </Stack>
          <StyleOutlined color='inherit' sx={{ width: 50, height: 50 }} />
        </Container>

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
            <LevelDashboardCard
              title='Levels'
              value={levelSummary.noOfLevels}
            />
            <LevelDashboardCard
              title='Subjects Offered'
              value={levelSummary.noOfSubjects}
            />
            <LevelDashboardCard
              title='Assigned Teachers'
              value={levelSummary.noOfAssignedTeachers}
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
