import {
  Box,
  Divider,
  Grid2 as Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "@/context/providers/UserProvider";
import CourseStudentCard from "./CourseStudentCard";
import Circle from "@/components/custom/Circle";
import BarCharts from "@/components/charts/BarCharts";
import { useQuery } from "@tanstack/react-query";
import { getCourseDashboardInfo } from "@/api/courseAPI";
import CourseAttendanceCard from "./CourseAttendanceCard";
import CustomTitle from "@/components/custom/CustomTitle";
import ChartContainer from "@/components/charts/ChartContainer";
import { Refresh, SchoolRounded } from "@mui/icons-material";
import TeacherLevelWeeklyAttendance from "@/components/charts/TeacherLevelWeeklyAttendance";
import GenderAttendance from "@/components/charts/GenderAttendance";

function CourseHome() {
  const { user, session } = useContext(UserContext);

  const dashboardInfo = useQuery({
    queryKey: ["course-dashboard-info"],
    queryFn: () =>
      getCourseDashboardInfo({
        session: session?.sessionId,
        term: session?.termId,
        teacher: user?.id,
      }),
    enabled: !!session?.sessionId && !!session?.termId && !!user?.id,
    initialData: {
      weeklyAttendances: {
        labels: [""],
        datasets: [],
      },
      genderAttendance: {
        labels: ["Male", "Female"],
        datasets: [],
      },
    },
  });

  const labels = dashboardInfo?.data?.studentInEachLevel?.map(
    (item) => item?.level
  );
  const values = dashboardInfo?.data?.studentInEachLevel?.map(
    (item) => item?.students
  );

  return (
    <>
      <CustomTitle
        title="Levels Summary"
        subtitle=" Get a comprehensive summary of student enrollment, performance, and engagement in the academic year."
        icon={<SchoolRounded color="primary" />}
        color="primary.main"
        right={
          <Tooltip title="Refresh">
            <IconButton>
              <Refresh
                onClick={dashboardInfo?.refetch}
                sx={{ width: 36, height: 36 }}
              />
            </IconButton>
          </Tooltip>
        }
      />

      <Typography variant="h5" py={2}>
        Summary
      </Typography>
      <Divider />
      <CourseStudentCard data={dashboardInfo?.data} />

      <Typography variant="h5" py={2}>
        Students
      </Typography>
      <Divider />

      <Grid container spacing={3} py={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          {/* student by gender */}
          <ChartContainer
            title="Students by Gender"
            subtitle="Analyze the gender distribution of students."
          >
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
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
          </ChartContainer>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <ChartContainer
            title="Students in levels"
            subtitle="Track student distribution across different academic levels for better class management"
          >
            <BarCharts labels={labels} data={values} />
          </ChartContainer>
        </Grid>
      </Grid>

      <Typography variant="h5" py={2}>
        Attendance
      </Typography>
      <Divider />
      <CourseAttendanceCard data={dashboardInfo?.data} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, lg: 8 }}>
          <TeacherLevelWeeklyAttendance
            data={dashboardInfo?.data?.weeklyAttendances}
          />
          {/* <ChartContainer
            title="Total Weekly Attendance"
            subtitle=" Review attendance records on a weekly basis"
          >
            <LineChart
              labels={attendancelabels}
              values={presentData}
              values2={absentData}
            />
          </ChartContainer> */}
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          {/* <ChartContainer title="Weekly Absent">
            <RadarChart labels={attendancelabels} values={absentData} />
          </ChartContainer> */}
          <GenderAttendance data={dashboardInfo?.data?.genderAttendance} />
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
      {/* <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(1fr,1fr))",
          gap: 2,
          mt: 2,
        }}
      >
        <TeacherLevelWeeklyAttendance
          data={dashboardInfo?.data?.weeklyAttendances}
        />
      </Box> */}
    </>
  );
}

export default CourseHome;
