import React, { useState } from 'react';
import { Container, Divider, Tab } from '@mui/material';
import CustomTitle from '../../components/custom/CustomTitle';
import settings_icon from '../../assets/images/header/settings_ico.svg';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SchoolSettingsTab from './SchoolSettingsTab';

const Settings = () => {
  const [tab, setTab] = useState('1');
  return (
    <Container sx={{ paddingY: 2 }}>
      <CustomTitle
        title='Settings'
        subtitle='Manage system preferences and settings to your convenience'
        img={settings_icon}
        backColor='#012e54'
      />
      <Divider />
      <TabContext value={tab}>
        <TabList onChange={(e, value) => setTab(value)}>
          <Tab value='1' label='School' />
          {/* <Tab value='2' label='Other' /> */}
        </TabList>
        <TabPanel value='1'>
          <SchoolSettingsTab/>
        </TabPanel>
        {/* <TabPanel value='2'></TabPanel> */}
      </TabContext>
    </Container>
  );
};

Settings.propTypes = {};

export default Settings;
