import React, { useState } from 'react';
import { MailRounded, Message } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Container, Divider, Tab, Typography } from '@mui/material';
import SMSQuick from './SMSQuick';
import SMSBulk from './SMSBulk';
import Back from '../../components/Back';

const SMSNew = () => {
  const [tab, setTab] = useState('1');

  return (
    <>
      <Back color='#012e54' />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          paddingY: 1,
        }}
      >
        <MailRounded color='inherit' sx={{ width: 50, height: 50 }} />

        <Typography variant='h6'>SMS, Mails & Notifications</Typography>
        <Typography>
          Send single and bulk SMS amd emails to students,teachers, parents,etc
        </Typography>
        <Divider flexItem />
      </Container>
      <TabContext value={tab}>
        <TabList
          onChange={(e, value) => setTab(value)}
          centered
          // variant='scrollable'
          scrollButtons='auto'
        >
          <Tab
            label='Quick Message'
            value='1'
            icon={<Message />}
            iconPosition='start'
          />
          <Tab label='Bulk Messages' value='2' icon={null} />
        </TabList>
        <TabPanel value='1'>
          <SMSQuick />
        </TabPanel>
        <TabPanel value='2'>
          <SMSBulk />
        </TabPanel>
      </TabContext>
    </>
  );
};

export default SMSNew;
