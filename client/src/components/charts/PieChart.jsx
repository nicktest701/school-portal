import Box from "@mui/material/Box";
import { useTheme, useMediaQuery } from "@mui/material";
import { Doughnut } from "react-chartjs-2";

const PieChart = () => {
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
      <Doughnut
        datasetIdKey="pie"
        data={{
          labels: ["Sent", "Received"],

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
          cutout: "80%",
          layout: {
            padding: 10,
          },
          scales: {
            x: {
              ticks: {
                // display: false,
              },
            },
            y: {
              ticks: {
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

export default PieChart;
