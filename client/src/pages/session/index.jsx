import React from 'react';

import {  Container, Divider } from '@mui/material';
import session_icon from '../../assets/images/header/session_ico.svg';
import SessionHome from './SessionHome';
import CustomTitle from '../../components/custom/CustomTitle';
import Scrollbars from 'react-custom-scrollbars';

const Session = () => {
  return (
    <Scrollbars style={{ width: '100%', minHeight: '100vh' }} autoHide>
      <Container
        sx={{
          position: 'relative',
          height: '400px',
          width: '100%',
          color: 'primary.contrastText',
          // bgcolor: 'secondary.main',
          overscrollBehaviorInline: 'contain',
          // flexGrow: 1,
        }}
      >
        <CustomTitle
          title='School Session'
          subtitle='  Track,manage and control academic and class activities'
          img={session_icon}
          color='primary.main'
        />

        <Divider />
        <SessionHome />
      </Container>
    </Scrollbars>
  );
};

export default Session;
