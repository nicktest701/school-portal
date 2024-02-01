import {
  BedroomBabyRounded,
  DeleteRounded,
  Edit,
  MessageRounded,
  Person,
  Person2Sharp,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Tab,
  Typography,
  useTheme,
} from '@mui/material';
import { TabContext, TabList,} from '@mui/lab';
import Swal from 'sweetalert2';
import React, { useContext, useState } from 'react';
import { TeacherContext } from '../../context/providers/TeacherProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTeacher } from '../../api/teacherAPI';
import TeacherAssignLevel from './TeacherAssignLevel';

import { unassignTeacherLevel } from '../../api/levelAPI';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';

import TeacherProfile from './TeacherProfile';
import TeacherLevels from './TeacherLevels';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import TeacherCourses from './TeacherCourses';

const TeacherView = () => {
  const queryClient = useQueryClient();
  const { palette } = useTheme();
  const [openTeacherAssignLevel, setOpenTeacherAssignLevel] = useState(false);
  const [tab, setTab] = useState('1');

  const {
    teacherState: { viewTeacherData },
    teacherDispatch,
  } = useContext(TeacherContext);
  const teacher = viewTeacherData?.data;

  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  //EDIT Teacher Info
  const editTeacherInfo = () => {
    teacherDispatch({
      type: 'editTeacher',
      payload: {
        open: true,
        data: teacher,
      },
    });
    handleClose();
  };

  //CLOSE view Teacher Info
  const handleClose = () => {
    teacherDispatch({
      type: 'viewTeacher',
      payload: {
        open: false,
        data: {},
      },
    });
  };

  //CLOSE view Teacher Info
  const openAssignCourse = () => {
    teacherDispatch({
      type: 'assignTeacherCourse',
      payload: {
        open: true,
        data: {
          id: teacher?._id,
        },
      },
    });
  };

  //UNASSIGN Teacher from level
  const { mutateAsync: unassignTeacher, } = useMutation({
    mutationFn: unassignTeacherLevel,
  });
  const handleUnassignTeacher = (id) => {
    Swal.fire({
      title: 'Unassign Teacher',
      text: 'Do you want to unassign teacher from this level?',
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        unassignTeacher(id, {
          onSuccess: (data) => {
            queryClient.invalidateQueries(['levels']);
            schoolSessionDispatch(alertSuccess(data));
          },
          onError: (error) => {
            schoolSessionDispatch(alertError(error));
          },
        });
      }
    });
  };

  //DELETE Teacher Info

  const { mutateAsync } = useMutation({
    mutationFn: deleteTeacher,
  });

  const handleDelete = () => {
    Swal.fire({
      title: 'Deleting Teacher',
      text: 'Do you want to delete?',
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        mutateAsync(teacher?._id, {
          onSuccess: (data) => {
            queryClient.invalidateQueries(['teachers']);
            schoolSessionDispatch(alertSuccess(data));
            handleClose();
          },
          onError: (error) => {
            schoolSessionDispatch(alertError(error));
          },
        });
      }
    });
  };

  //OPEN Quick Message
  //CLOSE
  const openQuickMessage = () => {
    schoolSessionDispatch({
      type: 'sendQuickMessage',
      payload: {
        open: true,
        data: {
          email: teacher?.email,
          phonenumber: teacher?.phonenumber,
        },
      },
    });
  };

  return (
    <>
      <Dialog
        tabIndex={-1}
        open={viewTeacherData.open}
        maxWidth='md'
        // fullScreen
        fullWidth
        onClose={handleClose}
      >
        <CustomDialogTitle
          title='Teacher Information'
          subtitle='Manage teachers profile and assigned levels and courses.'
          onClose={handleClose}
        />
        <DialogContent>
          <Stack direction='row' justifyContent='flex-end'>
            <Button size='small' endIcon={<Edit />} onClick={editTeacherInfo}>
              Edit
            </Button>
            <Button
              color='error'
              size='small'
              endIcon={<DeleteRounded />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Stack>
          <Container
            maxWidth='md'
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'center', md: 'flex-start' },
              gap: { xs: 2, md: 0 },
            }}
          >
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              gap={1}
            >
              <Avatar
                src={`${import.meta.env.VITE_BASE_URL}/images/users/${
                  teacher?.profile
                }`}
                sx={{ width: 70, height: 70 }}
              />

              <Typography paragraph>{teacher?.fullName}</Typography>
              <Button
                size='small'
                startIcon={<MessageRounded />}
                onClick={openQuickMessage}
              >
                Send Message
              </Button>
              <Stack direction='row' pt={2} spacing={1} >
                <Button
                  variant='outlined'
                  color='secondary'
                  size='small'
                  endIcon={<Person />}
                  onClick={() => setOpenTeacherAssignLevel(true)}
                >
                  Assign Level
                </Button>
                <Button
                  variant='outlined'
                  color='info'
                  size='small'
                  endIcon={<Person />}
                  onClick={openAssignCourse}
                >
                  Assign Course
                </Button>
              </Stack>
            </Box>

            <Box sx={{ flex: 0.9 }}>
              <TabContext value={tab}>
                <TabList centered onChange={(e, value) => setTab(value)}>
                  <Tab
                    label='Personal'
                    value='1'
                    icon={<Person2Sharp />}
                    iconPosition='start'
                  />
                  <Tab
                    label='Levels'
                    value='2'
                    icon={<BedroomBabyRounded />}
                    iconPosition='start'
                  />
                  <Tab label='Courses' value='3' />
                </TabList>
                <TeacherProfile teacher={teacher} />
                <TeacherLevels
                  id={teacher?._id}
                  onClick={handleUnassignTeacher}
                />
                <TeacherCourses id={teacher?._id} />
              </TabContext>
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <TeacherAssignLevel
        open={openTeacherAssignLevel}
        setOpen={setOpenTeacherAssignLevel}
        teacher={{ _id: teacher._id, fullName: teacher?.fullName }}
      />
    </>
  );
};

TeacherView.propTypes = {};

export default React.memo(TeacherView);
