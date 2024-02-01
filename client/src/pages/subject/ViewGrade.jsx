import {
  Dialog,
  DialogContent,
  FormLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
 
} from '@mui/material';
import React, { useContext } from 'react';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import GradeItem from './GradeItem';

function ViewGrade() {
  const {
    schoolSessionState: {
      viewGrades: { open, ratings },
    },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const handleCloseDialog = () => {
    schoolSessionDispatch({
      type: 'viewGrade',
      payload: { open: false, data: [] },
    });
  };
  return (
    <Dialog open={open} maxWidth='sm' fullWidth>
      <CustomDialogTitle title='Grade' onClose={handleCloseDialog} />
      <DialogContent>
        <List>
          <ListItem
            sx={{ display: 'flex', columnGap: 8 }}
            width='80%'
          >
            <FormLabel>Highest Mark</FormLabel>
            <FormLabel>Lowest Mark</FormLabel>
            <FormLabel>Grade</FormLabel>
            <ListItemSecondaryAction>
              <FormLabel>Remarks</FormLabel>
            </ListItemSecondaryAction>
          </ListItem>
          {ratings.map((item) => (
            <GradeItem key={item?.id} {...item} />
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}

export default ViewGrade;
