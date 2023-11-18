import { TabPanel } from '@mui/lab';
import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { UserContext } from '../../context/providers/UserProvider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteCourse, getCourseByTeacher } from '../../api/courseAPI';
import {
  List,
  ListItem,
  Typography,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { DeleteRounded } from '@mui/icons-material';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';

function TeacherCourses({ id }) {
  const queryClient = useQueryClient();
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const {
    userState: { session },
  } = useContext(UserContext);

  const courses = useQuery({
    queryKey: ['courses', id],
    queryFn: () =>
      getCourseByTeacher({
        teacher: id,
        session: session?.sessionId,
        term: session?.termId,
      }),
  });

  //Delete Course
  const { mutateAsync } = useMutation({
    mutationFn: deleteCourse,
  });
 

  const removeCourse = (_id) => {
    Swal.fire({
      title: 'Remove',
      text: 'Do you want to revoke course from teacher?',
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        mutateAsync(_id, {
          onSettled: () => {
            queryClient.invalidateQueries(['courses', id]);
          },
          onSuccess: (data) => {
            schoolSessionDispatch(alertSuccess(data));
          },
          onError: (error) => {
            schoolSessionDispatch(alertError(error));
          },
        });
      }
    });
  };

  if (courses.isLoading) {
    return <Typography>Loading Courses</Typography>;
  }
  if (courses.isError) {
    return <Typography>An error has occurred!</Typography>;
  }

  return (
    <TabPanel value='3'>
      <List>
        {courses?.data?.length > 0 ? (
          courses?.data?.map((course) => (
            <ListItem key={course?._id} divider>
              <ListItemText primary={course?.level} />
              <ListItemText primary={course?.subject} />

              <ListItemSecondaryAction>
                <IconButton onClick={() => removeCourse(course?._id)}>
                  <DeleteRounded />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        ) : (
          <Typography textAlign='center'>No Course Available</Typography>
        )}
      </List>
    </TabPanel>
  );
}

export default TeacherCourses;
