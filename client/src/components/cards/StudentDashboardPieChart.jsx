import { PieChartRounded } from '@mui/icons-material';
import {
  Card,
  CardContent,
  CardHeader,

  useTheme,
} from '@mui/material';
import { PolarArea } from 'react-chartjs-2';

const StudentDashboardPieChart = ({ students, females, males }) => {
  const { palette } = useTheme();
  return (
    <Card>
      <CardHeader avatar={<PieChartRounded />} title='Males & Females' />
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
              padding: 10,
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

