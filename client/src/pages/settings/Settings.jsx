import React from 'react';
import { Container, Divider, } from '@mui/material';
import CustomTitle from '../../components/custom/CustomTitle';
import settings_icon from '../../assets/images/header/settings_ico.svg';
import SchoolSettingsTab from './SchoolSettingsTab';

const Settings = () => {
  return (
    <Container>
      <CustomTitle
        title='Settings'
        subtitle="Customize and configure system settings to tailor the platform to your school's specific needs."
        img={settings_icon}
        backColor='#012e54'
      />
      <Divider />

      <SchoolSettingsTab />
    </Container>
  );
};

Settings.propTypes = {};

export default Settings;
