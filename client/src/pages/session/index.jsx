import React from 'react';

import { Container } from '@mui/material';
import session_icon from '../../assets/images/header/session_ico.svg';
import SessionHome from './SessionHome';
import CustomTitle from '../../components/custom/CustomTitle';

const Session = () => {
  return (
    <Container>
      <CustomTitle
        title='School Session'
        subtitle='  Track,manage and control academic and class activities'
        img={session_icon}
        color='primary.main'
      />

      <SessionHome />
    </Container>
  );
};

export default Session;
