import { Dialog, DialogContent, ListItemText, Stack } from '@mui/material';
import React, { useContext } from 'react';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';

function ViewLevel() {
  const {
    schoolSessionState: {
      viewLevel: { open, data },
    },

    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const handleClose = () => {
    schoolSessionDispatch({
      type: 'viewLevel',
      payload: { open: false, data: {} },
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
      <CustomDialogTitle title='Basic 1A Information' onClose={handleClose} />
      <DialogContent>
        <Stack spacing={2}>
          <ListItemText secondary='Level' primary={data?.type} />
          <ListItemText
            secondary='Number Of Students'
            primary={data?.noOfStudents}
          />
          <ListItemText
            secondary='Number of Courses '
            primary={data?.noOfSubjects}
          />
          <ListItemText
            secondary='Class Teacher'
            primary={data?.teacher?.fullName || 'Not Assigned Yet'}
          />
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default ViewLevel;
