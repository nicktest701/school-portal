import React, { useContext } from 'react';
import { Drawer, IconButton, Stack } from '@mui/material';
import { Close } from '@mui/icons-material';
import PropTypes from 'prop-types';
import MiniDrawerItem from '../../components/MiniDrawerItem';
import { UserContext } from '../../context/providers/UserProvider';

const HorizontalSidebar = ({ open, setOpen, onLogOut }) => {
  const { user } = useContext(UserContext);
  const handleClose = () => setOpen(false);

  return (
    <Drawer open={open} onClose={handleClose} sx={{ zIndex: 9999 }}>
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

        <MiniDrawerItem title='Dashboard' to='/' handleClose={handleClose} />

        {user?.role === 'administrator' ? (
          <>
            <MiniDrawerItem
              title='Sessions'
              to='/session'
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title='Levels'
              to='/level'
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title='Subjects & Grades'
              to='/subject'
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title='Students'
              to='/student'
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title='Teachers'
              to='/teacher'
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title='School Fees'
              to='/fee'
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title='Exams Portal'
              to='/examination'
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title='Messages'
              to='/sms'
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title='Users'
              to='/users'
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title='Settings'
              to='/settings'
              handleClose={handleClose}
            />
          </>
        ) : (
          <>
            {/* <MiniDrawerItem
              title='Performance Index'
              to='/course'
              handleClose={handleClose}
            /> */}
            <MiniDrawerItem
              title='Levels & Courses'
              to='/course'
              handleClose={handleClose}
            />
          </>
        )}
        {/* <MiniDrawerItem
          title='Activities & Notifications'
          to='/course'
          handleClose={handleClose}
        /> */}
        <MiniDrawerItem title='About' to='/about' handleClose={handleClose} />
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
