import { StyleOutlined } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import moment from 'moment';
import React from 'react';
import ReportItem from '../../components/list/ReportItem';
import ExamsItem from '../../components/list/ExamsItem';
import ReportItemUnderline from '../../components/list/ReportItemUnderline';

const Report = ({ student }) => {
  const { palette } = useTheme();

  return (
    <>
      <Divider />
      <Stack
        spacing={1}
        sx={{
          maxWidth: '8.5in',
          minHeight: '11in',
          margin: 'auto',
          padding: '4px',
        }}
      >
        {/* school details */}
        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
          columnGap={2}
        >
          <StyleOutlined sx={{ width: 70, height: 70 }} />
          <Stack justifyContent='center' alignItems='center'>
            <Typography variant='h5'>
              FrebbyTech International School
            </Typography>
            <Typography variant='caption'>Post Office Box KS 134</Typography>
            <Typography variant='caption'>Kumasi</Typography>
          </Stack>
        </Stack>
        <Typography
          sx={{
            textAlign: 'center',
            // textDecoration: "underline",
            borderTop: `solid 2px ${palette.secondary.main}`,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            width: '100%',
            padding: '4px',
          }}
          variant='body2'
        >
          Report Card
        </Typography>

        {/* avatar */}
        <Stack justifyContent='center' alignItems='center'>
          <Avatar
            src={
              student?.profile === '' ||
              student?.profile === undefined ||
              student?.profile === null
                ? null
                : `${import.meta.env.VITE_BASE_NET_LOCAL}/images/students/${
                    student?.profile
                  }`
            }
            sx={{ width: 70, height: 70, alignSelf: 'center' }}
          />
        </Stack>

        {/* name section */}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Stack>
              <ReportItem title='Full Name' text={student?.fullName} />
              <ReportItem title='Class' text={`${student?.level}`} />
              <ReportItem title='No. On Roll' text={student?.rollNumber} />
              <ReportItem title='Grade' text={student?.grade} />
              <ReportItem title='Promoted' text='' />
            </Stack>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <p>Position</p>
            <Typography variant='h5' color='error'>
              {student?.position}
            </Typography>
          </Box>
          <Box>
            <Stack>
              <ReportItem title='Academic Year' text={student?.academicYear} />
              <ReportItem title='Term/Semester' text={student?.term} />
              <ReportItem
                title='Vacation Date'
                text={moment(student?.vacationDate).format('Do MMMM,YYYY')}
              />
              <ReportItem
                title='Reopening Date'
                text={moment(student?.reOpeningDate).format('Do MMMM,YYYY')}
              />
            </Stack>
          </Box>
        </Box>

        {/* results section */}
        <Stack>
          <table
            style={{ textAlign: 'center', borderCollapse: 'collapse' }}
            border='1'
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

        {/* conduct */}
        <Box>
          <Stack rowGap={1}>
            <Stack direction='row' justifyContent='flex-end' columnGap={1}>
              <ReportItem title='Attendance' text='11' />
              <ReportItem title='Out Of' text={student?.totalLevelAttendance} />
            </Stack>
            <Stack>
              <ReportItemUnderline
                title='Conduct & Attitude'
                text={student?.comments?.conduct || 'Hardworking'}
              />
            </Stack>
            <Stack>
              <ReportItemUnderline
                title='Interest'
                text={student?.comments?.interest || 'Hardworking'}
              />
            </Stack>
            <Stack>
              <ReportItemUnderline
                title="Class Teacher's Remarks"
                text={
                  student?.comments?.teachersComments ||
                  'Excellent Performance Keep it up!'
                }
              />
            </Stack>
            <Stack>
              <ReportItemUnderline
                title="Headmaster's Remarks"
                text={
                  student?.comments?.headteachersComments || 'Good job done!'
                }
              />
            </Stack>
          </Stack>
        </Box>
        <Divider />
        <Stack justifyContent='center' alignItems='center'>
          <Typography>Bill</Typography>
          <table width='60%' border='1' style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Item</th>
                <th>GHS</th>
                <th>GHP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ paddingLeft: '5px', fontSize: '13px' }}>
                  Tuition Fee
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td style={{ paddingLeft: '5px', fontSize: '13px' }}>Others</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td style={{ paddingLeft: '5px', fontSize: '13px' }}>
                  Arrears
                </td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>Total</th>
                <th></th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </Stack>
        <Typography
          style={{
            fontSize: '10px',
            fontStyle: 'italic',
          }}
        >
          Powered by FrebbyTech Consults (0543772591)
        </Typography>
      </Stack>
      <Divider />
    </>
  );
};

Report.propTypes = {
  student: PropTypes.object,
};

export default Report;
