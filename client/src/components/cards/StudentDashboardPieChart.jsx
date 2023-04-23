import PivotTableChartRounded from '@mui/icons-material/PivotTableChartRounded';
import { useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
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
