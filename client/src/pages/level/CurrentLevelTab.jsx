import React from "react";
import _ from "lodash";
import { useNavigate, useParams } from "react-router-dom";
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
} from "@mui/material";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";
import SubjectPopover from "./SubjectPopOver";
import GradePopover from "./GradePopover";
import RecordSkeleton from "@/components/skeleton/RecordSkeleton";

const CurrentLevelTab = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  //Get Students in Current Level id
  const {
    levelName,
    students,
    gradeSystem,
    subjects,
    rollNumber,
    levelLoading,
    refetch,
  } = useLevelById(id);

  const handleOpenAttendance = () => {
    navigate(`/level/${id}/attendance`);
  };
  const handleOpenAddSubject = () => {
    navigate(`/level/${id}/courses`);
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
                      0
                    </Typography>
                  </Box>
                </Box>
                <Typography>Performance </Typography>
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
                  {0}
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
              Below is the state of school results by distinct academic year and
              semesters.
            </Typography>
            <Typography variant="body2" color="text.primary">
              Only 5 academic year/semester results out of 6 have been approved.
            </Typography>
            {/* <Box mt={2} display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" fontWeight="bold" color="primary">
                Result Entry Progress
              </Typography>
            </Box> */}
            {/* <LinearProgress
              variant="determinate"
              value={0}
              sx={{
                height: 8,
                borderRadius: 1,
                mt: 1,
              }}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                Progress: {0}%
              </Typography>
              <Typography textAlign="center" fontSize={11}>
                {" "}
                completed
              </Typography>
            </Box> */}
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
                <Typography variant="h6" color="error">
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
              Mark Attendance
            </Button>
            <Button
              variant="contained"
              startIcon={<NoteAltRounded />}
              onClick={handleOpenAddSubject}
            >
              Add Subjects
            </Button>
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
        style={
          {
            // maxWidth: "90%",
          }
        }
      />

      <FileDialog />
    </Box>
  );
};

export default CurrentLevelTab;
