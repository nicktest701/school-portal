import { Add, PersonRounded, StyleOutlined } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Divider, Stack, Tab, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import Back from '../../components/Back';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import TeacherAdd from './TeacherAdd';
import { TEACHERS_COLUMN } from '../../mockup/columns/teacherColumn';
import { useQuery } from '@tanstack/react-query';
import { getAllTeachers } from '../../api/teacherAPI';
import { TeacherContext } from '../../context/providers/TeacherProvider';
import { EMPTY_IMAGES } from '../../config/images';
import teacher_icon from '../../assets/images/header/teacher_ico.svg';

const TeacherHome = () => {
  const [tab, setTab] = useState('1');

  //context
  const { teacherDispatch } = useContext(TeacherContext);

  //GET All Teachers
  const teachers = useQuery(['teachers'], () => getAllTeachers());
  const isNotTeacher = teachers?.data?.length === 0;

  //VIEW Teacher Info
  const viewTeacherInfo = (data) => {
    teacherDispatch({
      type: 'viewTeacher',
      payload: {
        open: true,
        data,
      },
    });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: 350,
        color: 'primary.contrastText',
        bgcolor: 'secondary.main',
      }}
    >
      <Container
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Back />
        <Container
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            paddingY: 2,
          }}
        >
          <Stack color='primary.main'>
            <Typography variant='h5'>Teacher's Portal</Typography>
            <Typography>Manage teaching staff information</Typography>
          </Stack>
          <StyleOutlined color='inherit' sx={{ width: 50, height: 50 }} />
        </Container>

        <TabContext value={tab}>
          <TabList onChange={(e, value) => setTab(value)}>
            <Tab
              value='1'
              label='Teachers'
              icon={<PersonRounded />}
              iconPosition='start'
            />
            <Tab
              value='2'
              label={isNotTeacher ? null : 'New'}
              icon={isNotTeacher ? null : <Add />}
              iconPosition='start'
            />
          </TabList>
          <Divider />
          <TabPanel value='1'>
            <CustomizedMaterialTable
              title='Teachers'
              icon={teacher_icon}
              isLoading={teachers.isFetching}
              columns={TEACHERS_COLUMN}
              // data={[]}
             data={teachers.data ? teachers.data : []}
              actions={[]}
              onRowClick={viewTeacherInfo}
              showAddButton={true}
              addButtonImg={EMPTY_IMAGES.teacher}
              addButtonText='New Teacher'
              addButtonMessage='😑 Add your first teacher by clicking on the button below !'
              onAddButtonClicked={() => setTab('2')}
            />
          </TabPanel>
          <TabPanel value='2'>
            <TeacherAdd setTab={setTab} />
          </TabPanel>
        </TabContext>
      </Container>
    </Box>
  );
};

export default TeacherHome;
