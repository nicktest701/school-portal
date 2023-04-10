import React, { useState } from 'react';
import { Person4Rounded } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Divider, Tab, Typography } from '@mui/material';
import UserTab from './UserTab';
import CustomTitle from '../../components/custom/CustomTitle';
import users_icon from '../../assets/images/header/users_ico.svg';

function UserHome() {
  const [tab, setTab] = useState('1');

  return (
    <Box
      sx={{
        position: 'relative',
        height: 350,
        color: 'primary.contrastText',
        bgcolor: 'primary.main',
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
          title='Administrators & Users'
          subtitle='Manage information and details of users'
          img={users_icon}
          color='text.main'
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

        <TabContext value={tab}>
          <TabList onChange={(e, value) => setTab(value)}>
            <Tab
              value='1'
              label='Users'
              icon={
                <Person4Rounded
                  sx={{
                    color: '#fff',
                  }}
                />
              }
              iconPosition='start'
              color='#fff'
            />
          </TabList>
          <Divider />
          <TabPanel value='1'>
            <UserTab />
          </TabPanel>
        </TabContext>
      </Container>
    </Box>
  );
}

export default UserHome;
