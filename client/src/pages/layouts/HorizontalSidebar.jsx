import React from 'react';
import { Drawer, IconButton, Stack } from '@mui/material';
import { Close } from '@mui/icons-material';
import PropTypes from 'prop-types';
import MiniDrawerItem from '../../components/MiniDrawerItem';

const HorizontalSidebar = ({ open, setOpen, onLogOut }) => {
  const handleClose = () => setOpen(false);

  return (
    <Drawer open={open} onClose={handleClose}
     sx={{ zIndex: 9999 }}
     >
      <Stack
        sx={{
          minHeight: '100vh',
          width: '100%',
          minWidth: 280,
        }}
        bgcolor='#fff'
        spacing={1}
      >
        <IconButton sx={{ alignSelf: 'flex-end' }} onClick={handleClose}>
          <Close />
        </IconButton>

        <MiniDrawerItem title='Dashboard' to='/' />
        <MiniDrawerItem title='Session' to='/session' />
        <MiniDrawerItem title='Levels & Subjects' to='/level' />
        <MiniDrawerItem title='Student' to='/student' />
        <MiniDrawerItem title='Teacher' to='/teacher' />
        <MiniDrawerItem title='School Fees' to='/fee' />
        <MiniDrawerItem title='Examination' to='/examination' />
        <MiniDrawerItem title='Messages' to='/sms' />
        <MiniDrawerItem title='Users' to='/users' />
        <MiniDrawerItem title='Settings' to='/settings' />
        <MiniDrawerItem title='About' to='/about' />
        <a className='mini-drawer-link' onClick={onLogOut}>
          Log Out
        </a>
        <small style={{ alignSelf: 'center' }}>Frebby Tech Consults</small>
      </Stack>
    </Drawer>
  );
};

HorizontalSidebar.propTypes = {
  onLogOut: PropTypes.func,
};

export default HorizontalSidebar;
