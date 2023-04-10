import React from 'react';
import { AppBar, Container, IconButton, Stack, Toolbar } from '@mui/material';
import Menu from '@mui/icons-material/Menu';
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
              width: { xs: 400, sm: '100%' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              columnGap: 1,
              overflowX: 'scroll',
              overscrollBehaviorInline: 'contain',
              '&::-webkit-scrollbar': {
                width: '10px',
              },
              paddingY: 1,
            }}
          >
            <NavLinkItem to='' color='secondary' text='Home' />
            <NavLinkItem to='new' color='secondary' text='New Student' />
            <NavLinkItem to='view' color='secondary' text='View Student' />
            <NavLinkItem to='settings' color='secondary' text='Settings' />
          </Container>
          {/* <IconButton
            color='inherit'
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <Menu />
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default StudentNav;
