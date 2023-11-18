import {
  Avatar,
  Dialog,
  DialogContent,
  Typography,
  Stack,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import Transition from '../animations/Transition';
import CustomDialogTitle from './CustomDialogTitle';
import { UserContext } from '../../context/providers/UserProvider';
import UpdateUserProfile from './UpdateUserProfile';
function ViewUserProfile({ open, setOpen }) {
  const [openUpdateUserProfile, setOpenUpdateUserProfile] = useState(false);
  const { user } = useContext(UserContext);

  const handleOpenUpdateUserProfile = () => {
    setOpenUpdateUserProfile(true);
  };

  return (
    <Dialog
      open={open}
      maxWidth='sm'
      fullWidth
      TransitionComponent={Transition}
    >
      <CustomDialogTitle title='User Profile' onClose={() => setOpen(false)} />
      <DialogContent>
        <Stack justifyContent='center' alignItems='center' rowGap={2}>
          <Stack sx={{ position: 'relative' }}>
            <Avatar
              src={
                `${import.meta.env.VITE_BASE_URL}/images/users/${
                  user?.profile
                }` 
              }
              sx={{ height: 75, width: 75 }}
            />
          </Stack>
          <Typography
            variant='h6'
            color='primary'
            sx={{ paddingTop: 2, textTransform: 'capitalize' }}
          >
            {user?.fullname}
          </Typography>
          <Typography variant='body2'>@{user?.username}</Typography>
          <Typography variant='caption'>{user?.email}</Typography>
          <Button variant='outlined' onClick={handleOpenUpdateUserProfile}>
            Edit
          </Button>
        </Stack>
      </DialogContent>
      <UpdateUserProfile
        open={openUpdateUserProfile}
        setOpen={setOpenUpdateUserProfile}
      />
    </Dialog>
  );
}

ViewUserProfile.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default React.memo(ViewUserProfile);
