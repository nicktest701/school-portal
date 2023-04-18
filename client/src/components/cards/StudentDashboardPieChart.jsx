import { PivotTableChartRounded } from '@mui/icons-material';
import { Card, CardContent, CardHeader, useTheme } from '@mui/material';
import { PolarArea } from 'react-chartjs-2';

const StudentDashboardPieChart = ({ females, males }) => {
  const { palette } = useTheme();
  return (
    <Card>
      <CardHeader avatar={<PivotTableChartRounded />} title='Males & Females' />
      <CardContent>
        <PolarArea
          datasetIdKey='id'
          data={{
            labels: ['Males', 'Females'],

            datasets: [
              {
                data: [males, females],
                backgroundColor: [palette.primary.main, palette.secondary.main],
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
      </CardContent>
    </Card>
  );
};

export default StudentDashboardPieChart;
