import { Button, Container, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { getCurrentExams } from '../../api/ExaminationAPI';
import _ from 'lodash';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import student_icon from '../../assets/images/header/student_ico.svg';
import { gradeColor } from '../../config/gradeColor';
function ExamsScoreList({ session }) {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const [profile, setProfile] = useState(null);

  const examsDetails = useQuery({
    queryKey: ['exams-scores'],
    queryFn: () => getCurrentExams(session),
    enabled: !!session?.sessionId,
    onSuccess: (payload) => {
      if (!_.isEmpty(payload)) {
        schoolSessionDispatch({
          type: 'setReportData',
          payload,
        });

        setProfile(
          `${import.meta.env.VITE_BASE_URL}/images/students/${payload.profile}`
        );
      }
    },
  });
  const columns = [
    { field: 'subject', title: 'Subject' },
    { field: 'classScore', title: 'Class Score' },
    { field: 'examsScore', title: 'Exams Score' },
    {
      field: 'totalScore',
      title: 'Total Score',
      cellStyle: {
        color: 'red',
      },
    },
    {
      field: 'grade',
      title: 'Grade',
      // cellStyle: {
      //   color: 'blue',
      // },
    },
    {
      field: 'remarks',
      title: 'Remarks',
      cellStyle: {
        color: 'green',
      },
      render: ({ totalScore, remarks }) => {
        return (
          <Button
            sx={{
              color: gradeColor(totalScore).color,
              bgcolor: gradeColor(totalScore).bg,
            }}
          >
            {remarks}
          </Button>
        );
      },
    },
  ];

  return (
    <Container>
      <Typography textAlign='right' variant='h6'>
        Overall Score - {_.sumBy(examsDetails?.data?.scores, 'totalScore') ?? 0}
      </Typography>
      <CustomizedMaterialTable
        icon={profile}
        title={examsDetails?.data?.fullName || ''}
        isLoading={examsDetails.isLoading}
        columns={columns}
        data={examsDetails?.data?.scores}
        actions={[]}
        search={false}
        handleRefresh={examsDetails.refetch}
        addButtonImg={student_icon}
        addButtonMessage='No Exams Score available'
      />
    </Container>
  );
}

export default ExamsScoreList;
