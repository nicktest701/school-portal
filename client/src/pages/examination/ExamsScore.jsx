import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid2,
  IconButton,
  LinearProgress,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import _ from "lodash";
import React, { useContext, useState } from "react";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import ExamsReport from "./ExamsReport";
import ExamsScoreInput from "./ExamsScoreInput";
import ExamsScoreList from "./ExamsScoreList";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import {
  NoteAltRounded,
  Person,
  RefreshRounded,
  ScoreboardRounded,
  TaskRounded,
} from "@mui/icons-material";
import { useLocation, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getExam } from "@/api/ExaminationAPI";
import Back from "@/components/Back";
import CustomTitle from "@/components/custom/CustomTitle";
import { gradeColor } from "@/config/gradeColor";
import RecordSkeleton from "@/components/skeleton/RecordSkeleton";
import { UserContext } from "@/context/providers/UserProvider";

function ExamsScore() {
  const { session } = useContext(UserContext);
  const { state } = useLocation();
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const [searchParams] = useSearchParams();

  //tab
  const [tab, setTab] = useState("1");

  const exams = useQuery({
    queryKey: ["exams-id", searchParams.get("eid")],
    queryFn: () => getExam(searchParams.get("eid")),
    enabled: !!searchParams.get("eid"),
  });

  //OPEN Report
  const handleOpenReport = () => {
    schoolSessionDispatch({
      type: "openViewReport",
    });
  };

  return (
    <>
      <>
        {exams.isPending ? (
          <RecordSkeleton />
        ) : exams?.isError ? (
          <Stack justifyContent="center" alignItems="center">
            <Typography>An error has occurred!</Typography>
          </Stack>
        ) : (
          <>
            <Back to={state?.prevPath} color="primary.main" />
            <CustomTitle
              title="Student Assessment"
              subtitle="View and manipulate results of student"
              color="primary.main"
            />
            {/* Dashboard hero  */}
            <Card sx={{ margin: "auto", padding: 2 }}>
              <CardContent>
                {/* Header */}
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Box display="flex" alignItems="center" gap={2} flex={1}>
                    {/* Circular Progress with Text */}
                    <Box>
                      <Box
                        sx={{
                          position: "relative",
                          display: "inline-flex",
                        }}
                      >
                        {/* Non-completed part */}
                        <CircularProgress
                          variant="determinate"
                          value={100} // Always render the full circle as light gray
                          size={90}
                          thickness={3}
                          sx={{
                            color: "lightgray",
                          }}
                        />
                        <CircularProgress
                          variant="determinate"
                          value={exams.data?.scorePercentage ?? 0}
                          size={90}
                          thickness={3}
                          sx={{
                            color: gradeColor(exams.data?.scorePercentage).bg,

                            position: "absolute", // Stack it on top of the gray progress
                            left: 0,
                            // bgcolor:'lightgray'
                          }} // Optional styling for 100%
                        />
                        <Box
                          sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: "absolute",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            variant="h6"
                            component="div"
                            color="text.primary"
                          >
                            {exams?.data?.scorePercentage}%
                          </Typography>
                        </Box>
                      </Box>
                      <Typography>Performance </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h4">
                        {exams?.data?.fullName}
                        <Badge
                          color="success"
                          variant="dot"
                          overlap="circular"
                          sx={{ marginLeft: 1 }}
                        >
                          <Person color="success" />
                        </Badge>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        textTransform="uppercase"
                      >
                        {exams.data?.indexnumber} | {exams.data?.level}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton
                    sx={{ justifySelf: "flex-end" }}
                    onClick={exams.refetch}
                  >
                    <RefreshRounded
                      sx={{
                        width: { xs: 24, md: 40 },
                        height: { xs: 24, md: 40 },
                      }}
                    />
                  </IconButton>
                </Box>

                {/* Progress Section */}
                <Box mt={2}>
                  <Typography variant="body2" color="text.secondary">
                    Gain insights into students' academic progress and
                    achievements. Below is the state of {exams?.data?.fullName}{" "}
                    results in the {session?.academicYear} ,{session.term}.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Only {exams.data?.scores?.length} results have been
                    approved.
                  </Typography>
                  <Box mt={2} display="flex" alignItems="center" gap={1}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="primary"
                    >
                      Result Entry Progress
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={exams?.data?.entry?.percent}
                    color={
                      gradeColor(exams?.data?.entry?.percent).bg?.split(".")[0]
                    }
                    sx={{
                      height: 8,
                      borderRadius: 1,
                      mt: 1,
                    }}
                  />
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                      Progress: {exams?.data?.entry?.percent}%
                    </Typography>
                    <Typography textAlign="center" fontSize={11}>
                      {exams?.data?.entry?.completed}/
                      {exams?.data?.entry?.total} completed
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Statistics Section */}
                <Grid2 container spacing={2}>
                  <Grid2 size={{ xs: 12, md: 4 }}>
                    <Box textAlign="center">
                      <GroupIcon color="info" />
                      <Typography variant="body1" color="info.main">
                        {_.sumBy(exams?.data?.scores, "totalScore") ?? 0}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Total Score
                      </Typography>
                    </Box>
                  </Grid2>
                  <Grid2 size={{ xs: 6, md: 4 }}>
                    <Box textAlign="center">
                      <GroupIcon color="success" />
                      <Typography variant="body1" color="success">
                        {exams.data.entry?.bestScoreSubject?.subject}(
                        {exams.data.entry?.bestScoreSubject?.totalScore})
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Best Scoring Subject
                      </Typography>
                    </Box>
                  </Grid2>
                  <Grid2 size={{ xs: 6, md: 4 }}>
                    <Box textAlign="center">
                      <AssignmentTurnedInIcon color="error" />
                      <Typography variant="body1" color="error">
                        {exams.data.entry?.worstScoreSubject?.subject}(
                        {exams.data.entry?.worstScoreSubject?.totalScore})
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Least Scoring Subject
                      </Typography>
                    </Box>
                  </Grid2>
                </Grid2>
                <Divider sx={{ my: 2 }} />

                <Box py={2} display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    startIcon={<NoteAltRounded />}
                    onClick={handleOpenReport}
                  >
                    View Report
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <Box>
              <TabContext value={tab}>
                <TabList onChange={(e, value) => setTab(value)}>
                  <Tab
                    label="Exams Score"
                    value="1"
                    icon={<ScoreboardRounded />}
                    iconPosition="start"
                  />
                  <Tab
                    label="New Exams Score"
                    value="2"
                    icon={<TaskRounded />}
                    iconPosition="start"
                  />
                </TabList>
                <TabPanel value="1" sx={{ px: 0 }}>
                  <ExamsScoreList details={exams.data} />
                </TabPanel>
                <TabPanel value="2" sx={{ px: 0 }}>
                  <ExamsScoreInput setTab={setTab} />
                </TabPanel>
              </TabContext>
            </Box>
          </>
        )}
      </>

      <ExamsReport student={exams.data} />
    </>
  );
}

export default ExamsScore;
