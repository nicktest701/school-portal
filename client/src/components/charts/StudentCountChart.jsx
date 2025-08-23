import { Doughnut } from "react-chartjs-2";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

import BarChartRounded from "@mui/icons-material/BarChartRounded";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

function StudentCountChart({ data }) {
  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down("md"));

  return (
    <Card elevation={1}>
      <CardHeader
        avatar={<BarChartRounded />}
        title={`Active Students`}
        subheader={
          <Typography fontSize={12} fontStyle="italic">
            Total number of active students
          </Typography>
        }
      />
      <CardContent>
        <Box
          sx={{
            minWidth: 100,
            width: "100%",
            height: matches ? 200 : 400,
          }}
        >
          <Doughnut
            data={{
              labels: ["Male", "Female"],
              datasets: [
                {
                  label: "Active Students",
                  data: [data.male, data.female],
                  backgroundColor: ["#012e54", "#ffc09f"],
                  // barThickness: 20,
                  borderRadius: 10,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              radius: matches ? 60 : 100,
              cutout: "80%",
              layout: {
                padding: 2,
                autoPadding: true,
              },
              scales: {
                x: {
                  beginAtZero: true,
                  ticks: {
                    display: false,
                  },
                  grid: {
                    // display: false,
                  },
                },
                y: {
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
                  display: true,
                },

                datalabels: {
                  display: true,
                  color: "white",
                  anchor: "center",
                  align: "end",
                  font: {
                    size: "18px",
                  },
                  backgroundColor: "#000",
                  // borderRadius:'40px',
                  formatter: (value) => value, // Display the data value directly
                },
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default StudentCountChart;
