import {
  BedroomBabyRounded,
  DeleteRounded,
  Edit,
  MessageRounded,
  Person,
  Person2Sharp,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import Swal from "sweetalert2";
import React, { useContext, useState } from "react";
import { TeacherContext } from "../../context/providers/TeacherProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTeacher, getTeacher } from "../../api/teacherAPI";
import TeacherAssignLevel from "./TeacherAssignLevel";

import { unassignTeacherLevel } from "../../api/levelAPI";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";

import TeacherProfile from "./TeacherProfile";
import TeacherLevels from "./TeacherLevels";
import TeacherCourses from "./TeacherCourses";
import { useParams, useNavigate } from "react-router-dom";
import CustomTitle from "../../components/custom/CustomTitle";
import Back from "../../components/Back";
import TeacherAssignCourse from "./TeacherAssignCourse";

const TeacherView = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const [openTeacherAssignLevel, setOpenTeacherAssignLevel] = useState(false);
  const [tab, setTab] = useState("1");

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

  //CLOSE view Teacher Info
  const openAssignCourse = () => {
    teacherDispatch({
      type: "assignTeacherCourse",
      payload: {
        open: true,
        data: {
          id,
        },
      },
    });
  };

  //UNASSIGN Teacher from level
  const { mutateAsync: unassignTeacher } = useMutation({
    mutationFn: unassignTeacherLevel,
  });
  const handleUnassignTeacher = (id) => {
    Swal.fire({
      title: "Unassign Teacher",
      text: "Do you want to unassign teacher from this level?",
      showCancelButton: true,
      backdrop: false,
    }).then((data) => {
      if (data.isConfirmed) {
        unassignTeacher(id, {
          onSuccess: (data) => {
            queryClient.invalidateQueries(["levels"]);
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

  return (
    <>
      <Container sx={{ bgcolor: "#fff", minHeight: "100svh", pt: 2 }}>
        <Back to="/teacher" color="primary.main" />
        <CustomTitle
          title="Teacher Information"
          subtitle="Manage teachers profile and assigned levels and courses"
          color="primary.main"
        />
        <Box>
          <Stack py={2} justifyContent="flex-end" width="100%">
            <ButtonGroup sx={{ alignSelf: "flex-end" }}>
              <Button endIcon={<Edit />} onClick={editTeacherInfo}>
                Edit
              </Button>
              <Button
                color="error"
                endIcon={<DeleteRounded />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </ButtonGroup>
          </Stack>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",

              justifyContent: "center",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap={1}
            >
              <Avatar
                src={`${import.meta.env.VITE_BASE_URL}/images/users/${
                  teacher?.data?.profile
                }`}
                sx={{ width: 70, height: 70 }}
              />

              <Typography paragraph>{teacher?.data?.fullName}</Typography>
              <Button startIcon={<MessageRounded />} onClick={openQuickMessage}>
                Send Message
              </Button>
              <ButtonGroup variant="contained">
                <Button
                  color="secondary"
                  endIcon={<Person />}
                  onClick={() => setOpenTeacherAssignLevel(true)}
                >
                  Assign Level
                </Button>
                <Button
                  color="primary"
                  endIcon={<Person />}
                  onClick={openAssignCourse}
                >
                  Assign Course
                </Button>
              </ButtonGroup>
            </Box>

            <Box sx={{ width: "100%" }}>
              <TabContext value={tab}>
                <TabList
                  centered
                  onChange={(e, value) => setTab(value)}
                  sx={{ pb: 4, bgcolor: "#fff" }}
                  allowScrollButtonsMobile
                >
                  <Tab
                    label="Personal"
                    value="1"
                    icon={<Person2Sharp />}
                    iconPosition="start"
                  />
                  <Tab
                    label="Levels"
                    value="2"
                    icon={<BedroomBabyRounded />}
                    iconPosition="start"
                  />
                  <Tab label="Courses" value="3" />
                </TabList>
                <TeacherProfile teacher={teacher?.data} />
                <TeacherLevels
                  id={teacher?.data?._id}
                  onClick={handleUnassignTeacher}
                />
                <TeacherCourses id={teacher?.data?._id} />
              </TabContext>
            </Box>
          </Container>
        </Box>
      </Container>

      <TeacherAssignCourse />
      <TeacherAssignLevel
        open={openTeacherAssignLevel}
        setOpen={setOpenTeacherAssignLevel}
        teacher={{ _id: teacher._id, fullName: teacher?.data?.fullName }}
      />
    </>
  );
};

TeacherView.propTypes = {};

export default React.memo(TeacherView);
