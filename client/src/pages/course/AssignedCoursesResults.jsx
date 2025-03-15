import React, { useCallback, useContext } from "react";
import * as XLSX from "xlsx";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import student_icon from "@/assets/images/header/student_ico.svg";
import Back from "@/components/Back";
import {
  Button,
  ButtonGroup,
  Typography,
  CircularProgress,
  Card,
  Box,
  CardContent,
  Badge,
  LinearProgress,
  Grid2,
  IconButton,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import GroupIcon from "@mui/icons-material/Group";
import CustomTitle from "@/components/custom/CustomTitle";
import CustomizedMaterialTable from "@/components/tables/CustomizedMaterialTable";
import { STUDENT_RESULT_COLUMNS } from "@/mockup/columns/studentColumns";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { getSubjectScore } from "@/api/ExaminationAPI";
import useLevelById from "@/components/hooks/useLevelById";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import AddStudentRecord from "./AddStudentRecord";
import { gradeColor } from "@/config/gradeColor";
import { RefreshRounded } from "@mui/icons-material";
import RecordSkeleton from "@/components/skeleton/RecordSkeleton";

function AssignedCoursesResults() {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const [searchParams] = useSearchParams();
  const { levelId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const { levelLoading, gradeSystem, subjects, levelName } =
    useLevelById(levelId);

  const subject = subjects?.find((s) => s?._id === searchParams.get("_id"));

  const scores = useQuery({
    queryKey: ["subject-score", levelId, subject?._id],
    queryFn: () =>
      getSubjectScore({
        id: levelId,
        subject: subject?._id,
      }),
    initialData: {
      results: [],
      overallScore: 0,
      topScore: 0,
      lowScore: 0,
      performanceIndex: 0,
      completedResult: 0,
    },
    enabled: !!levelId && !!subject?._id,
  });

  const downloadSheet = useCallback(() => {
    const columns = ["Index Number", "Student", "Class  Score", "Exams  Score"];
    const modifiedSheet = scores?.data?.results?.map((student) => {
      return {
        indexnumber: student?.indexnumber,
        student: student?.student,
        classScore: student?.course?.classScore,
        examsScore: student?.course?.examsScore,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(modifiedSheet);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, searchParams.get("sub"));
    XLSX.utils.sheet_add_aoa(worksheet, [columns], {
      origin: "A1",
    });

    /* calculate column width */
    const max_width = modifiedSheet.reduce(
      (w, r) => Math.max(w, r?.student?.length),
      10
    );
    worksheet["!cols"] = [{ wch: max_width }];
    XLSX.writeFile(
      workbook,
      `${searchParams.get("sub") || "Subject"}-Assessment.xlsx`,
      {
        compression: true,
      }
    );
  }, [scores?.data?.results]);

  const handleImportResults = () => {
    navigate(`/course/assign/${levelId}/upload?_id=${subject?._id}`, {
      state: {
        prevPath: `/course/assign/${levelId}/upload?_id=${subject?._id}`,
      },
    });
  };

  const handleOpenAddResults = (rowData) => {
    schoolSessionDispatch({
      type: "addStudentResults",
      payload: {
        open: true,
        data: {
          _id: rowData?._id,
          indexnumber: rowData?.indexnumber,
          levelId: state?.id,
          course: rowData?.course,
        },
        grade: gradeSystem,
      },
    });
  };

  const columns = [
    ...STUDENT_RESULT_COLUMNS,
    {
      field: null,
      title: "Action",
      render: (rowData) => (
        <Button
          variant="outlined"
          onClick={() => handleOpenAddResults(rowData)}
        >
          Add Record
        </Button>
      ),
    },
  ];

  if (levelLoading) {
    return <RecordSkeleton />;
  }

  if (!levelId || _.isEmpty(subject?._id)) {
    return <Navigate to={"/course/assign"} />;
  }

  return (
    <>
      <Back to="/course/assign" color="primary.main" />

      <CustomTitle
        title="Manage Student Records"
        subtitle="Track,manage and control academic and class activities"
        icon={<SchoolIcon color="inherit" sx={{ width: 50, height: 50 }} />}
        color="primary.main"
        right={
          <Typography variant="h5" paragraph whiteSpace="nowrap">
            {state?.type}
          </Typography>
        }
      />

      {/* Dashboard hero  */}
      <Card sx={{ margin: "auto", padding: 2, mb: 4 }}>
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
                    value={scores?.data?.performanceIndex}
                    size={90}
                    thickness={3}
                    sx={{
                      color: gradeColor(scores?.data?.performanceIndex).bg,

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
                      {scores?.data?.performanceIndex}%
                    </Typography>
                  </Box>
                </Box>
                <Typography>Performance </Typography>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {levelName}
                  <Badge
                    color="success"
                    variant="dot"
                    overlap="circular"
                    sx={{ marginLeft: 1 }}
                  >
                    <CheckCircleIcon color="success" />
                  </Badge>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  | {subject?.name} |
                </Typography>
              </Box>
            </Box>
            <IconButton
              sx={{ justifySelf: "flex-end" }}
              onClick={scores.refetch}
            >
              <RefreshRounded
                sx={{ width: { xs: 24, md: 40 }, height: { xs: 24, md: 40 } }}
              />
            </IconButton>
          </Box>

          {/* Progress Section */}
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              Below is the state of school results by distinct academic year and
              semesters.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Only 5 academic year/semester results out of 6 have been approved.
            </Typography>
            <Box mt={2} display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" fontWeight="bold" color="primary">
                Result Entry Progress
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={0}
              color={
                gradeColor(scores?.data?.completedResult).bg?.split(".")[0]
              }
              sx={{
                height: 8,
                borderRadius: 1,
                mt: 1,
              }}
            />
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Progress: {scores?.data?.completedResult}%
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Statistics Section */}
          <Grid2 container spacing={2}>
            <Grid2 size={4}>
              <Box textAlign="center">
                <GroupIcon color="primary" />
                <Typography variant="h6">
                  {scores?.data?.overallScore}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Overall Score
                </Typography>
              </Box>
            </Grid2>
            <Grid2 item size={4}>
              <Box textAlign="center">
                <AssignmentTurnedInIcon color="success" />
                <Typography variant="h6">{scores?.data?.topScore}%</Typography>
                <Typography variant="caption" color="text.secondary">
                  Best Score
                </Typography>
              </Box>
            </Grid2>
            <Grid2 item size={4}>
              <Box textAlign="center">
                <AssignmentTurnedInIcon color="error" />
                <Typography variant="h6">{scores?.data?.lowScore}%</Typography>
                <Typography variant="caption" color="text.secondary">
                  Least Score
                </Typography>
              </Box>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>

      <CustomizedMaterialTable
        search={true}
        isPending={scores.isPending}
        title={levelName}
        subtitle={subject?.name}
        exportFileName={`${levelName}-${subject?.name}` || ""}
        columns={columns}
        data={scores?.data.results}
        actions={[]}
        icon={student_icon}
        handleRefresh={scores?.refetch}
      
        autoCompleteComponent={
          <ButtonGroup>
            <Button variant="outlined" onClick={downloadSheet}>
              Assessment Sheet
            </Button>
            <Button variant="contained" onClick={handleImportResults}>
              Import Results
            </Button>
          </ButtonGroup>
        }
      />

      <AddStudentRecord />
    </>
  );
}

export default AssignedCoursesResults;
