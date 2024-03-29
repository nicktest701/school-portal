import { LoadingButton } from '@mui/lab';
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  DialogActions,
  DialogContent,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import moment from 'moment';
import React, { useContext, useMemo, useState } from 'react';

import CustomDatePicker from '../../components/inputs/CustomDatePicker';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getAttendance,
  postAttendance,
  postStudentAttendance,
} from '../../api/attendanceAPI';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import student_icon from '../../assets/images/header/student_ico.svg';
import { SaveAsRounded } from '@mui/icons-material';
import SaveAltRounded from '@mui/icons-material/SaveAltRounded';
import Back from '../../components/Back';

function NewAttendance({ to }) {
  const { id, type } = useParams();
  const queryClient = useQueryClient();
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const [date, setDate] = useState(moment());
  const [allstudents, setAllStudents] = useState([]);

  //GET attendance by level id and date
  const attendance = useQuery({
    queryKey: ['attendance', id, date],
    queryFn: () => getAttendance(id, date.format('L')),
    enabled: !!id && !!date,
    onSuccess: (attendance) => {
      setAllStudents(attendance?.status);
    },
  });

  const completed = useMemo(() => {
    const markedStudents = _.filter(allstudents, ({ status }) =>
      ['Present', 'Absent'].includes(status)
    )?.length;
    const percent = parseInt(
      Number(markedStudents / allstudents?.length) * 100
    );

    return {
      done: markedStudents,
      percent,
    };
  }, [allstudents]);

  const handleCheckAttendance = (value, rowData) => {
    rowData.status = value;

    const updatedStudents = _.values(
      _.merge(_.keyBy([...allstudents, rowData], '_id'))
    );
    setAllStudents(updatedStudents);
  };

  ///POST new Attendance
  const { mutateAsync: postAttendanceAsync, isLoading: isPostingAttendance } =
    useMutation({
      mutationFn: postAttendance,
    });

  const handleSaveAttendance = () => {
    const newAttendance = {
      level: id,
      date: date.format('L'),
      status: allstudents,
    };

    postAttendanceAsync(newAttendance, {
      onSettled: () => {
        queryClient.invalidateQueries(['attendance-history']);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  ///POST new Attendance
  const { mutateAsync: postStudentAttendanceAsync, isLoading } = useMutation({
    mutationFn: postStudentAttendance,
  });

  const handleSaveStudentAttendance = (data) => {
    const newAttendance = {
      level: id,
      date: date.format('L'),
      status: data,
    };

    postStudentAttendanceAsync(newAttendance, {
      onSettled: () => {
        queryClient.invalidateQueries(['attendance-history']);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  return (
    <Container maxWidth=''>
      <Back
        to={to === '/course' ? '/course/level' : `${to}/${id}/${type}`}
        color='primary.main'
      />
      <CustomDialogTitle
        title='New Attendance'
        subtitle='Mark new attendance'
        // onClose={handleClose}
      />
      <DialogActions sx={{ padding: 2 }}>
        <LoadingButton
          variant='contained'
          startIcon={<SaveAsRounded />}
          onClick={handleSaveAttendance}
          loading={isPostingAttendance}
        >
          {isPostingAttendance ? 'Saving' : 'Save Attendance'}
        </LoadingButton>
      </DialogActions>
      <DialogContent sx={{ padding: 2 }}>
        <Container>
          <Box display='flex' justifyContent='flex-start' width={280}>
            <CustomDatePicker
              label='Date of Attendance'
              date={date}
              setDate={setDate}
              disableFuture={true}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
            <CircularProgress
              variant='determinate'
              value={completed.percent}
              size={80}
              color='secondary'
            />
            <Typography variant='h5' textAlign='center'>
              {completed.done}/{allstudents?.length}
              <small style={{ marginLeft: '4px' }}>completed</small>
            </Typography>
            {/* <Typography>completed</Typography> */}
          </Box>
          <Divider textAlign='center' sx={{ py: 4 }}>
            <Chip label='Details' color='secondary' />
          </Divider>

          <CustomizedMaterialTable
            search={true}
            isLoading={attendance.isLoading}
            icon={student_icon}
            title={`Attendance for ${type}`}
            exportFileName={`Attendance for ${type} on ${date.format(
              'dddd,Do MMMM YYYY'
            )}`}
            columns={[
              {
                field: '_id',
                title: 'ID',
                hidden: true,
              },
              {
                field: 'fullName',
                title: 'FullName',
                export: true,
              },
              {
                field: 'status',
                title: 'Status',
                render: (rowData) => (
                  <RadioGroup
                    row
                    aria-labelledby='attendance-status'
                    name='status'
                    value={rowData?.status}
                    onChange={(e) =>
                      handleCheckAttendance(e.target.value, rowData)
                    }
                  >
                    <FormControlLabel
                      value='Present'
                      control={<Radio size='small' />}
                      label='Present'
                    />
                    <FormControlLabel
                      value='Absent'
                      control={<Radio size='small' />}
                      label='Absent'
                    />
                  </RadioGroup>
                ),

                export: true,
              },
              {
                field: null,
                title: 'Action',
                render: (rowData) => (
                  <LoadingButton
                    size='small'
                    startIcon={<SaveAltRounded color='secondary' />}
                    onClick={() => handleSaveStudentAttendance(rowData)}
                    loading={isLoading}
                  >
                    Save
                  </LoadingButton>
                ),
              },
            ]}
            data={allstudents}
            actions={[]}
            showRowShadow
            options={{
              pageSize: 10,
              selection: false,
            }}
            handleRefresh={attendance.refetch}
          />
        </Container>
      </DialogContent>
    </Container>
  );
}

NewAttendance.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default NewAttendance;
