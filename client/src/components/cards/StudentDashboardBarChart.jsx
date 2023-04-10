import { BarChartRounded } from '@mui/icons-material';

import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader } from '@mui/material';
import React from 'react';
import BarChart from '../charts/BarChart';

const StudentDashboardBarChart = ({ data }) => {
  return (
    <Card>
      <CardHeader
        avatar={<BarChartRounded />}
        title={`Total Students for ${data && data[0]?.academicYear}`}
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
