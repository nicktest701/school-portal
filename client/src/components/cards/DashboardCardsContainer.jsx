import React, { useContext } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import SubjectIcon from "@mui/icons-material/Subject";
import ClassIcon from "@mui/icons-material/Class";
import Box from "@mui/material/Box";
import { Person3 } from "@mui/icons-material";
import DashboardCard from "./DashboardCard";
import { useQuery } from "@tanstack/react-query";
import { getDashboardInfo } from "../../api/levelAPI";
import { UserContext } from "../../context/providers/UserProvider";
import { useErrorBoundary } from "react-error-boundary";
import DashboardSkeleton from "../skeleton/DashboardSkeleton";
import { IconButton, Stack, Typography } from "@mui/material";
import StudentCountChart from "../charts/StudentCountChart";
import WeeklyAttendance from "../charts/WeeklyAttendance";
import GenderAttendance from "../charts/GenderAttendance";

function DashboardCardsContainer() {
  const { showBoundary } = useErrorBoundary();
  const { session } = useContext(UserContext);

  const info = useQuery({
    queryKey: ["dashboard-info", session?.sessionId, session?.termId],
    queryFn: () =>
      getDashboardInfo({ session: session?.sessionId, term: session?.termId }),
    enabled: !!session?.sessionId && !!session?.termId,
    onError: (error) => {
      showBoundary(error);
    },
    initialData: {
      teachers: 0,
      levels: 0,
      courses: 0,
      students: 0,
      studentCount: {
        male: 0,
        female: 0,
      },
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

  if (info.isPending) return <DashboardSkeleton />;

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
          gap: 2,
          // py: 4,
          width: "100%",
        }}
      >
        <DashboardCard
          title="Students"
          value={info?.data?.students}
          icon={
            <IconButton sx={{ bgcolor: "error.lighter" }}>
              <GroupsIcon
                sx={{
                  width: 20,
                  height: 20,
                  color: "error.darker",
                }}
              />
            </IconButton>
          }
        />

        <DashboardCard
          title="Tutors"
          value={info?.data?.teachers}
          icon={
            <IconButton sx={{ bgcolor: "info.lighter" }}>
              <Person3
                sx={{
                  width: 20,
                  height: 20,
                  color: "info.darker",
                }}
              />
            </IconButton>
          }
        />
        <DashboardCard
          title="Levels"
          value={info?.data?.levels}
          icon={
            <IconButton sx={{ bgcolor: "success.lighter" }}>
              <SubjectIcon
                sx={{
                  width: 20,
                  height: 20,
                  color: "success.darker",
                }}
              />
            </IconButton>
          }
        />
        <DashboardCard
          title="Courses"
          value={info?.data?.courses}
          icon={
            <IconButton sx={{ bgcolor: "warning.lighter" }}>
              <ClassIcon
                sx={{
                  width: 20,
                  height: 20,
                  color: "warning.darker",
                }}
              />
            </IconButton>
          }
        />
      </Box>

      <Typography variant="h4" paragraph>
        Attendance Details
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "auto",
          gap: 4,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(auto-fit,minmax(250px,1fr))",
              md: "1fr 1fr",
            },
            gap: 2,
          }}
        >
          <StudentCountChart data={info?.data?.studentCount} />
          <GenderAttendance data={info?.data?.genderAttendance} />
        </Box>
   
        {/* attendanceSummary */}
        <WeeklyAttendance data={info?.data?.weeklyAttendances} />
      
      </Box>
    </Stack>
  );
}

export default React.memo(DashboardCardsContainer);
