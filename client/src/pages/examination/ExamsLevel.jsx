import React, { useCallback, useContext } from "react";
import * as XLSX from "xlsx";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Card,
  CardContent,
  Badge,
  LinearProgress,
  Grid2,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DoNotDisturbOnTotalSilenceOutlinedIcon from "@mui/icons-material/DoNotDisturbOnTotalSilenceOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import {
  BookSharp,
  NoteOutlined,
  List,
  ChevronRight,
  RefreshRounded,
  Note,
  Book,
} from "@mui/icons-material";
import CustomizedMaterialTable from "@/components/tables/CustomizedMaterialTable";
import { STUDENTS_EXAMS_COLUMN } from "@/mockup/columns/studentColumns";
import ExamsHomeCard from "@/components/cards/ExamsHomeCard";
import { getExamsDetails } from "@/api/ExaminationAPI";
import student_icon from "@/assets/images/header/student_ico.svg";
import { EMPTY_IMAGES } from "@/config/images";
import CustomTitle from "@/components/custom/CustomTitle";
import exams_icon from "@/assets/images/header/exams_ico.svg";
import { UserContext } from "@/context/providers/UserProvider";
import Back from "@/components/Back";
import { gradeColor } from "@/config/gradeColor";
import GradePopover from "../level/GradePopover";
import SubjectPopover from "../level/SubjectPopOver";
import useLevelById from "@/components/hooks/useLevelById";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";
import AssignLevelGrade from "../subject/AssignLevelGrade";

