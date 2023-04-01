import {
  Avatar,
  Dialog,
  DialogContent,
  Typography,
  Stack,
  Button,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import Transition from '../animations/Transition';
import CustomDialogTitle from './CustomDialogTitle';
import CustomImageChooser from '../inputs/CustomImageChooser';
import { uploadProfileImage } from '../../api/sessionAPI';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';
import { useQueryClient } from '@tanstack/react-query';
import { UserContext } from '../../context/providers/userProvider';
function ViewUserProfile({ open, setOpen }) {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const {
    userState: { user },
  } = useContext(UserContext);
  const queryClient = useQueryClient();
  const [profileImage, setProfileImage] = useState(
    `${import.meta.env.VITE_BASE_NET_LOCAL}/images/users/${user?.profile}`
  );

  const uploadProfile = async (e) => {
    const profile = e.target?.files[0];
    const info = {
      _id: user?.id,
      profile,
      type: 'users',
    };

    try {
      const data = await uploadProfileImage(info);
      schoolSessionDispatch(alertSuccess(data));
      setProfileImage(URL.createObjectURL(profile));
    } catch (error) {
      schoolSessionDispatch(alertError(error));
    }
    queryClient.invalidateQueries(['users']);
    queryClient.invalidateQueries(['verify-user']);
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
            <Avatar src={profileImage} sx={{ height: 75, width: 75 }} />
            <CustomImageChooser handleImageUpload={uploadProfile} />
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
          <Button variant='outlined'>Edit</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(ViewUserProfile);
