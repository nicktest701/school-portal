import React from 'react';

import { Container } from '@mui/material';
import session_icon from '../../assets/images/header/session_ico.svg';
import SessionHome from './SessionHome';
import CustomTitle from '../../components/custom/CustomTitle';

const Session = () => {
  return (
    <Container
      sx={{
        position: 'relative',
        height: '400px',
         width: '95%',
        // maxWidth: '900px',
        marginInline:'auto',
        color: 'primary.contrastText',
        // bgcolor: 'primary.main',
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
    
      <SessionHome />
    </Container>
  );
};

export default Session;
