import PivotTableChartRounded from "@mui/icons-material/PivotTableChartRounded";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { Doughnut } from "react-chartjs-2";

const StudentDashboardPieChart = ({ females, males }) => {
  const { palette, breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down("md"));

  return (
    <Card elevation={1}>
      <CardHeader
        avatar={<PivotTableChartRounded />}
        title="Males & Females"
        subheader={
          <Typography fontSize={12} fontStyle="italic">
            Total number of males and females.
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
            datasetIdKey="id"
            data={{
              labels: ["Males", "Females"],

              datasets: [
                {
                  data: [males, females],
                  backgroundColor: [
                    palette.primary.main,
                    palette.secondary.main,
                  ],
                  borderRadius: 10, // backgroundColor: [palette.info.light, palette.success.light],
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              cutout: "85%",

              layout: {
                // padding: 20,
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
                  position: "bottom",
                },
                datalabels: {
                  display: true,
                  color: "white",
                  anchor: "center",
                  align: "end",
                  font: {
                    size: "14px",
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
};

export default StudentDashboardPieChart;
