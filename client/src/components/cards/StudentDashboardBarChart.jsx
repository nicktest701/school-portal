import  BarChartRounded  from '@mui/icons-material/BarChartRounded';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import PropTypes from 'prop-types';
import BarChart from '../charts/BarChart';

const StudentDashboardBarChart = ({ data }) => {
  return (
    <Card elevation={1}>
      <CardHeader
        avatar={<BarChartRounded />}
        title={`Students for ${data && data[0]?.academicYear}`}
      />
      <CardContent>
        <BarChart data={data} />
      </CardContent>
    </Card>
  );
};

StudentDashboardBarChart.propTypes = {
  data: PropTypes.array,
};
export default StudentDashboardBarChart;

