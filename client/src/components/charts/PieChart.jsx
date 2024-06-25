import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';

const PieChart = () => {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        minWidth: 150,
        height: 150,
      }}
    >
      <Doughnut
        datasetIdKey='pie'
        data={{
          labels: ['Sent', 'Received'],

          datasets: [
            {
              data: [65, 34],
              // borderColor: palette.primary.main,
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
            },
            y: {
              ticks: {
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
  );
};

export default PieChart;
