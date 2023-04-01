import React from 'react';
import { Container, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import StudentReportListItem from '../../components/list/StudentReportListItem';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getStudentAllFeeHistory } from '../../api/currentFeeAPI';
import StudentFeeReportListItem from '../../components/list/StudentFeeReportListItem';

const StudentFees = () => {
  const { studentId } = useParams();

  //Get Academic Terms for students
  const studentFees = useQuery({
    queryKey: ['student-fees', studentId],
    queryFn: () => getStudentAllFeeHistory(studentId),
    enabled: !!studentId,
  });

  return (
    <Container>
      <Typography variant='h6'>Student Fees History</Typography>
      <Stack
        sx={{
          width: '100%',
          maxHeight: '100vh',
          overflowY: 'scroll',
          // border: "1px solid black",
        }}
      >
        {studentFees?.data?.fees !== undefined ? (
          <>
            {studentFees?.data?.fees.map((session, index) => {
              return (
                <StudentFeeReportListItem
                  key={index}
                  item={session}
                  studentId={studentId}
                />
              );
            })}
          </>
        ) : (
          <div>No Fees History Available</div>
        )}
      </Stack>
    </Container>
  );
};
StudentFees.propTypes = {
  studentId: PropTypes.string,
};

export default StudentFees;
