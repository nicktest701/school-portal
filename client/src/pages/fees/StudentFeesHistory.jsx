import React, { useContext, useRef } from 'react';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { StudentContext } from '../../context/providers/StudentProvider';
import { useQuery } from '@tanstack/react-query';
import { getStudentFeeHistory } from '../../api/currentFeeAPI';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import ReactToPrint from 'react-to-print';
import { STUDENT_FEES_HISTORY_COLUMNS } from '../../mockup/columns/sessionColumns';
import PropTypes from 'prop-types';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import { UserContext } from '../../context/providers/UserProvider';
import { PrintRounded } from '@mui/icons-material';
import history_icon from '../../assets/images/header/history_ico.svg';
import FeeReport from './FeeReport';

const StudentFeesHistory = () => {
  const {
    userState: { session },
  } = useContext(UserContext);

  const componentRef = useRef();

  const {
    studentState: {
      viewStudentFeeHistory: { open, data },
    },
    studentDispatch,
  } = useContext(StudentContext);

  const studentFee = useQuery({
    queryKey: ['student-fee-history', data?.id, data?.level],
    queryFn: () =>
      getStudentFeeHistory({
        sessionId: session.sessionId,
        termId: session?.termId,
        studentId: data?.id,
        levelId: data?.level,
        feeId: data?.feeId,
      }),
    enabled: !!data?.id && !!data?.level,
  });

  const handleClose = () => {
    studentDispatch({
      type: 'viewStudentFeeHistory',
      payload: {
        open: false,
        data: {},
      },
    });
  };

  // console.log(studentFee?.data);

  return (
    <Dialog maxWidth='md' fullWidth open={open} onClose={handleClose}>
      <CustomDialogTitle title='Student Fee Payment ' onClose={handleClose} />
      <DialogActions>
        <ReactToPrint
          // pageStyle={'width:8.5in";min-height:11in"; margin:auto",padding:8px;'}
          trigger={() => (
            <Button startIcon={<PrintRounded />} variant='contained'>
              Print Report
            </Button>
          )}
          content={() => componentRef.current}
        />
      </DialogActions>
      <DialogContent>
        {studentFee.isLoading && <Typography>Please Wait.....</Typography>}

        <Stack justifyContent='center' alignItems='center' spacing={2}>
          <Avatar
            srcSet={
              studentFee?.data?.profile === undefined ||
              studentFee?.data?.profile === ''
                ? null
                : studentFee?.data?.profile
              // : `${import.meta.env.VITE_BASE_URL}/images/students/${
              //     studentFee?.data?.profile
              //   }`
            }
            sx={{ width: 70, height: 70 }}
          />
          <Typography variant='h5'>{studentFee?.data?.fullName}</Typography>
          <Typography variant='caption'>
            {studentFee?.data?.levelType}
            {/* {studentFee?.data?.term} */}
          </Typography>

          <Divider />
        </Stack>

        <>
          <CustomizedMaterialTable
            title='Fees History'
            icon={history_icon}
            addButtonImg={history_icon}
            addButtonMessage='No Fees History Found'
            isLoading={studentFee.isLoading}
            exportFileName={studentFee?.data?.fullName}
            columns={STUDENT_FEES_HISTORY_COLUMNS}
            data={studentFee?.data?.payment}
            actions={[]}
            handleRefresh={studentFee.refetch}
            options={{
              paging: false,
              selection: false,
              columnsButton: false,
            }}
            style={{
              border: 'none',
            }}
          />
        </>
      </DialogContent>
      <div ref={componentRef} className='print-container' >
        <FeeReport student={studentFee?.data} />
      </div>
    </Dialog>
  );
};

StudentFeesHistory.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
export default StudentFeesHistory;
