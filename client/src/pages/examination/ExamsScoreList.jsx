import { Button, Container } from '@mui/material';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';

import student_icon from '../../assets/images/header/student_ico.svg';
import { gradeColor } from '../../config/gradeColor';
import { School } from '@mui/icons-material';
function ExamsScoreList({ details }) {
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
      <CustomizedMaterialTable
        icon={details?.profile || <School />}
        title={details?.fullName || 'Student'}
        columns={columns}
        data={details?.scores}
        actions={[]}
        search={false}
        addButtonImg={student_icon}
        addButtonMessage='No Exams Score available'
      />
    </Container>
  );
}

export default ExamsScoreList;
