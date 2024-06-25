import { Container, Tab } from '@mui/material';
import React, { useState } from 'react';
import session_icon from '../../assets/images/header/session_ico.svg';
import CustomTitle from '../../components/custom/CustomTitle';
import Grade from './Grade';
import Subject from './subject';
import { TabContext, TabList, TabPanel } from '@mui/lab';

function Subject_Grade() {
  const [tab, setTab] = useState('1');
  return (
    <Container>
      <CustomTitle
        title='Subjects & Grading System'
        subtitle='  Track,manage and control academic and class activities'
        img={session_icon}
        color='primary.main'
      />

      <TabContext value={tab}>
        <TabList onChange={(e, value) => setTab(value)}>
          <Tab label='Subjects' value='1' />
          <Tab label='Grades' value='2' />
        </TabList>
        <TabPanel value='1' sx={{px:0}}>
          <Subject />
        </TabPanel>
        <TabPanel value='2' sx={{px:0}}>
          <Grade />
        </TabPanel>
      </TabContext>
    </Container>
  );
}

export default Subject_Grade;
