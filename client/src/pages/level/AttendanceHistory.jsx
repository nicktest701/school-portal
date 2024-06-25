import React from 'react';
import {
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { PropTypes } from 'prop-types';
import { useParams } from 'react-router-dom';
import Transition from '../../components/animations/Transition';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import { useQuery } from '@tanstack/react-query';
import { getAttendanceHistory } from '../../api/attendanceAPI';
import moment from 'moment';

function AttendanceHistory({ open, setOpen }) {
  const { id } = useParams();

  const attendanceHistory = useQuery({
    queryKey: ['attendance-history'],
    queryFn: () => getAttendanceHistory(id),
    enabled: !!id,
  });

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth='md'
      TransitionComponent={Transition}
    >
      <CustomDialogTitle
        title='Attendance History'
        onClose={() => setOpen(false)}
      />
      <DialogContent>
        {attendanceHistory.isLoading && <Typography>Loading....</Typography>}

        <ListItemText
          primary={`Attendance - ${attendanceHistory?.data?.length} days`}
          primaryTypographyProps={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'right',
          }}
        />
        <List sx={{ maxHeight: 600 }}>
          <ListItem>
            <ListItemText primary='Date' />
            <ListItemText primary='Present' />
            <ListItemText primary='Absent' />
          </ListItem>
          {attendanceHistory.data &&
            attendanceHistory.data.map((attendance) => (
              <ListItemButton key={attendance.date} divider>
                <ListItemText
                  primary={moment(attendance.date).format('Do MMMM,YYYY')}
                  secondary={moment(attendance.date).format('dddd')}
                  secondaryTypographyProps={{
                    color: 'primary.main',
                    fontWeight: 'bold',
                  }}
                />
                <ListItemText
                  primary={attendance.present}
                  primaryTypographyProps={{
                    width: 100,
                  }}
                />
                <ListItemText
                  primary={attendance.absent}
                  primaryTypographyProps={{
                    width: 100,
                  }}
                />
              </ListItemButton>
            ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
AttendanceHistory.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default AttendanceHistory;
