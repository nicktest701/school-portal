import Box from "@mui/material/Box";
import { useTheme, useMediaQuery } from "@mui/material";
import { Radar } from "react-chartjs-2";

const RadarChart = ({ values, labels }) => {
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
      <Radar
        datasetIdKey="id"
        data={{
          labels,
          datasets: [
            {
              data: values,
              borderColor: palette.primary.main,
              backgroundColor: [palette.primary.main, palette.secondary.main],
              fill: "-2",
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,

          layout: {
            padding: 10,
          },
          elements: {
            line: {
              borderWidth: 3,
            },
          },
          scales: {
            r: {
              angleLines: {
                display: false,
              },
              // suggestedMin: 50,
              // suggestedMax: 100,
            },
          },
          plugins: {
            legend: {
              display: false,
              position: "bottom",
            },
          },
        }}
      />
    </Box>
  );
};

export default RadarChart;
