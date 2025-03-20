import React, { use } from "react";
import _ from "lodash";
import { Container, ListItemText, Typography, Box } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { PropTypes } from "prop-types";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAttendanceHistory } from "@/api/attendanceAPI";
import moment from "moment";
import Back from "@/components/Back";
import CustomTitle from "@/components/custom/CustomTitle";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";
import { UserContext } from "@/context/providers/UserProvider";
import DataSkeleton from "@/components/skeleton/DataSkeleton";

function AttendanceHistory() {
  const { user } = use(UserContext);
  const { id } = useParams();

  const attendanceHistory = useQuery({
    queryKey: ["attendance-history", id],
    queryFn: () => getAttendanceHistory(id),
    enabled: !!id,
  });

  if (attendanceHistory.isPending) {
    return <DataSkeleton />;
  }
  return (
    <Container>
      {user?.role === "administrator" && (
        <Back to={`/level/${id}/attendance`} color="primary.main" />
      )}

      {user?.role === "teacher" && (
        <Back to={`/course/level/${id}/attendance`} color="primary.main" />
      )}

      <CustomTitle
        title="Attendance History"
        subtitle="Review past attendance records to analyze trends, identify issues, and ensure comprehensive tracking of student and staff presence."
        color="primary.main"
      />

      <Box sx={{ bgcolor: "#fff", p: 2 }}>
        <ListItemText
          primary="Attendance"
          secondary={`${attendanceHistory?.data?.length} days`}
          slotProps={{
            primary: {
              fontSize: 20,
              fontWeight: "bold",
              // textAlign: "right",
            },
            secondary: {
              color: "#1976d2",
              fontWeight: "bold",
            },
          }}
        />

        <TableContainer
          component={Paper}
          sx={{ maxHeight: "70svh", overflowY: "auto" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Present</TableCell>
                <TableCell>Absent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceHistory.data &&
                attendanceHistory.data.map((attendance) => (
                  <TableRow key={attendance.date}>
                    <TableCell>
                      {moment(new Date(attendance.date)).format(
                        "Do MMMM, YYYY"
                      )}
                      <br />
                      <span style={{ color: "#1976d2", fontWeight: "bold" }}>
                        {moment(new Date(attendance.date)).format("dddd")}
                      </span>
                    </TableCell>
                    <TableCell>{attendance.present}</TableCell>
                    <TableCell>{attendance.absent}</TableCell>
                  </TableRow>
                ))}

              {/* Total Row */}
              <TableRow sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
                <TableCell>Total</TableCell>
                <TableCell>
                  {_.sumBy(attendanceHistory.data, "present")}
                </TableCell>
                <TableCell>
                  {_.sumBy(attendanceHistory.data, "absent")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
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
