import {
  DeleteRounded,
  Edit,
  MessageRounded,
  Person,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import React, { useContext } from "react";
import { TeacherContext } from "../../context/providers/TeacherProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { deleteTeacher, getTeacher } from "../../api/teacherAPI";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";

import TeacherProfile from "./TeacherProfile";
import CustomTitle from "../../components/custom/CustomTitle";
import Back from "../../components/Back";
// import Back from "../../components/Back";

const TeacherView = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const { teacherDispatch } = useContext(TeacherContext);
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const teacher = useQuery({
    queryKey: ["teacher", id],
    queryFn: () => getTeacher(id),
    initialData: queryClient
      .getQueryData(["teachers", id])
      ?.find((teacher) => teacher?._id === id),
    enabled: !!id,
  });

  //EDIT Teacher Info
  const editTeacherInfo = () => {
    navigate(`/teacher/${id}/edit`);
    handleClose();
  };

  //CLOSE view Teacher Info
  const handleClose = () => {
    teacherDispatch({
      type: "viewTeacher",
      payload: {
        open: false,
        data: {},
      },
    });
  };

  //DELETE Teacher Info

  const { mutateAsync } = useMutation({
    mutationFn: deleteTeacher,
  });

  const handleDelete = () => {
    Swal.fire({
      title: "Deleting Teacher",
      text: "Do you want to delete?",
      showCancelButton: true,
      backdrop: false,
    }).then((data) => {
      if (data.isConfirmed) {
        mutateAsync(id, {
          onSuccess: (data) => {
            queryClient.invalidateQueries(["teachers"]);
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
      type: "sendQuickMessage",
      payload: {
        open: true,
        data: {
          email: teacher?.data?.email,
          phonenumber: teacher?.data?.phonenumber,
        },
      },
    });
  };

  //Assign Level
  const goToAssignLevel = () => {
    navigate("level");
  };
  //Assign Course
  const goToAssignCourse = () => {
    navigate("course");
  };

  return (
    <>
      <Container>
        <Back to="/teacher" color="primary.main" />
        <CustomTitle
          title="Teacher Information"
          subtitle="Manage teachers profile and assigned levels and courses"
          color="primary.main"
        />

        <Box
          sx={{
            bgcolor: "#fff",
            py: 4,
            px: 2,
            my: 4,
          }}
        >
          <Typography paragraph variant="h5">
            Profile Details
          </Typography>
          <Stack>
            <Button
              sx={{ alignSelf: "flex-end" }}
              endIcon={<Edit />}
              onClick={editTeacherInfo}
            >
              Edit
            </Button>
          </Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { xs: "center", md: "space-evenly" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <Stack alignItems="center" spacing={1}>
              <Box
                sx={{
                  p: 1,
                  border: "1px solid lightgray",
                  borderRadius: "50%",
                }}
              >
                <Avatar
                  src={`${import.meta.env.VITE_BASE_URL}/images/users/${
                    teacher?.data?.profile
                  }`}
                  sx={{ width: 100, height: 100 }}
                />
              </Box>

              <Typography paragraph variant="h5">
                {teacher?.data?.fullName}
              </Typography>
              <Button startIcon={<MessageRounded />} onClick={openQuickMessage}>
                Send Message
              </Button>
              <ButtonGroup variant="contained">
                <Button
                  color="secondary"
                  endIcon={<Person />}
                  // onClick={() => setOpenTeacherAssignLevel(true)}
                  onClick={goToAssignLevel}
                >
                  Assign Level
                </Button>
                <Button
                  color="primary"
                  endIcon={<Person />}
                  // onClick={openAssignCourse}
                  onClick={goToAssignCourse}
                >
                  Assign Course
                </Button>
              </ButtonGroup>
            </Stack>
            <Stack spacing={2}>
              <TeacherProfile teacher={teacher?.data} />
              <Divider />
              <Button
                color="error"
                variant="contained"
                endIcon={<DeleteRounded />}
                onClick={handleDelete}
              >
                Remove Account
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  );
};

TeacherView.propTypes = {};

export default React.memo(TeacherView);
