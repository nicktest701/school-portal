import { Line } from "react-chartjs-2";
import { useTheme, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";

const LineChart = ({ labels, values, values2 }) => {
  const { palette, breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down("md"));

  return (
    <Box
      sx={{
        minWidth: 100,
        width: "100%",
        height: matches ? 200 : 400,
      }}
    >
      <Line
        datasetIdKey="line"
        data={{
          labels,

          datasets: [
            {
              label: "Present",
              data: values,
              borderColor: palette.secondary.main,
              tension: 0.3,
            },
            values2 && {
              label: "Absent",
              data: values2,
              borderColor: palette.primary.main,
              tension: 0.3,
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
                // display: false,
              },
              grid: {
                // display: false,
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                // display: false,
              },
              grid: {
                // display: false,
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

export default LineChart;
