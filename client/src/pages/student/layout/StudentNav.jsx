import React from 'react';
import { AppBar, Container, Toolbar } from '@mui/material';

import Back from '../../../components/Back';
import NavLinkItem from '../../../components/list/NavLinkItem';

const StudentNav = () => {
  return (
    <>
      <AppBar position='sticky'>
        <Back />
        <Toolbar>
          <Container
            // direction='row'
            sx={{
              width: { xs: 300, sm: '100%' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 2,
              paddingY: 1,
            }}
          >
            <NavLinkItem to='' color='secondary' text='Home' />
            <NavLinkItem to='view' color='secondary' text='View Students' />
            <NavLinkItem to='new' color='secondary' text='New Student' />
            {/* <NavLinkItem to='settings' color='secondary' text='Settings' /> */}
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default StudentNav;
