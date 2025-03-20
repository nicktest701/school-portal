import React, { useContext, useState } from "react";
import {
  Stack,
  Typography,
  Button,
  Divider,
  Avatar,
  Container,
  Tab,
  Box,
  IconButton,
} from "@mui/material";
import {
  MessageRounded,
  NoteRounded,
  PersonRounded,
  RefreshRounded,
  ReportRounded,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useParams, useSearchParams } from "react-router-dom";
import StudentProfile from "@/components/tabs/student/StudentProfile";
import StudentFees from "./StudentFees";
import StudentAcademics from "@/components/tabs/student/StudentAcademics";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStudent } from "@/api/studentAPI";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import Back from "@/components/Back";
import { getStudentAcademics } from "@/api/ExaminationAPI";
import { UserContext } from "@/context/providers/UserProvider";
import { getStudentAllFeeHistory } from "@/api/currentFeeAPI";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";
import useLocalStorage from "@/hooks/useLocalStorage";
import useLevelById from "@/components/hooks/useLevelById";

const StudentDetails = () => {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useLocalStorage("student_profile_tab", "1");

  const {
    session
  } = useContext(UserContext);
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const queryClient = useQueryClient();
  ///Params
  const { studentId } = useParams();

  //States

  const id = searchParams.get("_l");
  const { levelName } = useLevelById(id);

  ///
  const {
    data: student,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["student-profile", studentId],
    queryFn: () => getStudent(studentId),
    enabled: !!studentId,
    initialData: queryClient
      .getQueryData(["all-students"])
      ?.find((student) => student?._id === studentId),
  });

  //Get Academic Terms for students
  const studentAcademics = useQuery({
    queryKey: ["student-academics", studentId],
    queryFn: () => getStudentAcademics(session, studentId, id),
    initialData: [],
    enabled: !!studentId && !!id,
  });

  //Get Academic Terms for students
  const studentFees = useQuery({
    queryKey: ["student-fees", studentId],
    queryFn: () => getStudentAllFeeHistory(studentId),
    initialData: [],
    enabled: !!studentId,
  });

  //OPEN Quick Message
  //CLOSE
  const openQuickMessage = () => {
    schoolSessionDispatch({
      type: "sendQuickMessage",
      payload: {
        open: true,
        data: {
          email: student?.email,
          phonenumber: student?.phonenumber,
        },
      },
    });
  };

  const handleRefresh = () => {
    studentAcademics.refetch();
    studentFees.refetch();
    refetch();
  };

  return (
    <Container>
      <Back to="/student/view" color="primary.main" />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: { xs: "center", md: "start" },
          gap: 5,
          p: 2,
          bgcolor: "#fff",
          borderRadius: "12px",
        }}
      >
        <Stack
          spacing={1}
          justifyContent="center"
          alignItems="center"
          py={2}
          sx={{
            position: { xs: "relative", md: "-webkit-sticky" },
            top: 0,
            minWidth: 300,
          }}
        >
          <IconButton sx={{ alignSelf: "flex-end" }} onClick={handleRefresh}>
            <RefreshRounded />
          </IconButton>
          <Avatar
            srcSet={student?.profile}
            sx={{
              width: 100,
              height: 100,
            }}
          />

          <Typography>{student?.indexnumber}</Typography>
          <Typography variant="h6">{student?.fullName}</Typography>
          <Typography variant="body2">{levelName}</Typography>
          <Button
            variant="contained"
            startIcon={<MessageRounded />}
            onClick={openQuickMessage}
          >
            Send Message
          </Button>
        </Stack>

        {/* <Divider flexItem /> */}
        <Box sx={{ flexGrow: 1 }}>
          <TabContext value={tab}>
            <TabList
              onChange={(e, value) => setTab(value)}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab
                value="1"
                label="Profile"
                icon={<PersonRounded />}
                iconPosition="start"
              />
              <Tab
                value="2"
                label="Academic Records"
                icon={<ReportRounded />}
                iconPosition="start"
              />
              <Tab
                value="3"
                label="Fees History"
                icon={<NoteRounded />}
                iconPosition="start"
              />
            </TabList>
            <Divider />
            <TabPanel value="1" sx={{ px: 0 }}>
              <StudentProfile student={student} />
            </TabPanel>
            <TabPanel value="2" sx={{ px: 0 }}>
              <StudentAcademics data={studentAcademics?.data} />
            </TabPanel>
            <TabPanel value="3" sx={{ px: 0 }}>
              <StudentFees data={studentFees?.data} />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
      {(isPending || studentAcademics.isPending || studentFees.isPending) && (
        <LoadingSpinner value="Please Wait..." />
      )}
    </Container>
  );
};

export default StudentDetails;
