import React, { useContext } from "react";
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
  useMediaQuery,
  useTheme,
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
import LoadingSpinner from "@/components/spinners/LoadingSpinner";
import useLocalStorage from "@/hooks/useLocalStorage";
import useLevelById from "@/components/hooks/useLevelById";
import EmptyDataContainer from "@/components/EmptyDataContainer";
import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton";

const StudentDetails = () => {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useLocalStorage("student_profile_tab", "1");
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const queryClient = useQueryClient();
  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.up("md"));
  ///Params
  const { studentId } = useParams();

  //States

  const id = searchParams.get("_l");
  const { levelName } = useLevelById(id);

  ///
  const {
    data: student,
    isPending,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["student-profile", studentId],
    queryFn: () => getStudent(studentId),
    enabled: !!studentId,
    initialData: {
      profile: queryClient
        .getQueryData(["all-students"])
        ?.find((student) => student?._id === studentId),
      fees: [],
      exams: [],
      parents: [],
    },
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

  if (isPending || isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <Container>
      <Back to={-1} color="primary.main" />
      {/* {(isPending || isLoading) && <ProfileSkeleton />} */}

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
          <IconButton sx={{ alignSelf: "flex-end" }} onClick={refetch}>
            <RefreshRounded />
          </IconButton>
          <Avatar
            srcSet={student?.profile?.profile}
            sx={{
              width: 100,
              height: 100,
            }}
          />

          <Typography>{student?.profile?.indexnumber}</Typography>
          <Typography variant="h6">{student?.profile?.fullName}</Typography>
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
                icon={matches ? <PersonRounded /> : null}
                iconPosition="start"
              />
              <Tab
                value="2"
                label="Academic Records"
                icon={matches ? <ReportRounded /> : null}
                iconPosition="start"
              />
              <Tab
                value="3"
                label="Fees History"
                icon={matches ? <NoteRounded /> : null}
                iconPosition="start"
              />
            </TabList>
            <Divider />
            <TabPanel value="1" sx={{ px: 0 }}>
              <StudentProfile
                levelName={levelName}
                parents={student?.parents}
                student={student?.profile}
              />
            </TabPanel>
            <TabPanel value="2" sx={{ px: 0 }}>
              {student?.exams?.length > 0 ? (
                <StudentAcademics data={student?.exams} />
              ) : (
                <EmptyDataContainer message="No Academic Records Found!" />
              )}
            </TabPanel>
            <TabPanel value="3" sx={{ px: 0 }}>
              {student?.exams?.length > 0 ? (
                <StudentFees fees={student?.fees} levelId={id} />
              ) : (
                <EmptyDataContainer message="No Academic Records Found!" />
              )}
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
      {isPending && <LoadingSpinner value="Please Wait..." />}
    </Container>
  );
};

export default StudentDetails;
