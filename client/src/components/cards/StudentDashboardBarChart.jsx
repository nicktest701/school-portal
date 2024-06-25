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

// sx={{
//   backgroundColor: "#fff",
//   padding: 2,
//   borderRadius: "8px",
//   boxShadow: "0px 1px 20px 10px rgba(84,84,84,0.10)",
//   borderInlineStart: "2px solid",
//   borderBlockStart: "2px solid",
//   borderTopLeftRadius: "8px",
//   borderImageSource:
//     "radial-gradient(circle at top left,#012E54,transparent 50%)",
//   borderImageSlice: "1",
// }}
