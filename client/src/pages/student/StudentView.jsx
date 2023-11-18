import React, { useContext, useEffect, useState } from 'react';
import { Container, Stack, Autocomplete, TextField } from '@mui/material';
import {} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { STUDENTS_COLUMN } from '../../mockup/columns/studentColumns';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import useLevel from '../../components/hooks/useLevel';
import student_icon from '../../assets/images/header/student_ico.svg';
import { EMPTY_IMAGES } from '../../config/images';
import CustomTitle from '../../components/custom/CustomTitle';
import { useQuery } from '@tanstack/react-query';
import { getAllStudentsBySession } from '../../api/currentLevelAPI';
import { UserContext } from '../../context/providers/UserProvider';
import _ from 'lodash';

const StudentView = () => {
  const {
    userState: { session },
  } = useContext(UserContext);

  const navigate = useNavigate();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [currentLevel, setCurrentLevel] = useState({ _id: '', type: '' });

  //GET all current academic levels
  const { levelsOption } = useLevel();

  const all = useQuery({
    queryKey: ['all-students', session?.sessionId],
    queryFn: () => getAllStudentsBySession(session),
    enabled: !!session.sessionId,
  });

  useEffect(() => {
    setSelectedStudents([]);
    if (currentLevel?._id) {
      const modifiedStudents = all?.data?.filter(
        (student) => student?.levelId === currentLevel?._id
      );
      setSelectedStudents(modifiedStudents);
    } else {
      setSelectedStudents([]);
    }
  }, [currentLevel?._id]);

  const handleRowClick = (rowData) => {
    const id = rowData.levelId;
    const type = rowData.levelName;
    navigate(`/student/profile/${id}/${type}/${rowData._id}`, {
      state: {
        levelId: rowData.levelId,
        levelName: rowData.levelName,
      },
    });
  };
  // console.log(levelsOption)
  const handleRefresh = () => {
    setCurrentLevel({
      _id: '',
      type: '',
    });
    setSelectedStudents([]);
    all.refetch();
  };

  return (
    <Container
      sx={{
        width: '95%',
      }}
    >
      <CustomTitle
        title='Students Information'
        subtitle='  Track,manage and control academic and class activities'
        img={student_icon}
        color='primary.main'
      />

      <Stack rowGap={3} paddingY={3}>
        <Autocomplete
          disableClearable
          clearText=' '
          sx={{ width: 280 }}
          options={levelsOption ?? []}
          isOptionEqualToValue={(option, value) =>
            value._id === undefined ||
            value._id === '' ||
            option._id === value._id
          }
          getOptionLabel={(option) => option?.type || ''}
          value={currentLevel}
          onChange={(e, value) => setCurrentLevel(value)}
          renderInput={(params) => (
            <TextField {...params} label='Select Class' size='small' />
          )}
        />

        <CustomizedMaterialTable
          // isLoading={levelLoading}
          title={currentLevel?.type || 'Students'}
          icon={student_icon}
          search={true}
          columns={STUDENTS_COLUMN}
          actions={[]}
          data={currentLevel?._id === '' ? all?.data : selectedStudents}
          onRowClick={handleRowClick}
          addButtonImg={EMPTY_IMAGES.student}
          addButtonMessage='😑 No Students recently added !!!!'
          showRowShadow={true}
          handleRefresh={handleRefresh}
        />
      </Stack>
    </Container>
  );
};

StudentView.propTypes = {};

export default StudentView;
 



