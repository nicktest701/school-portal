import React from "react";
import _ from "lodash";
import {
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { PropTypes } from "prop-types";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAttendanceHistory } from "@/api/attendanceAPI";
import moment from "moment";
import Back from "@/components/Back";
import CustomTitle from "@/components/custom/CustomTitle";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";

function AttendanceHistory({ section }) {
  const { id, type } = useParams();

  const attendanceHistory = useQuery({
    queryKey: ["attendance-history", id],
    queryFn: () => getAttendanceHistory(id),
    enabled: !!id,
  });

  return (
    <Container>
      <Back
        to={
          section === "level"
            ? `/level/attendance/${id}/${type}`
            : `/course/attendance/${id}/${type}`
        }
        color="primary.main"
      />
      <CustomTitle
        title="Attendance History"
        subtitle="Review past attendance records to analyze trends, identify issues, and ensure comprehensive tracking of student and staff presence."
        color="primary.main"
      />
      <Box sx={{ bgcolor: "#fff", p: 2 }}>
        {attendanceHistory.isPending && <Typography>Loading....</Typography>}

        <ListItemText
          primary={`Attendance - ${attendanceHistory?.data?.length} days`}
          primaryTypographyProps={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "right",
          }}
        />
        <List sx={{ maxHeight: "50svh", overflowY: "auto" }}>
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
                  slotProps={{
                    secondary: {
                      color: "primary.main",
                      fontWeight: "bold",
                    },
                  }}
                />
                <ListItemText
                  primary={attendance.present}
                  slotProps={{
                    primary: {
                      width: 100,
                    },
                  }}
                />
                <ListItemText
                  primary={attendance.absent}
                  slotProps={{
                    primary: {
                      width: 100,
                    },
                  }}
                />
              </ListItemButton>
            ))}
          <ListItemButton divider>
            <ListItemText
              primary={"Total"}
              slotProps={{
                secondary: {
                  color: "primary.main",
                  fontWeight: "bold",
                },
                primary: {
                  width: 130,
                },
              }}
            />
            <ListItemText
              primary={_.sumBy(attendanceHistory.data, "present")}
              slotProps={{
                primary: {
                  width: 100,
                },
              }}
            />
            <ListItemText
              primary={_.sumBy(attendanceHistory.data, "absent")}
              slotProps={{
                primary: {
                  width: 100,
                },
              }}
            />
          </ListItemButton>
        </List>
      </Box>
      {attendanceHistory.isPending && (
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
