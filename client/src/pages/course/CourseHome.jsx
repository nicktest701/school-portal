import {
  Avatar,
  Box,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../../context/providers/UserProvider";
import CourseStudentCard from "./CourseStudentCard";
import CustomCard from "../../components/cards/CustomCard";
import Circle from "../../components/custom/Circle";
import RadarChart from "../../components/charts/RadarChart";
import LineChart from "../../components/charts/LineChart";
import BarCharts from "../../components/charts/BarCharts";
import { useQuery } from "@tanstack/react-query";
import { getCourseDashboardInfo } from "../../api/courseAPI";
import CourseAttendanceCard from "./CourseAttendanceCard";
import CustomTitle from "../../components/custom/CustomTitle";

function CourseHome() {
  const {
    user,
    userState: { session },
  } = useContext(UserContext);

  const dashboardInfo = useQuery({
    queryKey: ["course-dashboard-info"],
    queryFn: () =>
      getCourseDashboardInfo({
        session: session?.sessionId,
        term: session?.termId,
        teacher: user?.id,
      }),
    enabled: !!session?.sessionId && !!session?.termId && !!user?.id,
  });

  const labels = dashboardInfo?.data?.studentInEachLevel?.map(
    (item) => item?.level
  );
  const values = dashboardInfo?.data?.studentInEachLevel?.map(
    (item) => item?.students
  );

  const attendancelabels = dashboardInfo?.data?.groupedWeeklyAttendance?.map(
    (item) => item?.date
  );

  const presentData = dashboardInfo?.data?.groupedWeeklyAttendance?.map(
    (item) => item?.present
  );
  const absentData = dashboardInfo?.data?.groupedWeeklyAttendance?.map(
    (item) => item?.absent
  );

  return (
    <>
      <CustomTitle
        title={user?.fullname?.toUpperCase()}
        subtitle="We hope your having a great day!"
        color="white"
        bgColor="primary.main"
        icon={
          <Avatar
            loading="lazy"
            srcSet={`${import.meta.env.VITE_BASE_URL}/images/users/${
              user?.profile
            }`}
            sx={{
              width: 80,
              height: 80,
            }}
          />
        }
      />

      {/* student cards  */}
      {/* <Typography>Students</Typography>
        <Divider /> */}
      <Typography variant="h5" py={2}>
        Summary
      </Typography>
      <Divider />
      <CourseStudentCard data={dashboardInfo?.data} />

      <Typography variant="h5" py={2}>
        Student Overview
      </Typography>
      <Divider />

      <Grid container spacing={3} py={2}>
        <Grid item lg={4} md={4} xs={12}>
          {/* student by gender */}
          <CustomCard title="Students by Gender">
            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 200,
              }}
            >
              <Circle
                color="primary.main"
                label="Males"
                value={dashboardInfo?.data?.groupedStudents?.male?.length ?? 0}
                m={0}
              />
              <Circle
                color="secondary.main"
                label="Females"
                value={
                  dashboardInfo?.data?.groupedStudents?.female?.length ?? 0
                }
                m="-12px"
              />
            </Box>
          </CustomCard>
        </Grid>
        <Grid item lg={8} md={8} xs={12}>
          <CustomCard title="Students in levels">
            <BarCharts labels={labels} data={values} />
          </CustomCard>
        </Grid>
      </Grid>

      <Typography variant="h5" py={2}>
        Level Attendance
      </Typography>
      <Divider />
      <CourseAttendanceCard data={dashboardInfo?.data} />

      <Grid container spacing={3}>
        <Grid item lg={8} sm={6} xs={12}>
          <CustomCard title="Total Weekly Attendance">
            <LineChart
              labels={attendancelabels}
              values={presentData}
              values2={absentData}
            />
          </CustomCard>
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <CustomCard title="Weekly Absent">
            <RadarChart labels={attendancelabels} values={absentData} />
          </CustomCard>
        </Grid>
        {/* <Grid item lg={5} sm={12} xs={12}>
            <CustomCard title='Total Attendance'>
              <BarCharts />
            </CustomCard>
          </Grid> */}

        {/* <Grid item lg={4} sm={6} xs={12}>
            <CustomCard title='Top Attendants'>
              <List>
                <ListItem divider>
                  <ListItemAvatar>
                    <Avatar src={null} />
                  </ListItemAvatar>
                  <ListItemText primary='Nana Akwasi' />
                  <ListItemSecondaryAction>
                    <Typography>30 days</Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CustomCard>
          </Grid> */}
      </Grid>
    </>
  );
}

export default CourseHome;
