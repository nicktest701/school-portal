import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  LinearProgress,
  Stack,
  Tab,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import React, { useContext, useState } from 'react';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import ExamsReport from './ExamsReport';
import ExamsScoreInput from './ExamsScoreInput';
import ExamsScoreList from './ExamsScoreList';
import {
  NoteAltRounded,
  ScoreboardRounded,
  TaskRounded,
} from '@mui/icons-material';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getExams } from '../../api/ExaminationAPI';
import { getSubjectsForLevel } from '../../api/levelAPI';

function ExamsScore() {
  const { schoolSessionState, schoolSessionDispatch } =
    useContext(SchoolSessionContext);
  const openExamsScore = schoolSessionState.examsScore;
  const [searchParams] = useSearchParams();
  const { levelId } = useParams();

  //tab
  const [tab, setTab] = useState('1');

  const exams = useQuery({
    queryKey: ['exams-by-id', searchParams.get('exams_id')],
    queryFn: () => getExams(searchParams.get('exams_id')),
    enabled: !!searchParams.get('exams_id'),
  });

  const levelOptions = useQuery({
    queryKey: ['subjects', levelId],
    queryFn: () => getSubjectsForLevel(levelId),
    enabled: !!levelId,
    select: ({ subjects, grades }) => {
      return {
        subjects,
        grades,
      };
    },
  });

  //CLOSE FORM
  const handleClose = () =>
    schoolSessionDispatch({
      type: 'openAddExamsScore',
      payload: {
        open: false,
        data: {},
      },
    });

  //OPEN Report
  const handleOpenReport = () => {
    schoolSessionDispatch({
      type: 'openViewReport',
    });
  };

  return (
    <>
      <Dialog
        open={openExamsScore.open}
        onClose={handleClose}
        fullWidth
        maxWidth='md'
      >
        <CustomDialogTitle
          title='Student Assessment'
          subtitle='View and manipulate results of student'
          onClose={handleClose}
        />

        {exams.isLoading ? (
          <Stack justifyContent='center' alignItems='center'>
            <CircularProgress />
          </Stack>
        ) : exams?.isError ? (
          <Stack justifyContent='center' alignItems='center'>
            <Typography>An error has occurred!</Typography>
          </Stack>
        ) : (
          <DialogContent>
            <Typography variant='h4'>{exams?.data?.fullName}</Typography>
            <Typography textAlign='right' variant='h5'>
              Overall Score - {_.sumBy(exams?.data?.scores, 'totalScore') ?? 0}
            </Typography>

            <Stack spacing={2} py={1}>
              <Typography>Results Entry</Typography>
              <LinearProgress
                variant='determinate'
                value={exams?.data?.entry?.percent}
                // sx={{ width: 100 }}
                color='secondary'
              />
              <Typography textAlign='center' fontSize={11}>
                {exams?.data?.entry?.completed}/{exams?.data?.entry?.total}{' '}
                completed
              </Typography>
            </Stack>
            <DialogActions>
              <Button
                variant='contained'
                // disabled={_.isEmpty(examsDetails.data) ? true : false}
                startIcon={<NoteAltRounded />}
                onClick={handleOpenReport}
              >
                View Report
              </Button>
            </DialogActions>
            <TabContext value={tab}>
              <TabList onChange={(e, value) => setTab(value)}>
                <Tab
                  label='Exams Score'
                  value='1'
                  icon={<ScoreboardRounded />}
                  iconPosition='start'
                />
                <Tab
                  label='New Exams Score'
                  value='2'
                  icon={<TaskRounded />}
                  iconPosition='start'
                />
              </TabList>
              <TabPanel value='1'>
                <ExamsScoreList details={exams.data} options={levelOptions} />
              </TabPanel>
              <TabPanel value='2'>
                <ExamsScoreInput setTab={setTab} options={levelOptions?.data} />
              </TabPanel>
            </TabContext>
          </DialogContent>
        )}
      </Dialog>

      <ExamsReport student={exams.data} />
    </>
  );
}

export default ExamsScore;
