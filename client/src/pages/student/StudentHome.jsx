import React, { useContext } from 'react';
import {
  Box,
  Card,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import { RECENT_STUDENTS_COLUMN } from '../../mockup/columns/studentColumns';
import StudentDashboardBarChart from '../../components/cards/StudentDashboardBarChart';
import StudentDashboardPieChart from '../../components/cards/StudentDashboardPieChart';
import { getAllStudentsDetails } from '../../api/studentAPI';
import StudentDashboardLineChart from '../../components/cards/StudentDashboardLineChart';
import { UserContext } from '../../context/providers/UserProvider';
import student_icon from '../../assets/images/header/student_ico.svg';
import { EMPTY_IMAGES } from '../../config/images';
import ChartSkeleton from '../../components/skeleton/ChartSkeleton';
import CustomTitle from '../../components/custom/CustomTitle';
import DashboardCard from '../../components/cards/DashboardCard';
import { Person } from '@mui/icons-material';

const StudentHome = () => {
  const {
    userState: { session },
  } = useContext(UserContext);

  const studentDetails = useQuery({
    queryKey: ['student-details', session?.sessionId, session?.termId],
    queryFn: () =>
      getAllStudentsDetails({
        sessionId: session.sessionId,
        termId: session.termId,
      }),
    enabled: !!session.sessionId && !!session.termId,
  });

  return (
    <>
      <CustomTitle
        title='Student Portal'
        subtitle='Track,manage and control student information'
        img={student_icon}
        color='primary.main'
      />
          <Typography  variant='h5' py={2}>Student Details Summary</Typography>
          <Divider/>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
          gap: 2,
          pt: 2,
        }}
      >
        <DashboardCard
          title='Students'
          value={108}
          icon={
            <IconButton sx={{ bgcolor: 'secondary.lighter' }}>
              <Person
                sx={{
                  width: 20,
                  height: 20,
                  color: 'secondary.darker',
                }}
              />
            </IconButton>
          }
        />
        <DashboardCard
          title='Males'
          value={60}
          icon={
            <IconButton sx={{ bgcolor: 'warning.lighter' }}>
              <Person
                sx={{
                  width: 20,
                  height: 20,
                  color: 'warning.darker',
                }}
              />
            </IconButton>
          }
        />

        <DashboardCard
          title='Females'
          value={48}
          icon={
            <IconButton sx={{ bgcolor: 'info.lighter' }}>
              <Person
                sx={{
                  width: 20,
                  height: 20,
                  color: 'info.darker',
                }}
              />
            </IconButton>
          }
        />
      </Box>
      <Typography  variant='h5' py={2}>Chart History</Typography>
          <Divider/>
      {studentDetails.isLoading && <ChartSkeleton />}

      {studentDetails.data && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
            gap: 2,
            pt: 2,
          }}
        >
          <StudentDashboardBarChart
            data={studentDetails?.data?.noOfStudentsForEachTerm}
          />
          <StudentDashboardLineChart
            data={studentDetails?.data?.noOfStudentsInEachLevel}
          />

          <StudentDashboardPieChart {...studentDetails?.data} />

          {/* <StudentDashboardCard /> */}
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: { xs: 'column', lg: 'row' },
          justifyContent: 'space-between',
          // border: '1px solid red',
          pt: 3,
          gap: 2,
        }}
      >
        <Card
          sx={{
            borderRadius: '8px',
            overflow: 'hidden',
            flex: 1,
            minWidth: 200,
          }}
        >
          <List
            subheader={
              <ListSubheader title='Number of Students'>
                Number of Students
              </ListSubheader>
            }
          >
            <ListItem divider>
              <ListItemText>Students</ListItemText>
              <ListItemSecondaryAction>
                <ListItemText>Number</ListItemText>
              </ListItemSecondaryAction>
            </ListItem>
            {studentDetails?.data?.noOfStudentsInEachLevel?.map((item) => {
              return (
                <ListItem key={item?.level} divider>
                  <ListItemText>{item?.level}</ListItemText>
                  <ListItemSecondaryAction>
                    <ListItemText>{item?.students}</ListItemText>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Card>

        <CustomizedMaterialTable
          title='Recently Added Students'
          icon={student_icon}
          isLoading={studentDetails.isLoading}
          columns={RECENT_STUDENTS_COLUMN}
          // data={[]}
          options={{
            paginationPosition: 'bottom',
            pageSize: 3,
            selection: false,
          }}
          data={studentDetails.data?.recentStudents ?? []}
          actions={[]}
          handleRefresh={studentDetails.refetch}
          addButtonImg={EMPTY_IMAGES.student}
          addButtonMessage='😑 No Students recently added !!!!'
          style={{
            border: 'none',
            boxShadow: '0px 1px 5px rgba(0,0,0,0.07)',
          }}
        />
      </Box>
    </>
  );
};

export default StudentHome;