const ExamsLevel = ({ type }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const {
    user,
    userState: { session },
  } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { levelId, level } = useParams();

  //Get Students in Current Level id
  const { gradeSystem, subjects } = useLevelById(levelId);

  //GET All Details about exams

  const examDetails = useQuery({
    queryKey: ["exams-details", levelId],
    queryFn: () =>
      getExamsDetails({
        sessionId: session.sessionId,
        termId: session.termId,
        levelId,
      }),
    enabled: !!levelId && !!session.sessionId && !!session.termId,
    initialData: {
      noOfStudents: 0,
      highestMarks: 0,
      lowestMarks: 0,
      averageMarks: 0,
      passStudents: 0,
      failStudents: 0,
      students: [],
      resultsCompleted: 0,
      scorePercentage: 0,
    },
  });

  const handleViewExamsDetails = (rowData) => {
    navigate(
      `/examination/level/${levelId}/student?eid=${rowData?._id}&sid=${rowData?.studentId}`,
      {
        state: {
          prevPath: `/examination/level/${levelId}/${level}`,
        },
      }
    );
  };

  const column = [
    ...STUDENTS_EXAMS_COLUMN,

    {
      field: null,
      title: "",
      width: "30%",
      render: () => <ChevronRight sx={{ width: 30, height: 30 }} />,
    },
  ];

  const iconStyle = { width: 28, height: 28 };

  const handleImportResults = () => {
    navigate(`/examination/level/${levelId}/${level}/upload`, {
      state: {
        prevPath: `/examination/level/${levelId}/${level}`,
      },
    });
  };

  //Generate reports for whole level
  const handleGenerateReports = () => {
    navigate(`/${type}/reports/${levelId}`);
  };

  const downloadSheet = useCallback(() => {
    const columns = [
      "Index Number",
      "Student",
      "Class  Score",
      "Exams  Score",
      "Total  Score",
    ];
    const modifiedSheet = examDetails?.data?.students?.map((student) => {
      return {
        indexnumber: student?.indexnumber,
        student: student?.fullName,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(modifiedSheet);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, level || "Subject");
    XLSX.utils.sheet_add_aoa(worksheet, [columns], {
      origin: "A1",
    });

    /* calculate column width */
    const max_width = modifiedSheet.reduce(
      (w, r) => Math.max(w, r?.student?.length),
      10
    );
    worksheet["!cols"] = [{ wch: max_width }];
    XLSX.writeFile(workbook, `${level || "Subject"}-Assessment.xlsx`, {
      compression: true,
    });
  }, [examDetails?.data?.students]);

  const handleShowAssignGrade = () => {
    setSearchParams((params) => {
      params.set("assign_grade", true);
      return params;
    });
  };
  return (
    <>
      {user?.role === "administrator" ? (
        <Back to={`/examination`} color="primary.main" />
      ) : (
        <Back to={"/course/level"} color="primary.main" />
      )}

      <Container
        sx={{
          display: "flex",
          flexDirection: { size: "column-reverse", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          bgcolor: "#fff",
          my: 2,
          borderRadius: "12px",
        }}
      >
        <CustomTitle
          title="Examination Portal"
          subtitle="Track,manage and control academic and class activities"
          img={exams_icon}
          backColor="#012e54"
        />
        <Typography
          sx={{ display: { size: "none", md: "inline-flex" } }}
          variant="h5"
          whiteSpace="nowrap"
        >
          {level}
        </Typography>
      </Container>

      <Typography variant="h5" py={2}>
        Exams Summary
      </Typography>
      <Divider />
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
          gap: 2,
          py: 2,
        }}
      >
        <ExamsHomeCard
          title="Students"
          value={examDetails.data?.noOfStudents}
          icon={<PersonOutlineOutlinedIcon sx={iconStyle} />}
          color="info"
        />
        <ExamsHomeCard
          title="Highest Score"
          value={examDetails.data?.highestMarks}
          icon={<BookmarksOutlinedIcon sx={iconStyle} />}
          color="success"
        />
        {/* <ExamsHomeCard
          title='Average Marks'
          value={examDetails.data?.averageMarks}
          icon={<FunctionsOutlinedIcon sx={iconStyle} />}
          color='info'
        /> */}
        <ExamsHomeCard
          title="Lowest Score"
          value={examDetails.data?.lowestMarks}
          icon={<DoNotDisturbOnTotalSilenceOutlinedIcon sx={iconStyle} />}
          color="warning"
        />
        <ExamsHomeCard
          title="Pass Students"
          value={examDetails.data?.passStudents}
          icon={<CheckCircleOutlinedIcon sx={iconStyle} />}
          color="success"
        />
        <ExamsHomeCard
          title="Failed Students"
          value={examDetails.data?.failStudents}
          icon={<HighlightOffOutlinedIcon sx={iconStyle} />}
          color="error"
        />
      </Box>

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
            <Box
              display="flex"
              flexDirection={{
                xs: "column",
                md: "row",
              }}
              alignItems="center"
              gap={2}
              flex={1}
            >
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
                    value={examDetails?.data?.scorePercentage}
                    size={90}
                    thickness={3}
                    sx={{
                      color: gradeColor(examDetails?.data?.scorePercentage).bg,

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
                      {examDetails?.data?.scorePercentage}%
                    </Typography>
                  </Box>
                </Box>
                <Typography>Performance </Typography>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {level ?? "Students"}
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
                  9052900 | ASHANTI REGION
                </Typography>
              </Box>
            </Box>
            <IconButton
              sx={{ justifySelf: "flex-end" }}
              onClick={examDetails.refetch}
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
              value={examDetails?.data?.resultsCompleted}
              color={
                gradeColor(examDetails?.data?.resultsCompleted).bg?.split(
                  "."
                )[0]
              }
              sx={{
                height: 8,
                borderRadius: 1,
                mt: 1,
              }}
            />
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Progress: {examDetails?.data?.resultsCompleted}%
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Statistics Section */}
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 6, md: 2.5 }}>
              <Box textAlign="center">
                <Note color="info" />
                <Typography variant="h6" color="info">
                  {subjects?.length ?? 0}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Subjects <SubjectPopover subjects={subjects} />
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 6, md: 2.5 }}>
              <Box textAlign="center">
                <Book color="success" />
                <Typography variant="h6" color="success">
                  {gradeSystem?.name || "N/A"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Grade System{" "}
                  {gradeSystem?.name ? (
                    <GradePopover grades={gradeSystem?.ratings} />
                  ) : (
                    <button
                      style={{
                        border: "1px solid var(--primary)",
                        backgroundColor: "transparent",
                        padding: "4px",
                        borderRadius: "2px",
                        color: "var(--primary)",
                        fontSize: "12px",
                      }}
                      onClick={handleShowAssignGrade}
                    >
                      Assign Grade
                    </button>
                  )}
                </Typography>
              </Box>
            </Grid2>
          </Grid2>

          
        </CardContent>
      </Card>

      <CustomizedMaterialTable
        title={level ?? "Students"}
        icon={student_icon}
        isPending={examDetails.isPending}
        columns={column}
        search={true}
        data={examDetails?.data?.students}
        autoCompleteComponent={
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <ButtonGroup >
              <Button startIcon={<NoteOutlined />} onClick={downloadSheet}>
                {matches ? " Download Assessment Sheet" : ""}
              </Button>

              <Button startIcon={<BookSharp />} onClick={handleImportResults}>
                {matches ? "Import Results" : ""}
              </Button>

              <Button startIcon={<List />} onClick={handleGenerateReports}>
                {matches ? " View Students Report" : ""}
              </Button>
            </ButtonGroup>
          </Box>
        }
        actions={[]}
        handleRefresh={examDetails.refetch}
        addButtonImg={EMPTY_IMAGES.student}
        addButtonMessage="😑 No Students results available !!!!"
        onRowClick={(rowData) => handleViewExamsDetails(rowData)}
      />
      {examDetails.isPending && <LoadingSpinner value="Please Waiting.." />}

      <AssignLevelGrade />
    </>
  );
};

export default ExamsLevel;

{
  /* Circular Progress with Text */
}
//   <Box>
//   <Box
//     sx={{
//       position: "relative",
//       display: "inline-flex",
//     }}
//   >
//     {/* Non-completed part */}
//     <CircularProgress
//       variant="determinate"
//       value={100} // Always render the full circle as light gray
//       size={90}
//       thickness={3}
//       sx={{
//         color: "lightgray",
//       }}
//     />
//     <CircularProgress
//       variant="determinate"
//       value={examDetails?.data?.resultsCompleted}
//       size={90}
//       thickness={3}
//       sx={{
//         color:
//           examDetails?.data?.resultsCompleted === 100
//             ? "green"
//             : "primary.main",
//         position: "absolute", // Stack it on top of the gray progress
//         left: 0,
//         // bgcolor:'lightgray'
//       }} // Optional styling for 100%
//     />
//     <Box
//       sx={{
//         top: 0,
//         left: 0,
//         bottom: 0,
//         right: 0,
//         position: "absolute",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Typography variant="h6" component="div" color="text.primary">
//         {examDetails?.data?.resultsCompleted}%
//       </Typography>
//     </Box>
//   </Box>
//   <Typography>Results Entry </Typography>
// </Box>
