import React, { useContext, useState } from 'react';
import {
  AccountBoxRounded,
  DeleteForeverRounded,
  EditRounded,
  MedicalInformationRounded,
  Person,
  PersonRounded,
  PhoneRounded,
  Report,
} from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Swal from 'sweetalert2';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { StudentContext } from '../../../context/providers/StudentProvider';
import StudentEdit from '../../../pages/student/StudentEdit';
import ProfileItem from '../../typo/ProfileItem';
import { disableStudentAccount } from '../../../api/studentAPI';
import ChipItem from '../../list/ChipItem';
import { SchoolSessionContext } from '../../../context/providers/SchoolSessionProvider';
import {
  alertError,
  alertSuccess,
} from '../../../context/actions/globalAlertActions';
import moment from 'moment';
import PropTypes from 'prop-types';
import ViewParent from '../../../pages/student/tab/ViewParent';
import MedicalInformationEdit from '../../../pages/student/MedicalInformationEdit';
import { useParams, useSearchParams } from 'react-router-dom';
import ViewPreviousReport from '../../../pages/student/tab/ViewPreviousReport';
const StudentProfile = ({ student }) => {
  const { type } = useParams();
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const { studentDispatch } = useContext(StudentContext);
  const queryClient = useQueryClient();
  const [openViewParent, setOpenViewParent] = useState(false);
  const [openViewPreviousReport, setOpenViewPreviousReport] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleOpenMedicalHistory = () => {
    setSearchParams({
      open: true,
    });
  };

  //EDIT Student Info
  const openStudentEdit = () => {
    studentDispatch({
      type: 'editStudent',
      payload: {
        open: true,
        data: student,
      },
    });
  };

  const { mutateAsync } = useMutation(disableStudentAccount);
  //DISABLE Student account
  const handleDisableAccount = () => {
    Swal.fire({
      title: `${student?.active ? 'Disable' : 'Enable'} Student Acoount`,
      text: `Do you want to ${student?.active ? 'disable' : 'enable'} account?`,
      showCancelButton: true,
      backdrop: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutateAsync(
          { id: student?._id, active: student?.active ? 'Yes' : 'No' },
          {
            onSettled: () => {
              queryClient.invalidateQueries(['student-by-id']);
            },

            onSuccess: (data) => {
              schoolSessionDispatch(alertSuccess(data));
            },
            onError: (error) => {
              schoolSessionDispatch(alertError(error));
            },
          }
        );
      }
    });
  };

  const openPreviousReport = () => {
    setOpenViewPreviousReport(true);
  };

  return (
    <>
      <Container>
        <Typography variant='h6'>Student Profile</Typography>
        <Stack
          direction='row'
          justifyContent='flex-end'
          alignItems='center'
          columnGap={2}
        >
          <Button startIcon={<EditRounded />} onClick={openStudentEdit}>
            Edit
          </Button>
          <Button
            startIcon={<Person />}
            onClick={() => setOpenViewParent(true)}
          >
            Parent Info
          </Button>
          <Button
            startIcon={<MedicalInformationRounded />}
            onClick={handleOpenMedicalHistory}
          >
            Medical Info
          </Button>
        </Stack>

        <ChipItem divider={true} label='Basic Info' icon={<PersonRounded />} />
        <Stack paddingY={2}>
          <ProfileItem label='ID' text={student?.indexnumber} />
          <ProfileItem label='Name' text={student?.fullName} />
          <ProfileItem
            label='Date of Birth'
            text={moment(new Date(student?.dateofbirth)).format(
              'Do MMMM, YYYY.'
            )}
          />
          <ProfileItem label='Gender' text={student?.gender} />
        </Stack>

        <ChipItem
          divider={true}
          label='Contact Info.'
          icon={<PhoneRounded />}
        />
        <Stack paddingY={2}>
          <ProfileItem label='Email Address' text={student?.email} />
          <ProfileItem label='Telephone Number' text={student?.phonenumber} />
          <ProfileItem label='Address' text={student?.address} />
          <ProfileItem label='Residence' text={student?.residence} />
          <ProfileItem label='Nationality' text={student?.nationality} />
        </Stack>

        <ChipItem
          divider={true}
          label='Academic Info.'
          icon={<EditRounded />}
        />
        <Stack paddingY={2}>
          <ProfileItem
            label='Current Level'
            text={type || `${student?.levelName} `}
          />
          <ProfileItem
            label='Previous School'
            text={`${
              student?.academic?.previousSchool?.name || 'Not Available'
            } `}
          />
          <Button
            startIcon={<Report />}
            onClick={openPreviousReport}
            variant='contained'
            sx={{ alignSelf: 'flex-end' }}
          >
            Previous Report
          </Button>
        </Stack>
        <ChipItem
          divider={true}
          label='Account Info.'
          icon={<AccountBoxRounded />}
        />
        <ProfileItem
          label='Account Status'
          text={student?.active ? 'Active' : 'Disabled'}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingY: 1 }}>
          <Button
            variant='contained'
            color='error'
            endIcon={<DeleteForeverRounded />}
            onClick={handleDisableAccount}
          >
            {student?.active ? 'Disable Account' : 'Enable Account'}
          </Button>
        </Box>
      </Container>
      <StudentEdit />
      <ViewParent open={openViewParent} setOpen={setOpenViewParent} />
      <MedicalInformationEdit
        medical={{ ...student?.medical, id: student?._id }}
      />
      <ViewPreviousReport
        report={student?.academic?.previousSchool?.report}
        open={openViewPreviousReport}
        setOpen={setOpenViewPreviousReport}
      />
    </>
  );
};
StudentProfile.propTypes = {
  student: PropTypes.object,
};

export default StudentProfile;
