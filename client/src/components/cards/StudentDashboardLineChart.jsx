import React, { useEffect, useState } from 'react';
import { PieChartRounded } from '@mui/icons-material';
import { Box, Card, CardContent, CardHeader } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import _ from 'lodash';
const StudentDashboardLineChart = ({ data }) => {
  const [labels, setLabels] = useState([]);
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    if (data) {
      setLabels(_.map(data, 'level'));
      setDataset(_.map(data, 'students'));
    }
  }, [data]);

  return (
    <Card>
      <CardHeader
          avatar={<PieChartRounded />
        }
        title='Students In Each Level'
      />
      <CardContent>
        <Box
          sx={{
            minWidth: 150,
            height: 150,
          }}
        >
          <Pie
            datasetIdKey='id'
            data={{
              labels,

              datasets: [
                {
                  label: 'Level',
                  data: dataset,
                  backgroundColor: ['rgb(255, 192, 159)', ' rgb(1, 46, 84)'],
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,


              layout: {
                padding: 2,
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
      </CardContent>
    </Card>
  );
};

export default StudentDashboardLineChart;
