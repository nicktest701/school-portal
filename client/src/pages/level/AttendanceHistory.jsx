import React from "react";
import {
  Container,
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { PropTypes } from "prop-types";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAttendanceHistory } from "../../api/attendanceAPI";
import moment from "moment";
import Back from "../../components/Back";
import CustomTitle from "../../components/custom/CustomTitle";
import LoadingSpinner from "../../components/spinners/LoadingSpinner";

function AttendanceHistory() {
  const { id, type } = useParams();

  const attendanceHistory = useQuery({
    queryKey: ["attendance-history"],
    queryFn: () => getAttendanceHistory(id),
    enabled: !!id,
  });

  return (
    <Container>
      <Back to={`/level/attendance/${id}/${type}`} color="primary.main" />
      <CustomTitle
        title="Attendance History"
        subtitle="Review past attendance records to analyze trends, identify issues, and ensure comprehensive tracking of student and staff presence."
        color="primary.main"
      />
      <DialogContent>
        {attendanceHistory.isLoading && <Typography>Loading....</Typography>}

        <ListItemText
          primary={`Attendance - ${attendanceHistory?.data?.length} days`}
          primaryTypographyProps={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "right",
          }}
        />
        <List sx={{ maxHeight: 600 }}>
          <ListItem>
            <ListItemText primary="Date" />
            <ListItemText primary="Present" />
            <ListItemText primary="Absent" />
          </ListItem>
          {attendanceHistory.data &&
            attendanceHistory.data.map((attendance) => (
              <ListItemButton key={attendance.date} divider>
                <ListItemText
                  primary={moment(attendance.date).format("Do MMMM,YYYY")}
                  secondary={moment(attendance.date).format("dddd")}
                  secondaryTypographyProps={{
                    color: "primary.main",
                    fontWeight: "bold",
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
      {attendanceHistory.isLoading && (
        <LoadingSpinner value="Loading Attendance History" />
      )}
    </Container>
  );
}
AttendanceHistory.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default AttendanceHistory;
