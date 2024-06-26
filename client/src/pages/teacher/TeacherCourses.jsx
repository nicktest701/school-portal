import React, { useContext } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../../context/providers/UserProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCourse, getCourseByTeacher } from "../../api/courseAPI";
import {
  List,
  ListItem,
  Typography,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListSubheader,
  Divider,
  Tooltip,
  Button,
} from "@mui/material";
import { DeleteRounded, RefreshRounded } from "@mui/icons-material";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import { useParams } from "react-router-dom";

function TeacherCourses() {
  const queryClient = useQueryClient();
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const { id } = useParams();
  const {
    userState: { session },
  } = useContext(UserContext);

  const courses = useQuery({
    queryKey: ["courses", id],
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
      title: "Remove",
      text: "Do you want to revoke course from teacher?",
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        mutateAsync(_id, {
          onSettled: () => {
            queryClient.invalidateQueries(["courses", id]);
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
    <List
      subheader={
        <ListSubheader
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          <ListItemText
            primary="Assign Courses"
            secondary="List of assigned courses"
            primaryTypographyProps={{
              fontSize: 18,
              color: "var(--secondary)",
            }}
            sx={{
              py: 2,
            }}
          />
          <Tooltip title="Refresh Courses">
            <IconButton onClick={courses.refetch}>
              <RefreshRounded />
            </IconButton>
          </Tooltip>
          <Divider />
        </ListSubheader>
      }
      sx={{
        pt: 4,
      }}
    >
      {courses?.data?.length > 0 ? (
        courses?.data?.map((course) => (
          <ListItem key={course?._id} divider>
            <ListItemText primary={course?.level} />
            <ListItemText primary={course?.subject} />

            <ListItemSecondaryAction>
              <Button
                title="Remove Course"
                color="error"
                size="small"
                endIcon={<DeleteRounded />}
                onClick={() => removeCourse(course?._id)}
              >   Remove</Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))
      ) : (
        <Typography textAlign="center">No Course Available</Typography>
      )}
    </List>
  );
}

export default TeacherCourses;
