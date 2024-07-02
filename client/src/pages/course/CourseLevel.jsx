import React, { useContext, useMemo } from 'react';
import CustomTitle from '../../components/custom/CustomTitle';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import { Button, Container, Stack } from '@mui/material';
import { EMPTY_IMAGES } from '../../config/images';
import { SchoolRounded } from '@mui/icons-material';
import { COURSE_LEVEL_COLUMNS } from '../../mockup/columns/sessionColumns';
import { UserContext } from '../../context/providers/UserProvider';
import useLevel from '../../components/hooks/useLevel';
import { useNavigate } from 'react-router-dom';

function CourseLevel() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const { levelsOption, levelLoading, levelRefetch } = useLevel();

  const classLevel = useMemo(() => {
    return levelsOption?.filter((level) => {
      return level?.teacher?._id === user?.id;
    });
  }, [levelsOption]);

  const viewExams = (id, level) => navigate(`/course/level/${id}/${level}`);
  const viewAttendance = (id, level) =>
    navigate(`/course/attendance/${id}/${level}`);

  const columns = [
    ...COURSE_LEVEL_COLUMNS,
    {
      field: null,
      title: 'Action',
      render: ({ _id, type }) => (
        <Stack direction='row' spacing={2}>
          <Button
            variant='outlined'
            color='info'
            onClick={() => viewAttendance(_id, type)}
          >
            Attendance
          </Button>

          <Button
            variant='outlined'
            color='warning'
            onClick={() => viewExams(_id, type)}
          >
            Exams Details
          </Button>
        </Stack>
      ),
    },
  ];
  return (
    <>
      <CustomTitle
        title='Assigned Levels'
        subtitle='Track,manage and control level activities'
        icon={<SchoolRounded color='primary' />}
        color='primary.main'
      />

      <CustomizedMaterialTable
        title='Levels'
        isLoading={levelLoading}
        columns={columns}
        data={classLevel}
        search
        actions={[]}
        showRowShadow={false}
        addButtonImg={EMPTY_IMAGES.session}
        addButtonMessage='😑 No level available! Assign a new one!'
        handleRefresh={levelRefetch}
        options={{
          selection: false,
        }}
      />
    </>
  );
}

export default CourseLevel;
