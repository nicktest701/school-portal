import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTheme, Box } from '@mui/material';
import _ from 'lodash';
const LineChart = ({ data }) => {
  const { palette } = useTheme();

  const [labels, setLabels] = useState([]);
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    if (data) {
      setLabels(_.map(data, 'term'));
      setDataset(_.map(data, 'student'));
    }
  }, [data]);

  return (
    // <Card>
    //   <CardContent>
    <Box
      sx={{
        minWidth: 150,
        height: 150,
      }}
    >
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: 'No of Students',
              data: dataset,
              backgroundColor: palette.primary.main,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: 10,
            autoPadding: true,
          },
          scales: {
            x: {
              ticks: {
                display: false,
              },
              grid: {
                display: false,
              },
            },
            y: {
              ticks: {
                display: false,
              },
              grid: {
                display: false,
              },
          
            },
          },
          plugins: {
            legend: {
              // display: false,
            },
          },
        }}
      />
    </Box>
    //   </CardContent>
    // </Card>
  );
};

export default LineChart;
