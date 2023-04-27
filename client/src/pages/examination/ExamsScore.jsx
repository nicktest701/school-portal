import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Tab,
} from '@mui/material';
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

function ExamsScore() {
  const { schoolSessionState, schoolSessionDispatch } =
    useContext(SchoolSessionContext);
  const openExamsScore = schoolSessionState.examsScore;

  //tab
  const [tab, setTab] = useState('1');

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
        maxWidth='lg'
      >
        <CustomDialogTitle
          title='Student Assessment Information'
          onClose={handleClose}
        />
        <DialogContent>
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
              <ExamsScoreList session={openExamsScore.data} />
            </TabPanel>
            <TabPanel value='2'>
              <ExamsScoreInput setTab={setTab}/>
            </TabPanel>
          </TabContext>
        </DialogContent>
      </Dialog>

      <ExamsReport />
    </>
  );
}

export default ExamsScore;
