import React, { useState } from 'react';
import { Person4Rounded } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Container, Divider, Tab } from '@mui/material';
import UserTab from './UserTab';
import CustomTitle from '../../components/custom/CustomTitle';
import users_icon from '../../assets/images/header/users_ico.svg';

function UserHome() {
  const [tab, setTab] = useState('1');

  return (
    <Container>
      <CustomTitle
        title='Administrators & Users'
        subtitle='Manage information and details of users'
        img={users_icon}
        color='text.main'
      />

      <TabContext value={tab}>
        <TabList onChange={(e, value) => setTab(value)} textColor='#fff'>
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
          />
        </TabList>
        <Divider />
        <TabPanel value='1'>
          <UserTab />
        </TabPanel>
      </TabContext>
    </Container>
  );
}

export default UserHome;
