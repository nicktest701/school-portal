import React, { useContext } from "react";
import Scrollbars from "react-custom-scrollbars";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import CustomizedMaterialTable from "../../components/tables/CustomizedMaterialTable";
import { STUDENTS_COLUMN } from "../../mockup/columns/studentColumns";
import StudentDashboardBarChart from "../../components/cards/StudentDashboardBarChart";
import StudentDashboardPieChart from "../../components/cards/StudentDashboardPieChart";
import { getAllStudentsDetails } from "../../api/studentAPI";
import StudentDashboardLineChart from "../../components/cards/StudentDashboardLineChart";
import { UserContext } from "../../context/providers/userProvider";

const StudentHome = () => {
  // const session = JSON.parse(localStorage.getItem("@school_session"));
  const {
    userState: { session },
  } = useContext(UserContext);


  const studentDetails = useQuery({
    queryKey: ["student-details"],
    queryFn: () =>
      getAllStudentsDetails({
        sessionId: session.sessionId,
        termId: session.termId,
      }),
    enabled: !!session.sessionId && !!session.termId,
  });

  return (
    <Scrollbars style={{ width: "100%", height: "100vh" }} autoHide>
      <Box
        bgcolor="primary.main"
        width="inherit"
        sx={{
          position: "relative",
          height: 200,
        }}
      >
        <Container
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Stack color="primary.contrastText" sx={{ paddingY: 4 }}>
            <Typography variant="h4">Student Portal</Typography>
            <Typography>
              Track,manage and control student information
            </Typography>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: 3,
              paddingY: 4,
            }}
          >
            <StudentDashboardPieChart {...studentDetails.data} />
            <StudentDashboardBarChart />
            <StudentDashboardLineChart {...studentDetails.data} />

            {/* <StudentDashboardCard /> */}
          </Box>

          <CustomizedMaterialTable
            title="Recently Added Students"
            isLoading={studentDetails.isFetching}
            columns={STUDENTS_COLUMN}
            data={studentDetails.data?.recentStudents ?? []}
            actions={[]}
            handleRefresh={studentDetails.refetch}
          />
        </Container>
      </Box>
    </Scrollbars>
  );
};

export default StudentHome;
