import React, { useContext, useState } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import student_icon from '../../assets/images/header/student_ico.svg';
import Back from '../../components/Back';
import { Button, Container, Typography } from '@mui/material';
import CustomTitle from '../../components/custom/CustomTitle';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import { STUDENT_RESULT_COLUMNS } from '../../mockup/columns/studentColumns';
import { useQuery } from '@tanstack/react-query';
import { getSubjectScore } from '../../api/ExaminationAPI';
import useLevelById from '../../components/hooks/useLevelById';
import { BookSharp } from '@mui/icons-material';
import LevelExamScoreInput from '../examination/LevelExamScoreInput';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import AddCourseResults from './AddCourseResults';

function AssignedCoursesResults() {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const { state } = useLocation();

  const [openImportResults, setOpenImportResults] = useState(false);
  const { gradeSystem } = useLevelById(state?.id);

  const scores = useQuery({
    queryKey: ['subject-score', state?.id, state?.subject],
    queryFn: () => getSubjectScore({ id: state?.id, subject: state?.subject }),
    enabled: !!state?.id && !!state?.subject,
  });

  // console.log(scores?.data)

  const handleOpenImportResult = () => {
    setOpenImportResults(true);
  };

  const handleOpenAddResults = (rowData) => {
    console.log(rowData);
    schoolSessionDispatch({
      type: 'addStudentResults',
      payload: {
        open: true,
        data: {
          _id: rowData?._id,
          indexnumber: rowData?.indexnumber,
          levelId: state?.id,
          ...rowData?.course,
        },
        grade: gradeSystem,
      },
    });
  };

  if (!state?.id || !state?.subject) {
    return <Navigate to='/course/assign' />;
  }

  const columns = [
    ...STUDENT_RESULT_COLUMNS,
    {
      field: null,
      title: 'Action',
      render: (rowData) => (
        <Button
          variant='outlined'
          onClick={() => handleOpenAddResults(rowData)}
        >
          Add Results
        </Button>
      ),
    },
  ];

  return (
    <>
     
      <Back to='/course/assign' color='primary.main' />

      <Container
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          paddingY: 4,
        }}
      >
        <CustomTitle
          title='Current Level '
          subtitle='  Track,manage and control academic and class activities'
          icon={<SchoolIcon color='inherit' sx={{ width: 50, height: 50 }} />}
          color='primary.main'
        />
        <Typography
          sx={{ display: { xs: 'none', md: 'inline-flex' } }}
          variant='h5'
          paragraph
          whiteSpace='nowrap'
        >
          {state?.type}
        </Typography>
      </Container>

      {/* <Divider /> */}

      <Container>
        <CustomizedMaterialTable
          search={true}
          isLoading={scores.isLoading}
          title={state?.type}
          subtitle={state?.subject}
          exportFileName={`${state?.type}-${state?.subject}` || ''}
          columns={columns}
          data={scores.data}
          actions={[
            {
              icon: () => <BookSharp color='warning' />,
              position: 'toolbar',
              tooltip: 'Import Results',
              onClick: handleOpenImportResult,
              isFreeAction: true,
            },
          ]}
          icon={student_icon}
          handleRefresh={scores?.refetch}
        />
      </Container>

      <LevelExamScoreInput
        open={openImportResults}
        setOpen={setOpenImportResults}
        grades={gradeSystem}
        defaultSubject={state?.subject}
        classLevelId={state?.id}
      />

      <AddCourseResults />
    </>
  );
}

export default AssignedCoursesResults;
