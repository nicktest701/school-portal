import React, { useContext } from 'react';
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import { STUDENTS_COLUMN } from '../../mockup/columns/studentColumns';
import StudentDashboardBarChart from '../../components/cards/StudentDashboardBarChart';
import StudentDashboardPieChart from '../../components/cards/StudentDashboardPieChart';
import { getAllStudentsDetails } from '../../api/studentAPI';
import StudentDashboardLineChart from '../../components/cards/StudentDashboardLineChart';
import { UserContext } from '../../context/providers/userProvider';
import student_icon from '../../assets/images/header/student_ico.svg';
import { EMPTY_IMAGES } from '../../config/images';
import ChartSkeleton from '../../components/skeleton/ChartSkeleton';
import CustomTitle from '../../components/custom/CustomTitle';

const StudentHome = () => {
  const {
    userState: { session },
  } = useContext(UserContext);

  const studentDetails = useQuery({
    queryKey: ['student-details'],
    queryFn: () =>
      getAllStudentsDetails({
        sessionId: session.sessionId,
        termId: session.termId,
      }),
    enabled: !!session.sessionId && !!session.termId,
  });

  // console.log(studentDetails?.data?.noOfStudentsInEachLevel);

  return (
    <Box
      // bgcolor='primary.main'
      width='inherit'
      sx={{
        position: 'relative',
        height: 200,
      }}
    >
      <Container
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
          // bgcolor:'rgb(241, 244, 250)'
        }}
      >
        <CustomTitle
          title='Student Portal'
          subtitle='Track,manage and control student information'
          img={student_icon}
          color='primary.main'
        />

        <Divider />

        {studentDetails.isLoading && <ChartSkeleton />}

        {studentDetails.data && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
              gap: 2,
              py: 2,
            }}
          >
            <StudentDashboardLineChart
              data={studentDetails?.data?.noOfStudentsInEachLevel}
            />
            <StudentDashboardBarChart
              data={studentDetails?.data?.noOfStudentsForEachTerm}
            />
            <StudentDashboardPieChart {...studentDetails?.data} />

            {/* <StudentDashboardCard /> */}
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'center', md: 'space-between' },
            pt: 3,
            gap: 2,
          }}
        >
          <List
            subheader={
              <ListSubheader title='Number of Students'>
                Number of Students
              </ListSubheader>
            }
            sx={{
              borderRadius: '8px',
              border: '1px solid lightgray',
              minWidth: 250,
              overflow: 'hidden',
            }}
          >
            <ListItem divider>
              <ListItemText>Students</ListItemText>
              <ListItemText>Number</ListItemText>
            </ListItem>
            {studentDetails?.data?.noOfStudentsInEachLevel?.map((item) => {
              return (
                <ListItem key={item?.level} divider>
                  <ListItemText>{item?.level}</ListItemText>
                  <ListItemText>{item?.students}</ListItemText>
                </ListItem>
              );
            })}
          </List>

          <CustomizedMaterialTable
            title='Recently Added Students'
            icon={student_icon}
            isLoading={studentDetails.isLoading}
            columns={STUDENTS_COLUMN}
            // data={[]}
            options={{
              paginationPosition: 'bottom',
            }}
            data={studentDetails.data?.recentStudents ?? []}
            actions={[]}
            handleRefresh={studentDetails.refetch}
            addButtonImg={EMPTY_IMAGES.student}
            addButtonMessage='😑 No Students recently added !!!!'
          />
        </Box>
      </Container>
    </Box>
  );
};

export default StudentHome;
