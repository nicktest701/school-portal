import React, { useContext } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import StudentAcademicReportListItem from '../../list/StudentAcademicReportListItem';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getStudentAcademics } from '../../../api/ExaminationAPI';
import ViewExamsRecord from '../../../pages/examination/ViewExamsRecord';
import { UserContext } from '../../../context/providers/userProvider';

const StudentAcademics = () => {
  const {
    userState: { session },
  } = useContext(UserContext);

  const { studentId, id } = useParams();

  //Get Academic Terms for students
  const studentInfo = useQuery({
    queryKey: ['student-academics', studentId],
    queryFn: () => getStudentAcademics(session, studentId, id),
    enabled: !!studentId && !!id,
  });

  return (
    <Container>
      <Typography variant='h6'>Student Academics</Typography>
      <Stack>
        {studentInfo?.data !== undefined ? (
          <>
            {studentInfo?.data?.map((session, index) => {
              return (
                <StudentAcademicReportListItem key={index} item={session} />
              );
            })}
          </>
        ) : (
          <div>No Academic Records Available</div>
        )}
      </Stack>
      <ViewExamsRecord />
    </Container>
  );
};

export default StudentAcademics;
