import React, { useContext, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  useTheme,
  Typography,
} from '@mui/material';
import ReactToPrint from 'react-to-print';
import Transition from '../../components/animations/Transition';
import PropTypes from 'prop-types';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import { useQuery } from '@tanstack/react-query';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import { getExams } from '../../api/ExaminationAPI';
import ExamsItem from '../../components/list/ExamsItem';


const ViewExamsRecord = () => {
  const { palette } = useTheme();
  const componentRef = useRef();
  const {
    schoolSessionDispatch,
    schoolSessionState: { examsRecord },
  } = useContext(SchoolSessionContext);

  const { data: student } = useQuery({
    queryKey: ['student-exams-records', examsRecord.id],
    queryFn: () => getExams(examsRecord.id),
    enabled: !!examsRecord.id,
  });

  //close dialog
  const handleClose = () => {
    schoolSessionDispatch({
      type: 'openViewExamsRecord',
      payload: { open: false, id: '' },
    });
  };

  // const records = useQuery({
  //   queryKey: ['exams-record'],
  //   queryFn: () =>
  //     generateReports({
  //       sessionId: session.sessionId,
  //       termId: session.termId,
  //     }),
  //   enabled: !!examsRecord.id,
  // });

  return (
    <>
      <Dialog
        open={examsRecord.open}
        onClose={handleClose}
        maxWidth='md'
        fullWidth
        TransitionComponent={Transition}
      >
        <CustomDialogTitle title='Exams Details' onClose={handleClose} />
        <DialogActions>
          <ReactToPrint
            // pageStyle={
            //   'width:8.5in";min-height:11in"; margin:auto",padding:4px;'
            // }
            trigger={() => <Button variant='contained'>Print Report</Button>}
            content={() => componentRef.current}
            documentTitle={'Report'}
          />
        </DialogActions>
        <DialogContent>
          <Stack direction='row' spacing={2}>
            <Typography variant='h5'>
              {student?.level}-{student?.term}
            </Typography>
          </Stack>
          <Stack>
            <table
              style={{ textAlign: 'center', borderCollapse: 'collapse' }}
              // border='1'
            >
              <thead>
                <tr>
                  <th>Subject</th>
                  <th> Class Score (50%)</th>
                  <th> Exams Score (50%)</th>
                  <th>Total Score (100%)</th>
                  {/* <th>Position</th> */}
                  <th>Grade</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {student?.scores !== undefined ? (
                  student?.scores.length !== 0 &&
                  student?.scores.map((item) => (
                    <ExamsItem key={item.subject} item={item} />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan='7'
                      style={{ padding: '3px 1px', fontSize: '20px' }}
                    >
                      No Student Record Available
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot
                style={{
                  textAlign: 'center',
                  textDecoration: 'underline',
                  borderTop: `solid 5px ${palette.secondary.main}`,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  width: '100%',
                  padding: 1,
                }}
              >
                <tr>
                  <th>Overall Score</th>
                  <th></th>
                  <th></th>
                  <th>{student?.overallScore}</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </Stack>
        </DialogContent>
      </Dialog>
      <div className='print-container' ref={componentRef}>
        <Report student={student} />
      </div>
    </>
  );
};
ViewExamsRecord.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default React.memo(ViewExamsRecord);
