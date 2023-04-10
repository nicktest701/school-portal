import React, { useContext, useState } from 'react';
import { Box, Container, Link, Stack, Typography } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';
import DoNotDisturbOnTotalSilenceOutlinedIcon from '@mui/icons-material/DoNotDisturbOnTotalSilenceOutlined';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import Back from '../../components/Back';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { STUDENTS_EXAMS_COLUMN } from '../../mockup/columns/studentColumns';
import ExamsHomeCard from '../../components/cards/ExamsHomeCard';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import ExamsScore from './ExamsScore';
import { getExamsDetails, generateReports } from '../../api/ExaminationAPI';
import useLevelById from '../../components/hooks/useLevelById';
import { Note, RefreshTwoTone } from '@mui/icons-material';
import ViewReports from './ViewReports';
import { UserContext } from '../../context/providers/userProvider';
import student_icon from '../../assets/images/header/student_ico.svg';
import { EMPTY_IMAGES } from '../../config/images';
import CustomTitle from '../../components/custom/CustomTitle';
import exams_icon from '../../assets/images/header/exams_ico.svg';

const ExamsLevel = () => {
  const {
    userState: { session },
  } = useContext(UserContext);

  const { levelId } = useParams();

  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const [ViewReport, setViewReport] = useState(false);

  //GET All Details about exams

  const examDetails = useQuery({
    queryKey: ['exams-details'],
    queryFn: () =>
      getExamsDetails({
        sessionId: session.sessionId,
        termId: session.termId,
        levelId,
      }),
  });

  useQuery({
    queryKey: ['exams-reports'],
    queryFn: () =>
      generateReports({
        sessionId: session.sessionId,
        termId: session.termId,
        levelId,
      }),
  });

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
  };

  return (
    <Container>
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
          gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
          gap: 2,
        }}
      >
        <ExamsHomeCard
          title='Total Student'
          value={examDetails.data?.noOfStudents}
          icon={<PersonOutlineOutlinedIcon sx={iconStyle} />}
          color='primary'
        />
        <ExamsHomeCard
          title='Highest Marks'
          value={examDetails.data?.highestMarks}
          icon={<BookmarksOutlinedIcon sx={iconStyle} />}
          color='warning'
        />
        <ExamsHomeCard
          title='Average Marks'
          value={examDetails.data?.averageMarks}
          icon={<FunctionsOutlinedIcon sx={iconStyle} />}
          color='info'
        />
        <ExamsHomeCard
          title='Lowest Marks'
          value={examDetails.data?.lowestMarks}
          icon={<DoNotDisturbOnTotalSilenceOutlinedIcon sx={iconStyle} />}
          color='success'
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
        title='Students'
        icon={student_icon}
        isLoading={levelLoading}
        columns={column}
        // data={[]}
        data={students}
        actions={[
          {
            icon: () => <Note />,
            position: 'toolbar',
            tooltip: 'Generate Results',
            onClick: () => handleGenerateReports(),
            isFreeAction: true,
          },
        ]}
        handleRefresh={refetch}
        addButtonImg={EMPTY_IMAGES.student}
        addButtonMessage='😑 No Students results available !!!!'
      />
      <ExamsScore />
      <ViewReports open={ViewReport} setOpen={setViewReport} />
    </Container>
  );
};

export default ExamsLevel;
