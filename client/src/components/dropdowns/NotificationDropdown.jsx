import { Box, Divider, IconButton, Stack, Typography } from '@mui/material';
import _ from 'lodash';
import { useEffect } from 'react';
import {
  Close,
  Notifications,
  NotificationsOffSharp,
} from '@mui/icons-material';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import Menu from '@mui/icons-material/Menu';

const NotificationDropdown = ({ display, setClose }) => {
  const navigate = useNavigate();
  const handleClose = () => setClose(false);

  const goToTransactions = () => {
    navigate('/profile/notifications');
    handleClose();
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      if (display) {
        handleClose();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [display]);

  return (
    <Box
      sx={{
        display: 'block',
        position: 'absolute',
        visibility: display ? 'visible' : 'collapse',
        width: 380,
        height: 400,
        overflowY: 'hidden',
        bgcolor: '#fff',
        top: 35,
        right: 10,
        zIndex: 99999999,
        boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
        transform: `translateY(${display ? 0 : 10}px)`,
        transition: 'all 150ms ease-in-out',
        opacity: display ? 1 : 0,
        borderRadius: 1,
      }}
    >
      <Stack
        bgcolor='primary.main'
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        p={1}
      >
        <Typography color='white' sx={{ flexGrow: 1 }}>
          Notifications
        </Typography>
        <IconButton onClick={goToTransactions}>
          <Menu />
        </IconButton>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
     
      </Stack>
      <Stack bgcolor='white' sx={{ position: 'relative' }}>
        {[].length === 0 ? (
          <Stack justifyContent='center' alignItems='center' height={300}>
            <NotificationsOffSharp />
            <Typography variant='body2'>No Notification available!</Typography>
          </Stack>
        ) : (
          _.take([], 3)?.map((notif) => {
            return (
              <Stack
                key={notif?._id}
                onClick={goToTransactions}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'whitesmoke',
                  },
                }}
              >
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                  pr={2}
                >
                  <Typography color='primary.main' p={1} fontWeight={700}>
                    {notif?.title}
                  </Typography>
                  <Notifications sx={{ width: 16, height: 16 }} />
                </Stack>
                <Typography variant='body2' color='secondary.main' p={1}>
                  {notif?.body || notif?.message}
                </Typography>
                <Typography
                  color='primary.main'
                  p={1}
                  fontSize={10}
                  textAlign='right'
                  // paragraph
                >
                  {moment(notif?.createdAt).fromNow()}
                </Typography>
                <Divider flexItem />
              </Stack>
            );
          })
        )}

        {[].length > 0 && (
          <Link
            to='/profile/notifications'
            style={{
              display: 'block',
              textDecoration: 'none',
              textAlign: 'center',
              paddingTop: '4px',
            }}
          >
            Show More
          </Link>
        )}
      </Stack>
    </Box>
  );
};

export default NotificationDropdown;
