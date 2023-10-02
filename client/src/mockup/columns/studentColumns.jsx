import { CircleRounded } from '@mui/icons-material';
import {
  Avatar,
  Button,
  FormControlLabel,
  ListItemText,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import _ from 'lodash';

export const STUDENTS_COLUMN = [
  {
    field: '_id',
    title: 'ID',
    hidden: true,
  },
  {
    field: 'fullName',
    title: 'FullName',
    searchable: true,
    customFilterAndSearch: (data, rowData) => {
      return (
        rowData.fullName.toLowerCase().lastIndexOf(data.toLowerCase()) > -1
      );
    },
    hidden: true,
    export: true,
  },

  {
    title: 'Profile',
    field: 'profile',
    export: false,
    width: 400,
    searchable: true,
    render: (rowData) => (
      <Stack
        direction='row'
        columnGap={1}
        justifyContent='center'
        alignItems='center'
      >
        <Avatar
          src={
            rowData.profile === undefined || rowData.profile === ''
              ? null
              // : `${import.meta.env.VITE_BASE_URL}/images/students/${
              //     rowData.profile
              //   }`
                :rowData?.profile
          }
        />
        <ListItemText
          primary={
            <Typography
              variant='body2'
              sx={{
                whiteSpace: 'nowrap',
                fontWeight: 'bold',
              }}
            >
              {rowData.fullName}
            </Typography>
          }
          secondary={
            <Typography variant='caption'>{`${_.startCase(rowData.gender)} ,${
              new Date().getFullYear() -
              new Date(rowData.dateofbirth).getUTCFullYear()
            }yrs`}</Typography>
          }
        />
      </Stack>
    ),
  },

  {
    field: 'active',
    title: 'Status',
    export: false,
    render: ({ active }) => (
      <Button
        sx={{ bgcolor: active ? 'success.lighter' : 'error.lighter' }}
        startIcon={
          <CircleRounded
            sx={{ color: active ? 'green' : 'red', width: 10, height: 10 }}
          />
        }
      >
        {active ? 'Active' : 'Disabled'}
      </Button>
    ),
  },
  {
    field: 'levelName',
    title: 'Level',
    export: true,
    hidden: true,
    render: ({ levelName }) => (
      <Typography
        variant='caption'
        bgcolor='primary.main'
        color='#fff'
        padding={1}
      >
        {levelName}
      </Typography>
    ),
  },
  {
    field: 'dateofbirth',
    title: 'Date Of Birth',
    hidden: true,
    export: true,
  },
  {
    field: 'gender',
    title: 'Gender',
    hidden: true,
    export: true,
  },
  {
    field: null,
    title: 'Contact Info',
    render: (rowData) => (
      <ListItemText
        primary={<Typography variant='body2'>{rowData.email}</Typography>}
        secondary={
          <Typography variant='caption' color='primary' fontWeight='bold'>
            {rowData.phonenumber}
          </Typography>
        }
      />
    ),
  },
  {
    field: 'email',
    title: 'Email',
    export: true,
    hidden: true,
  },
  {
    field: 'phonenumber',
    title: 'Telephone No.',
    export: true,
    hidden: true,
  },
  {
    field: 'address',
    title: 'Address',
    export: true,
    hidden: true,
  },
  {
    field: 'residence',
    title: 'Residence',
  },
  {
    field: 'nationality',
    title: 'Nationality',
  },
  {
    field: 'levelId',
    hidden: true,
  },
];

export const STUDENTS_ATTENDANCE_COLUMNS = [
  {
    field: '_id',
    title: 'ID',
    hidden: true,
  },
  {
    field: 'profile',
    title: 'Avatar',
    export: false,
    render: (rowData) => (
      <Avatar
        src={
          rowData.profile === undefined || rowData.profile === ''
            ? null
            :rowData?.profile
            // : `${import.meta.env.VITE_BASE_URL}/images/students/${
            //     rowData.profile
            //   }`
        }
      />
    ),
  },

  {
    field: 'fullName',
    title: 'FullName',
    export: true,
  },
  {
    field: 'status',
    title: 'Status',
    render: () => {
      return (
        <RadioGroup
          row
          aria-labelledby='demo-row-radio-buttons-group-label'
          name='row-radio-buttons-group'
        >
          <FormControlLabel
            value='present'
            control={<Radio size='small' />}
            label='Present'
          />
          <FormControlLabel
            value='absent'
            control={<Radio size='small' />}
            label='Absent'
          />
        </RadioGroup>
      );
    },
    export: true,
  },
];
export const STUDENTS_EXAMS_COLUMN = [
  {
    field: '_id',
    title: 'ID',
    hidden: true,
    // render: (rowData) => {
    //   console.log(rowData);
    // },
  },
  {
    field: 'profile',
    title: 'Avatar',
    export: false,
    render: (rowData) => (
      <Stack
        direction='row'
        columnGap={1}
        justifyContent='center'
        alignItems='center'
      >
        <Avatar
          src={
            rowData.profile === undefined || rowData.profile === ''
              ? null
              :rowData?.profile
              // : `${import.meta.env.VITE_BASE_URL}/images/students/${
              //     rowData.profile
              //   }`
          }
        />
        <ListItemText
          primary={
            <Typography
              variant='body2'
              sx={{
                whiteSpace: 'nowrap',
                fontWeight: 'bold',
              }}
            >
              {rowData.fullName}
            </Typography>
          }
          secondary={
            <Typography variant='caption'>{`${_.startCase(rowData.gender)} ,${
              new Date().getFullYear() -
              new Date(rowData.dateofbirth).getUTCFullYear()
            }yrs`}</Typography>
          }
        />
      </Stack>
    ),
    searchable: true,
    customFilterAndSearch: (data, rowData) => {
      return (
        rowData.fullName.toLowerCase().lastIndexOf(data.toLowerCase()) > -1
      );
    },
  },

  {
    field: 'levelId',
    hidden: true,
  },
  {
    field: 'levelName',
    title: 'Level',
    // hidden: true,
    export: true,
  },
];

export const studentExamsReportColumns = [
  {
    name: 'subject',
    title: 'Subject',
  },
  {
    name: 'classScore',
    title: 'Class Score',
  },
  {
    name: 'examsScore',
    title: 'Exams Score',
  },
  {
    name: 'totalScore',
    title: 'Total Score',
  },
  {
    name: 'grade',
    title: 'Grade',
  },
  {
    name: 'remarks',
    title: 'Remarks',
    render: () => {
      return <Button>Hello</Button>;
    },
  },
];

export const studentFeesReportColumns = [
  {
    name: 'id',
    title: 'ID',
    options: {
      display: false,
    },
  },

  {
    name: 'studentId',
    options: {
      display: false,
    },
  },
  {
    name: 'schoolSessionId',
    options: {
      display: false,
    },
  },
  {
    name: 'date',
    title: 'Date Of Issue',
  },
  {
    name: 'amountPaid',
    title: 'Amount Paid',
  },
  {
    name: 'amountOutstanding',
    title: 'Outstanding Amount',
  },
  {
    name: 'issuer',
    title: 'Issuer',
  },
];
