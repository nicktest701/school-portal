import React, { Suspense, lazy, useContext, useState } from 'react';
import { Box, Container, Link } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import DoNotDisturbOnTotalSilenceOutlinedIcon from '@mui/icons-material/DoNotDisturbOnTotalSilenceOutlined';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { STUDENTS_EXAMS_COLUMN } from '../../mockup/columns/studentColumns';
import ExamsHomeCard from '../../components/cards/ExamsHomeCard';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import ExamsScore from './ExamsScore';
import { getExamsDetails } from '../../api/ExaminationAPI';
import useLevelById from '../../components/hooks/useLevelById';
import { BookSharp, Note, NoteOutlined, List } from '@mui/icons-material';

import student_icon from '../../assets/images/header/student_ico.svg';
import { EMPTY_IMAGES } from '../../config/images';
import CustomTitle from '../../components/custom/CustomTitle';
import exams_icon from '../../assets/images/header/exams_ico.svg';
import { UserContext } from '../../context/providers/userProvider';
import Loader from '../../config/Loader';

const LevelExamScoreInput = lazy(() => import('./LevelExamScoreInput'));
const ViewReports = lazy(() => import('./ViewReports'));
const ViewRawSheet = lazy(() => import('./ViewRawSheet'));

const ExamsLevel = () => {
  const navigate = useNavigate();
  const {
    userState: { session },
  } = useContext(UserContext);

  const { levelId, level } = useParams();
  const { state } = useLocation();

  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const [ViewReport, setViewReport] = useState(false);
  const [viewRawSheet, setViewRawSheet] = useState(false);
  const [viewLevelScoreInput, setViewLevelScoreInput] = useState(false);

  //GET All Details about exams

  const examDetails = useQuery({
    queryKey: ['exams-details', levelId],
    queryFn: () =>
      getExamsDetails({
        sessionId: session.sessionId,
        termId: session.termId,
        levelId,
      }),
    enabled: !!levelId && !!session.sessionId && !!session.termId,
  });

  // useQuery({
  //   queryKey: ['exams-reports'],
  //   queryFn: () =>
  //     generateReports({
  //       sessionId: session.sessionId,
  //       termId: session.termId,
  //       levelId,
  //     }),
  //   enabled: !!session.sessionId && !!session.termId,
  // });

  //FETCH all students from current level

  const { levelLoading, students, refetch } = useLevelById(levelId);

  const column = [
    ...STUDENTS_EXAMS_COLUMN,

    {
      field: null,
      title: 'Exams Details',
      render: (rowData) => {
        return (
          <Link
            onClick={() => {
              schoolSessionDispatch({
                type: 'openAddExamsScore',
                payload: {
                  open: true,
                  data: {
                    levelId,
                    studentId: rowData._id,
                    sessionId: session.sessionId,
                    termId: session.termId,
                  },
                },
              });
            }}
          >
            View Details
          </Link>
        );
      },
    },
  ];

  const iconStyle = { width: 28, height: 28 };

  //Generate reports for whole level
  const handleGenerateReports = () => {
    setViewReport(true);
    navigate(`/examination/reports/${levelId}`);
  };

  const handleViewRawSheet = () => {
    setViewRawSheet(true);
  };

  const handleViewLevelScoreInput = () => {
    setViewLevelScoreInput(true);
  };

  return (
    <Container
      sx={{
        // bgcolor: 'white',
      }}
    >
      <CustomTitle
        title='Examination Portal'
        subtitle='Track,manage and control academic and class activities'
        img={exams_icon}
        backColor='#012e54'
      />
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
          gap: 2,
          py: 4,
        }}
      >
        <ExamsHomeCard
          title='Total Student'
          value={examDetails.data?.noOfStudents}
          icon={<PersonOutlineOutlinedIcon sx={iconStyle} />}
          color='info'
        />
        <ExamsHomeCard
          title='Highest Marks'
          value={examDetails.data?.highestMarks}
          icon={<BookmarksOutlinedIcon sx={iconStyle} />}
          color='success'
        />
        {/* <ExamsHomeCard
          title='Average Marks'
          value={examDetails.data?.averageMarks}
          icon={<FunctionsOutlinedIcon sx={iconStyle} />}
          color='info'
        /> */}
        <ExamsHomeCard
          title='Lowest Marks'
          value={examDetails.data?.lowestMarks}
          icon={<DoNotDisturbOnTotalSilenceOutlinedIcon sx={iconStyle} />}
          color='warning'
        />
        <ExamsHomeCard
          title='Pass Students'
          value={examDetails.data?.passStudents}
          icon={<CheckCircleOutlinedIcon sx={iconStyle} />}
          color='success'
        />
        <ExamsHomeCard
          title='Failed Students'
          value={examDetails.data?.failStudents}
          icon={<HighlightOffOutlinedIcon sx={iconStyle} />}
          color='error'
        />
      </Box>

      <CustomizedMaterialTable
        title={level ?? 'Students'}
        icon={student_icon}
        isLoading={levelLoading}
        columns={column}
        search={true}
        // data={[]}
        data={students}
        actions={[
          {
            icon: () => <NoteOutlined color='info' />,
            position: 'toolbar',
            tooltip: 'Raw Sheet',
            onClick: handleViewRawSheet,
            isFreeAction: true,
          },
          {
            icon: () => <BookSharp color='warning' />,
            position: 'toolbar',
            tooltip: 'Import Results',
            onClick: handleViewLevelScoreInput,
            isFreeAction: true,
          },
          {
            icon: () => <List color='error' />,
            position: 'toolbar',
            tooltip: 'Reports',
            onClick: handleGenerateReports,
            isFreeAction: true,
          },
        ]}
        handleRefresh={refetch}
        addButtonImg={EMPTY_IMAGES.student}
        addButtonMessage='😑 No Students results available !!!!'
      />
      <ExamsScore />
      <Suspense fallback={<Loader />}>
        <ViewReports open={ViewReport} setOpen={setViewReport} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <LevelExamScoreInput
          open={viewLevelScoreInput}
          setOpen={setViewLevelScoreInput}
        />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <ViewRawSheet
          open={viewRawSheet}
          setOpen={setViewRawSheet}
          students={students}
        />
      </Suspense>
    </Container>
  );
};

export default ExamsLevel;
