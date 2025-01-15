import PivotTableChartRounded from "@mui/icons-material/PivotTableChartRounded";
import { Box, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { Doughnut } from "react-chartjs-2";

const StudentDashboardPieChart = ({ females, males }) => {
  const { palette } = useTheme();
  return (
    <Card elevation={1}>
      <CardHeader avatar={<PivotTableChartRounded />} title="Males & Females" />
      <CardContent>
        <Box
          sx={{
            minWidth: 100,
            width: "100%",
            height: 200,
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
                  position: "bottom",
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
