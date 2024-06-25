import React from 'react';
import { AppBar, Container, Toolbar } from '@mui/material';
import NavLinkItem from '../../components/list/NavLinkItem';



const CourseNav = () => {
  return (
    <>
      <AppBar position='sticky' sx={{ bgcolor: 'white',zIndex:99 }} elevation={0}>
        
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
              bgcolor: 'white',
            }}
          >
            <NavLinkItem to='' color='#012e54' text='Home' />
            <NavLinkItem to='level' color='#012e54' text='Levels' />
            <NavLinkItem to='assign' color='#012e54' text='Courses' />
            {/* <NavLinkItem to='settings' color='secondary' text='Settings' /> */}
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default CourseNav;
