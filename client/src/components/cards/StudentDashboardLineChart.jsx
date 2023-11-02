import React, { useEffect, useState } from 'react';
import PieChartRounded from '@mui/icons-material/PieChartRounded';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
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
    <Card sx={{ border: '1px solid lightgray' }}>
      <CardHeader avatar={<PieChartRounded />} title='Levels' />
      <CardContent>
        <Box>
          <Pie
            datasetIdKey='id'
            style={{
              minWidth: 100,
              height: 100,
            }}
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
