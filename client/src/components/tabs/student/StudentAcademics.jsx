import React from 'react';
import { Container, Stack, Typography } from '@mui/material';
import StudentAcademicReportListItem from '../../list/StudentAcademicReportListItem';

import ViewExamsRecord from '../../../pages/examination/ViewExamsRecord';

const StudentAcademics = ({ data }) => {
  return (
    <Container>
      <Typography variant='h6'>Student Academics</Typography>
      <Stack>
        {data !== undefined ? (
          <>
            {data?.map((session, index) => {
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
