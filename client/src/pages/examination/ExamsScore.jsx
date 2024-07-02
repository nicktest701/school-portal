import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import _ from "lodash";
import React, { useContext, useState } from "react";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import ExamsReport from "./ExamsReport";
import ExamsScoreInput from "./ExamsScoreInput";
import ExamsScoreList from "./ExamsScoreList";
import {
  NoteAltRounded,
  ScoreboardRounded,
  TaskRounded,
} from "@mui/icons-material";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getExams } from "../../api/ExaminationAPI";
import { getSubjectsForLevel } from "../../api/levelAPI";
import Back from "../../components/Back";
import CustomTitle from "../../components/custom/CustomTitle";


function ExamsScore() {
  const { state } = useLocation();
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const [searchParams] = useSearchParams();
  const { levelId } = useParams();

  //tab
  const [tab, setTab] = useState("1");

  const exams = useQuery({
    queryKey: ["exams-by-id", searchParams.get("eid")],
    queryFn: () => getExams(searchParams.get("eid")),
    enabled: !!searchParams.get("eid"),
  });

  const levelOptions = useQuery({
    queryKey: ["subjects", levelId],
    queryFn: () => getSubjectsForLevel(levelId),
    enabled: !!levelId,
    select: ({ subjects, grades }) => {
      return {
        subjects,
        grades,
      };
    },
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
        <Back to={state?.prevPath} color="primary.main" />
        <CustomTitle
          title="Student Assessment"
          subtitle="View and manipulate results of student"
          color="primary.main"
        />

        {exams.isLoading ? (
          <Stack justifyContent="center" alignItems="center">
            <CircularProgress />
          </Stack>
        ) : exams?.isError ? (
          <Stack justifyContent="center" alignItems="center">
            <Typography>An error has occurred!</Typography>
          </Stack>
        ) : (
          <Box>
            <Typography variant="h3" py={5} paragraph>
              {exams?.data?.fullName}
            </Typography>
            <Typography textAlign="right" variant="h4" color="success.main">
              {_.sumBy(exams?.data?.scores, "totalScore") ?? 0}
            </Typography>

            <Typography>Results Entry</Typography>
            <Stack spacing={2} py={4}>
              <LinearProgress
                variant="determinate"
                value={exams?.data?.entry?.percent}
                sx={{ bgcolor: "lightgray" }}
                color={
                  exams?.data?.entry?.percent === 100 ? "success" : "secondary"
                }
              />
              <Typography textAlign="center" fontSize={11}>
                {exams?.data?.entry?.completed}/{exams?.data?.entry?.total}{" "}
                completed
              </Typography>

              <Button
                variant="contained"
                startIcon={<NoteAltRounded />}
                onClick={handleOpenReport}
              >
                View Report
              </Button>
            </Stack>

            <TabContext value={tab} >
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
                <ExamsScoreList details={exams.data} options={levelOptions} />
              </TabPanel>
              <TabPanel value="2" sx={{ px: 0 }}>
                <ExamsScoreInput setTab={setTab} options={levelOptions?.data} />
              </TabPanel>
            </TabContext>
          </Box>
        )}
      </>

      <ExamsReport student={exams.data} />
    </>
  );
}

export default ExamsScore;
