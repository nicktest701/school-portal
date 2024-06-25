import { useContext } from 'react';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemText,
  Stack,
  Tooltip,
  useTheme,
} from '@mui/material';
import Swal from 'sweetalert2';
import moment from 'moment/moment';
import { SchoolSessionContext } from '../../../context/providers/SchoolSessionProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  alertError,
  alertSuccess,
} from '../../../context/actions/globalAlertActions';
import { deleteMessage, resendMessage } from '../../../api/messageAPI';
import Transition from '../../../components/animations/Transition';
import { LoadingButton } from '@mui/lab';

function SMSView() {
  const queryClient = useQueryClient();
  const { palette } = useTheme();
  const {
    schoolSessionState: {
      messageData: { open, data },
    },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const { mutateAsync, isLoading } = useMutation(resendMessage);
  const onSend = () => {
    const message = {
      id: data?._id,
      type: data?.type,
      body: data?.body,
      recipient: data?.recipient,
    };

    mutateAsync(message, {
      onSettled: () => {
        queryClient.invalidateQueries(['messages']);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        handleClose();
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  const { mutateAsync: deleteMutateAsync, isLoading: dLoading } =
    useMutation(deleteMessage);
  const handleDelete = () => {
    Swal.fire({
      title: 'Removing Message',
      text: 'Do you want to delete message?',
      showCancelButton: true,
      backdrop: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        deleteMutateAsync(data?._id, {
          onSettled: () => {
            queryClient.invalidateQueries(['messages']);
          },
          onSuccess: (data) => {
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

  const handleClose = () => {
    schoolSessionDispatch({
      type: 'viewMessage',
      payload: {
        data: {},
        open: false,
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='sm'
      fullWidth
      TransitionComponent={Transition}
    >
      <DialogTitle>Message</DialogTitle>

      <DialogContent>
        <Stack
          direction='row'
          justifyContent='flex-end'
          alignItems='flex-end'
          spacing={1}
        >
          <Tooltip title='Delete'>
            {/* <IconButton color='error' onClick={handleDelete}>
              <DeleteForeverRounded />
            </IconButton> */}
            <LoadingButton
              color='error'
              loading={dLoading}
              onClick={handleDelete}
            >
              Remove
            </LoadingButton>
          </Tooltip>
          {/* {!data.active && ( */}
          <Tooltip title='Resend'>
            {/* <IconButton color='success' onClick={onSend}>
              <RefreshRounded />
            </IconButton> */}
            <LoadingButton
              loading={isLoading}
              variant='contained'
              onClick={onSend}
            >
              Resend
            </LoadingButton>
          </Tooltip>
          {/* // )} */}
        </Stack>
        <Chip
          label={data?.active ? 'Delivered' : 'Not Delivered'}
          color={data?.active ? 'success' : 'error'}
          sx={{ color: '#fff' }}
          size='small'
        />
        <Stack>
          <ListItemText
            primary='Date of Issue'
            secondary={moment(new Date(data?.createdAt)).format('Do MMMM YYYY')}
          />
          <ListItemText primary='Type' secondary={data?.type} />
          <ListItemText
            primary='Receipient'
            secondary={
              data?.recipient?.type === 'Individual'
                ? data?.recipient?.email[0] || data?.recipient?.phonenumber[0]
                : data?.recipient?.type
            }
          />

          <ListItemText
            primary={data?.body?.title}
            secondary={data?.body?.message}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SMSView;
