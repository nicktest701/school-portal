import React from 'react';
import { AppBar, Container, Toolbar } from '@mui/material';
import Back from '../../../components/Back';
import NavLinkItem from '../../../components/list/NavLinkItem';

const FeeNav = () => {
  return (
    <>
      <AppBar position='sticky'>
        <Back />
        <Toolbar>
          <Container
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 2,
              paddingY: 1,
            }}
          >
            <NavLinkItem to='' color='secondary' text='Home' />
            <NavLinkItem to='new' color='secondary' text='New Fees' />
            <NavLinkItem to='payment' color='secondary' text='Make Payment' />
            {/* <NavLinkItem
              to='level'
              color='secondary'
              text='Level Information '
            /> */}
            <NavLinkItem to='history' color='secondary' text='Quick Search ' />
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default FeeNav;
