import React from 'react';
import { IconButton, Stack } from '@mui/material';
import { Close } from '@mui/icons-material';
import PropTypes from 'prop-types';
import MiniDrawerItem from '../../components/MiniDrawerItem';

const HorizontalSidebar = ({ open, setOpen, onLogOut }) => {
  const handleClose = () => setOpen(false);
  return (
    <Stack
      sx={{
        minHeight: '100vh',
        width: '100%',
        position: 'absolute',
        zIndex: 999,
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        display: { xs: 'flex', sm: 'none' },
        visibility: open ? 'visible' : 'hidden',
        opacity: open ? 1 : 0,
        transition: 'all 250ms ease-in-out',
      }}
      bgcolor='#fff'
      spacing={1}
    >
      <IconButton sx={{ alignSelf: 'flex-end' }} onClick={handleClose}>
        <Close />
      </IconButton>
      <a className='mini-drawer-link' onClick={handleClose}>
        Dashboard
      </a>
      <MiniDrawerItem title='Session' to='/session' />
      <MiniDrawerItem title='Levels & Subjects' to='/level' />
      <MiniDrawerItem title='Student' to='/student' />
      <MiniDrawerItem title='Teacher' to='/teacher' />
      <MiniDrawerItem title='School Fees' to='/fee' />
      <MiniDrawerItem title='Examination' to='/examination' />
      <MiniDrawerItem title='SMS Portal' to='/sms' />
      <MiniDrawerItem title='Users' to='/users' />
      <MiniDrawerItem title='Settings' to='/settings' />
      <MiniDrawerItem title='About' to='/about' />
      <a className='mini-drawer-link' onClick={onLogOut}>
        Log Out
      </a>
      <small style={{ alignSelf: 'center' }}>Frebby Tech Consults</small>
    </Stack>
  );
};

HorizontalSidebar.propTypes = {
  onLogOut: PropTypes.func,
};

export default HorizontalSidebar;
