import {
  CheckCircle,
  DeleteRounded,
  DisabledByDefault,
  Edit,
  MessageRounded,
  Person,
  PhoneEnabledRounded,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  useTheme,
} from '@mui/material';

import Swal from 'sweetalert2';
import React, { useContext, useEffect, useState } from 'react';
import ProfileItem from '../../components/typo/ProfileItem';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser, enableOrDisableAccount } from '../../api/userAPI';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';
import moment from 'moment';

const UserView = () => {
  const queryClient = useQueryClient();
  const [profileImage, setProfileImage] = useState(null);
  const { palette } = useTheme();

  const {
    schoolSessionState: { userViewData },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const user = userViewData?.data;

  useEffect(() => {
    setProfileImage(`/api/images/users/${user?.profile}`);
  }, [user]);

  //DISABLE User Account

  const { mutateAsync } = useMutation(enableOrDisableAccount);

  const disableUserAccount = () => {
    Swal.fire({
      title: user?.active
        ? 'DO you want to disable this account'
        : 'Do you want to enable this account',
      text: user?.active ? 'Disabling Account' : 'Enabling Account',
      confirmButtonColor: palette.primary.main,
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        const info = {
          id: user?._id,
          active: user.active ? false : true,
        };

        mutateAsync(info, {
          onSuccess: (data) => {
            queryClient.invalidateQueries(['users']);
            schoolSessionDispatch(alertSuccess(data));
            handleClose();
          },
          onError: (error) => {
            schoolSessionDispatch(alertError(error));
          },
        });
      }
    });
  };

  //EDIT User Info
  const editUserInfo = () => {
    schoolSessionDispatch({
      type: 'editUser',
      payload: {
        open: true,
        data: user,
      },
    });
    handleClose();
  };

  //CLOSE view User Info
  const handleClose = () => {
    schoolSessionDispatch({
      type: 'viewUser',
      payload: {
        open: false,
        data: {},
      },
    });
  };

  //DELETE User Info

  const { mutateAsync: deleteMutate } = useMutation(deleteUser);

  const handleDelete = () => {
    Swal.fire({
      title: 'Deleting User',
      text: 'Do you want to delete?',
      confirmButtonColor: palette.primary.main,
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        deleteMutate(user?._id, {
          onSuccess: (data) => {
            queryClient.invalidateQueries(['users']);
            schoolSessionDispatch(alertSuccess(data));
            handleClose();
          },
          onError: (error) => {
            schoolSessionDispatch(alertError(error));
          },
        });
      }
    });
  };

  //OPEN Quick Message
  //CLOSE
  const openQuickMessage = () => {
    schoolSessionDispatch({
      type: 'sendQuickMessage',
      payload: {
        open: true,
        data: {
          email: user?.email,
          phonenumber: user?.phonenumber,
        },
      },
    });
  };

  return (
    <>
      <Dialog
        open={userViewData.open}
        maxWidth='sm'
        fullWidth
        onClose={handleClose}
      >
        <DialogTitle>User Information</DialogTitle>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box>
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              width='100%'
              paddingY={1}
              gap={1}
            >
              <Avatar srcSet={profileImage} sx={{ width: 80, height: 80 }} />
              <Button
                size='small'
                startIcon={<MessageRounded />}
                onClick={openQuickMessage}
              >
                Send Message
              </Button>
              <Stack direction='row' spacing={2} flexWrap='wrap'>
                <Button size='small' endIcon={<Edit />} onClick={editUserInfo}>
                  Edit
                </Button>
                <Button
                  size='small'
                  color={user?.active ? 'error' : 'primary'}
                  endIcon={
                    user?.active ? <DisabledByDefault /> : <CheckCircle />
                  }
                  onClick={disableUserAccount}
                >
                  {user?.active ? 'Disable Account' : 'Enable Account'}
                </Button>
                <Button
                  color='error'
                  size='small'
                  endIcon={<DeleteRounded />}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Stack>
            </Box>

            <Divider flexItem>
              <Chip label='Personal Information' color='primary' />
            </Divider>

            <ProfileItem label='Name' text={`${user?.fullname}`} />
            <ProfileItem label='Username' text={`${user?.username}`} />
            <ProfileItem label='Role' text={user?.role} />
            <ProfileItem
              label='Date Of Birth'
              tex
              text={moment(new Date(user?.dateofbirth)).format(
                'Do MMMM, YYYY.'
              )}
            />
            <ProfileItem label='Gender' text={user?.gender} />
            <ProfileItem label='Email Address' text={user?.email} />
            <ProfileItem label='Telephone No.' text={user?.phonenumber} />
            <ProfileItem label='Address' text={user?.address} />
            <ProfileItem label='Residence' text={user?.residence} />

            <ProfileItem label='Nationality' text={user?.nationality} />
            <Divider flexItem>
              <Chip label='Account Status' color='primary' />
            </Divider>
            <ProfileItem
              label='Account'
              text={user?.active ? 'Active' : 'Disabled'}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

UserView.propTypes = {};

export default React.memo(UserView);
