import React, { useContext, useState } from 'react';
import {
  AccountBoxRounded,
  DeleteForeverRounded,
  EditRounded,
  Person, 
  PersonRounded,
  PhoneRounded,
} from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
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
const StudentProfile = ({ student }) => {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const { studentDispatch } = useContext(StudentContext);
  const { palette } = useTheme();
  const queryClient = useQueryClient();
  const [openViewParent, setOpenViewParent] = useState(false);


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
      confirmButtonColor: palette.primary.main,
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
            View Parent Info
          </Button>
        </Stack>

        <ChipItem divider={true} label='Basic Info' icon={<PersonRounded />} />
        <Stack paddingY={2}>
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
          <ProfileItem label='Current Level' text={`${student?.levelName} `} />
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
    </>
  );
};
StudentProfile.propTypes = {
  student: PropTypes.object,
};

export default StudentProfile;
