import React, { useContext, useState } from 'react';
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
import { Typography } from '@mui/material';
import ParentNew from './ParentNew';

const ViewParent = ({ open, setOpen }) => {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const { studentDispatch } = useContext(StudentContext);
  const [openNewParent, setOpenNewParent] = useState(false);

  const { studentId } = useParams();

  //CLOSE view User Info
  const handleClose = () => setOpen(false);

  const { isFetching, data } = useQuery({
    queryKey: ['parent'],
    queryFn: () => getParentByStudentId(studentId),
    enabled: !!studentId,
  });

  // OPEN Quick Message
  const openQuickMessage = (phonenumber, email) => {
    schoolSessionDispatch({
      type: 'sendQuickMessage',
      payload: {
        open: true,
        data: {
          email,
          phonenumber,
        },
      },
    });
  };

  //EDIT Student Info
  const openParentEdit = (parent) => {
    studentDispatch({
      type: 'editParent',
      payload: {
        open: true,
        data: parent,
      },
    });
  };

  //New Parent

  return (
    <>
      <Dialog open={open} maxWidth='sm' fullWidth onClose={handleClose}>
        <CustomDialogTitle title='Parent Information' onClose={handleClose} />
        <DialogContent>
          {isFetching && <Typography>Loading....</Typography>}

          {data?.length > 0 ? (
            data?.map((parent, index) => {
              return (
                <Box key={parent?._id}>
                  <Divider flexItem>
                    <Chip
                      label={`Parent /Guardian ${index + 1}`}
                      color='primary'
                    />
                  </Divider>

                  <ProfileItem
                    label='Name'
                    text={`${parent?.firstname} ${parent?.surname}`}
                  />

                  <ProfileItem
                    label='Relationship'
                    text={parent?.relationship}
                  />
                  <ProfileItem label='Gender' text={parent?.gender} />
                  <ProfileItem label='Email Address' text={parent?.email} />
                  <ProfileItem
                    label='Telephone No.'
                    text={parent?.phonenumber}
                  />
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
                        onClick={() =>
                          openQuickMessage(parent?.phonenumber, parent?.email)
                        }
                      >
                        Send Message
                      </Button>
                      <Button
                        size='small'
                        endIcon={<Edit />}
                        onClick={() => openParentEdit(parent)}
                      >
                        Edit
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
            >
              <Typography>No Parent info available</Typography>
              <Button onClick={() => setOpenNewParent(true)}>Add New</Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>
      <ParentEdit />
      <ParentNew open={openNewParent} setOpen={setOpenNewParent} />
    </>
  );
};

ViewParent.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default React.memo(ViewParent);
