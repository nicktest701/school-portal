import React from "react";
import _ from "lodash";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { STUDENTS_COLUMN } from "@/mockup/columns/studentColumns";
import CustomizedMaterialTable from "@/components/tables/CustomizedMaterialTable";
import FileDialog from "@/components/modals/FileDialog";
import useLevelById from "@/components/hooks/useLevelById";
import student_icon from "@/assets/images/header/student_ico.svg";
import {
  FemaleRounded,
  MaleRounded,
  Note,
  NoteAltRounded,
} from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";

import { Person, RefreshRounded } from "@mui/icons-material";
import {
  Badge,
  Button,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid2,
  IconButton,
  Typography,
  Stack,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import SubjectPopover from "./SubjectPopOver";
import GradePopover from "./GradePopover";
import RecordSkeleton from "@/components/skeleton/RecordSkeleton";
import AssignTeacher from "./AssignTeacher";

const CurrentLevelTab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  //Get Students in Current Level id
  const {
    levelName,
    students,
    gradeSystem,
    subjects,
    rollNumber,
    levelLoading,
    teacher,
    refetch,
  } = useLevelById(id);

  const handleOpenAttendance = () => {
    navigate(`/level/${id}/attendance`);
  };
  const handleOpenAddSubject = () => {
    navigate(`/level/${id}/courses`);
  };

  const handleViewStudent = (_id) => {
    navigate(`/student/view/${_id}?_l=${id}`);
  };

  const handleOpenAssignTeacher = () => {
    setSearchParams((params) => {
      params.set("_at", true);
      return params;
    });
  };

  const groupedStudents = _.groupBy(students, "gender");

  if (levelLoading) {
    return <RecordSkeleton />;
  }

  return (
    <Box>
      {/* Dashboard hero  */}
      <Card sx={{ margin: "auto", padding: 2 }}>
        <CardContent>
          {/* Header */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Box display="flex" alignItems="center" gap={2} flex={1}>
              {/* Circular Progress with Text */}
              <Box>
                <Box
                  sx={{
                    position: "relative",
                    display: "inline-flex",
                  }}
                >
                  {/* Non-completed part */}
                  <CircularProgress
                    variant="determinate"
                    value={100} // Always render the full circle as light gray
                    size={90}
                    thickness={3}
                    sx={{
                      color: "lightgray",
                    }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={0}
                    size={90}
                    thickness={3}
                    sx={{
                      // color: gradeColor(exams.data?.scorePercentage).bg,

                      position: "absolute", // Stack it on top of the gray progress
                      left: 0,
                      // bgcolor:'lightgray'
                    }} // Optional styling for 100%
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      color="text.primary"
                    >
                      {rollNumber}
                    </Typography>
                  </Box>
                </Box>
                <Typography textAlign="center">Students </Typography>
              </Box>
              <Box>
                <Typography variant="h3">
                  {levelName}
                  <Badge
                    color="success"
                    variant="dot"
                    overlap="circular"
                    sx={{ marginLeft: 1 }}
                  >
                    <Person color="success" />
                  </Badge>
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textTransform="uppercase"
                >
                  9052900 | LEVEL CODE
                </Typography>
              </Box>
            </Box>
            <IconButton sx={{ justifySelf: "flex-end" }} onClick={refetch}>
              <RefreshRounded
                sx={{
                  width: { xs: 24, md: 40 },
                  height: { xs: 24, md: 40 },
                }}
              />
            </IconButton>
          </Box>

          {/* Progress Section */}
          <Box mt={2}>
            <Typography variant="body2" color="text.primary">
              View essential information about the class, including enrolled
              students, subjects, and schedules.
            </Typography>
            <Typography variant="body2" color="text.primary">
              Stay organized with structured class management tools.
            </Typography>
            {teacher?._id && (
              <Link
                to={`/teacher/${teacher?._id}`}
                style={{
                  color: "var(--primary)",
                  textDecoration: "none",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  spacing={2}
                  p={1}
                  width="fit-content"
                  ml="auto"
                  sx={{
                    alignSelf: "end",
                    "&:hover": {
                      bgcolor: "rgba(0,0,0,0.05)",
                      cursor: "pointer",
                      borderRadius: "12px",
                    },
                  }}
                >
                  <Avatar srcSet={teacher?.profile} />
                  <Typography>{teacher?.fullName}</Typography>
                </Stack>
              </Link>
            )}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Statistics Section */}
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 4, md: 2.3 }}>
              <Box textAlign="center">
                <GroupIcon color="info" />
                <Typography variant="h6" color="info.main">
                  {rollNumber}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Students
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 4, md: 2.3 }}>
              <Box textAlign="center">
                <MaleRounded color="success" />
                <Typography variant="h6" color="success">
                  {groupedStudents?.male?.length ?? 0}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Males
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 4, md: 2.3 }}>
              <Box textAlign="center">
                <FemaleRounded color="error" />
                <Typography variant="h6" color="error">
                  {groupedStudents?.female?.length ?? 0}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Females
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 4, md: 2.3 }}>
              <Box textAlign="center">
                <Note color="error" />
                <Typography variant="h6" color="error">
                  {subjects?.length ?? 0}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Subjects <SubjectPopover subjects={subjects} />
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 4, md: 2.3 }}>
              <Box textAlign="center">
                <FemaleRounded color="error" />
                <Typography variant="body2" color="error">
                  {gradeSystem?.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Grade System <GradePopover grades={gradeSystem?.ratings} />
                </Typography>
              </Box>
            </Grid2>
          </Grid2>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<NoteAltRounded />}
              onClick={handleOpenAttendance}
            >
              {matches && "Mark Attendance"}
            </Button>
            <Button
              variant="contained"
              startIcon={<NoteAltRounded />}
              onClick={handleOpenAddSubject}
            >
              {matches && "Add Subjects"}
            </Button>
            {!teacher?._id && (
              <Button
                variant="contained"
                startIcon={<NoteAltRounded />}
                onClick={handleOpenAssignTeacher}
              >
                {matches && "Assign Teacher"}
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      <CustomizedMaterialTable
        search={true}
        isPending={levelLoading}
        title={levelName}
        subtitle={`${rollNumber} Students`}
        exportFileName={levelName || ""}
        columns={STUDENTS_COLUMN}
        data={students}
        actions={[]}
        icon={student_icon}
        onRowClick={({ _id }) => handleViewStudent(_id)}
        style={
          {
            // maxWidth: "90%",
          }
        }
      />

      <FileDialog />
      <AssignTeacher levelName={levelName} />
    </Box>
  );
};

export default CurrentLevelTab;
