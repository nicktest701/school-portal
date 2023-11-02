import React, { useContext, useState } from 'react';
import { Add, PersonRounded } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {  Container, Divider, Tab } from '@mui/material';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import TeacherAdd from './TeacherAdd';
import { TEACHERS_COLUMN } from '../../mockup/columns/teacherColumn';
import { useQuery } from '@tanstack/react-query';
import { getAllTeachers } from '../../api/teacherAPI';
import { TeacherContext } from '../../context/providers/TeacherProvider';
import { EMPTY_IMAGES } from '../../config/images';
import teacher_icon from '../../assets/images/header/teacher_ico.svg';
import CustomTitle from '../../components/custom/CustomTitle';


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
    <Container
      sx={{
        position: 'relative',
        height: 350,
        color: 'primary.contrastText',
        // bgcolor: 'secondary.main',
      }}
    >
      <CustomTitle
        title='Teachers Portal'
        subtitle='Manage teaching staff information'
        img={teacher_icon}
        color='primary.main'
      />

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
            isLoading={teachers.isLoading}
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
  );
};

export default TeacherHome;
