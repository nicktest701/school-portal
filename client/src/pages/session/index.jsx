import React, { useState } from 'react';
import { PersonRounded,} from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Divider,  Tab, } from '@mui/material';
import session_icon from '../../assets/images/header/session_ico.svg';
import SessionHome from './SessionHome';
import CustomParticle from '../../components/animations/CustomParticle';
import CustomTitle from '../../components/custom/CustomTitle';

const Session = () => {
  const [tab, setTab] = useState('1');

  return (
    <Box
      sx={{
        position: 'relative',
        height: '400px',
        width: '100%',
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
          title='School Session'
          subtitle='  Track,manage and control academic and class activities'
          img={session_icon}
          color='primary.main'
        />

        <Box paddingY={3}>
          <TabContext value={tab}>
            <TabList onChange={(e, value) => setTab(value)}>
              <Tab
                value='1'
                label='Session'
                icon={<PersonRounded />}
                iconPosition='start'
              />
            </TabList>
            <Divider />
            <TabPanel value='1'>
              <SessionHome />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
      <CustomParticle />
    </Box>
  );
};

export default Session;
