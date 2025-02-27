import { Container, Tab } from '@mui/material';
import React, { useState } from 'react';
import session_icon from '../../assets/images/header/session_ico.svg';
import CustomTitle from '../../components/custom/CustomTitle';
import Grade from './Grade';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Subject from './Subject';

function Subject_Grade() {
  const [tab, setTab] = useState('1');
  return (
    <Container>
      <CustomTitle
        title='Subjects & Grading System'
        subtitle=' Manage subjects offered and their corresponding grading systems to maintain academic standards.'
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
