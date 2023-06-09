import React, { useContext } from 'react';
import { Edit, MessageRounded } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import ProfileItem from '../../../components/typo/ProfileItem';
import { getParentByStudentId } from '../../../api/parentAPI';
import { SchoolSessionContext } from '../../../context/providers/SchoolSessionProvider';
import CustomDialogTitle from '../../../components/dialog/CustomDialogTitle';
import { StudentContext } from '../../../context/providers/StudentProvider';
import ParentEdit from './ParentEdit';

const ViewParent = ({ open, setOpen }) => {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const { studentDispatch } = useContext(StudentContext);

  const { studentId } = useParams();

  //CLOSE view User Info
  const handleClose = () => setOpen(false);

  //DELETE User Info

  // const { mutateAsync } = useMutation(deleteUser);

  //   const handleDelete = () => {
  //     Swal.fire({
  //       title: 'Deleting User',
  //       text: 'Do you want to delete?',
  //       confirmButtonColor: palette.primary.main,
  //       showCancelButton: true,
  //     }).then((data) => {
  //       if (data.isConfirmed) {
  //         mutateAsync(parent?._id, {
  //           onSuccess: (data) => {
  //             queryClient.invalidateQueries(['users']);
  //             // schoolSessionDispatch(alertSuccess(data));
  //             handleClose();
  //           },
  //           onError: (error) => {},
  //         });
  //       }
  //     });
  //   };

  const { data: parent } = useQuery({
    queryKey: ['parent'],
    queryFn: () => getParentByStudentId(studentId),
    enabled: !!studentId,
  });

  // OPEN Quick Message
  const openQuickMessage = () => {
    schoolSessionDispatch({
      type: 'sendQuickMessage',
      payload: {
        open: true,
        data: {
          email: parent?.email,
          phonenumber: parent?.phonenumber,
        },
      },
    });
  };

  //EDIT Student Info
  const openParentEdit = () => {
    studentDispatch({
      type: 'editParent',
      payload: {
        open: true,
        data: parent,
      },
    });
  };

  return (
    <>
      <Dialog open={open} maxWidth='sm' fullWidth onClose={handleClose}>
        <CustomDialogTitle title='Parent Information' onClose={handleClose} />
        <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box>
            <Divider flexItem>
              <Chip label='Details' color='primary' />
            </Divider>

            <ProfileItem
              label='Name'
              text={`${parent?.firstname} ${parent?.surname}`}
            />

            <ProfileItem label='Gender' text={parent?.gender} />
            <ProfileItem label='Email Address' text={parent?.email} />
            <ProfileItem label='Telephone No.' text={parent?.phonenumber} />
            <ProfileItem label='Address' text={parent?.address} />
            <ProfileItem label='Residence' text={parent?.residence} />
            <ProfileItem label='Nationality' text={parent?.nationality} />
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              width='100%'
              paddingY={2}
              gap={1}
            >
              <Stack direction='row' spacing={2} flexWrap='wrap'>
                <Button
                  size='small'
                  startIcon={<MessageRounded />}
                  onClick={openQuickMessage}
                >
                  Send Message
                </Button>
                <Button
                  size='small'
                  endIcon={<Edit />}
                  onClick={openParentEdit}
                >
                  Edit
                </Button>
              </Stack>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <ParentEdit />
    </>
  );
};

ViewParent.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default React.memo(ViewParent);
