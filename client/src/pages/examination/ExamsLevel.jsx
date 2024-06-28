import React, {
  Suspense,
  lazy,
  useCallback,
  useContext,
  useState,
} from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DoNotDisturbOnTotalSilenceOutlinedIcon from "@mui/icons-material/DoNotDisturbOnTotalSilenceOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import CustomizedMaterialTable from "../../components/tables/CustomizedMaterialTable";
import { useQuery } from "@tanstack/react-query";
import * as XLSX from "xlsx";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { STUDENTS_EXAMS_COLUMN } from "../../mockup/columns/studentColumns";
import ExamsHomeCard from "../../components/cards/ExamsHomeCard";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import ExamsScore from "./ExamsScore";
import { getExamsDetails } from "../../api/ExaminationAPI";
import { BookSharp, NoteOutlined, List } from "@mui/icons-material";

import student_icon from "../../assets/images/header/student_ico.svg";
import { EMPTY_IMAGES } from "../../config/images";
import CustomTitle from "../../components/custom/CustomTitle";
import exams_icon from "../../assets/images/header/exams_ico.svg";
import { UserContext } from "../../context/providers/UserProvider";
import Loader from "../../config/Loader";
import Back from "../../components/Back";
import { getSubjectsForLevel } from "../../api/levelAPI";

const LevelExamScoreInput = lazy(() => import("./LevelExamScoreInput"));

const ExamsLevel = ({ type }) => {
  const navigate = useNavigate();
  const {
    userState: { session },
  } = useContext(UserContext);

  const { levelId, level } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const [viewLevelScoreInput, setViewLevelScoreInput] = useState(false);

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
  });

  const levelOptions = useQuery({
    queryKey: ["subjects", levelId],
    queryFn: () => getSubjectsForLevel(levelId),
    enabled: !!levelId,
    select: ({ subjects, grades }) => {
      return {
        subjects,
        grades,
      };
    },
  });

  const handleViewExamsDetails = (rowData) => {
    setSearchParams((params) => {
      params.set("exams_id", rowData?._id);
      params.set("student_id", rowData?.studentId);

      return params;
    });
    schoolSessionDispatch({
      type: "openAddExamsScore",
      payload: {
        open: true,
        data: {
          levelId,
          studentId: rowData.studentId,
          sessionId: session.sessionId,
          termId: session.termId,
        },
      },
    });
  };

  const column = [
    ...STUDENTS_EXAMS_COLUMN,

    {
      field: null,
      title: "Exams Details",
      render: (rowData) => {
        return (
          <Button
            variant="outlined"
            onClick={() => handleViewExamsDetails(rowData)}
          >
            View Details
          </Button>
        );
      },
    },
  ];

  const iconStyle = { width: 28, height: 28 };

  //Generate reports for whole level
  const handleGenerateReports = () => {
    // setViewReport(true);
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
    XLSX.writeFile(workbook, `${level || "Subject"}.xlsx`, {
      compression: true,
    });
  }, [examDetails?.data?.students]);

  const handleViewLevelScoreInput = () => {
    setViewLevelScoreInput(true);
  };

  return (
    <>
      <Back
        to={type === "course" ? "/course/level" : `/examination`}
        color="primary.main"
      />

      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          bgcolor: "#fff",
          my:2
        }}
      >
        <CustomTitle
          title="Examination Portal"
          subtitle="Track,manage and control academic and class activities"
          img={exams_icon}
          backColor="#012e54"
        />
        <Typography
          sx={{ display: { xs: "none", md: "inline-flex" } }}
          variant="h5"
          paragraph
          whiteSpace="nowrap"
        >
          {level}
        </Typography>
      </Container>

      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 2,
          py: 4,
        }}
      >
        <ExamsHomeCard
          title="Total Student"
          value={examDetails.data?.noOfStudents}
          icon={<PersonOutlineOutlinedIcon sx={iconStyle} />}
          color="info"
        />
        <ExamsHomeCard
          title="Highest Marks"
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
          title="Lowest Marks"
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

      <CustomizedMaterialTable
        title={level ?? "Students"}
        icon={student_icon}
        isLoading={examDetails.isLoading}
        columns={column}
        search={true}
        data={examDetails?.data?.students}
        actions={[
          {
            icon: () => <NoteOutlined color="info" />,
            position: "toolbar",
            tooltip: "Download Assessment Sheet",
            onClick: downloadSheet,
            isFreeAction: true,
          },
          {
            icon: () => <BookSharp color="warning" />,
            position: "toolbar",
            tooltip: "Import Results",
            onClick: handleViewLevelScoreInput,
            isFreeAction: true,
          },
          {
            icon: () => <List color="error" />,
            position: "toolbar",
            tooltip: "View Students Report",
            onClick: handleGenerateReports,
            isFreeAction: true,
          },
        ]}
        handleRefresh={examDetails.refetch}
        addButtonImg={EMPTY_IMAGES.student}
        addButtonMessage="😑 No Students results available !!!!"
        // onRowClick={(rowData) => openExamsScore(rowData)}
      />
      <ExamsScore />
      <Suspense fallback={<Loader />}>
        <LevelExamScoreInput
          open={viewLevelScoreInput}
          setOpen={setViewLevelScoreInput}
          grades={levelOptions?.data?.grades}
          defaultSubject=""
        />
      </Suspense>
    </>
  );
};

export default ExamsLevel;
