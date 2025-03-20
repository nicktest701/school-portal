import { Bar } from "react-chartjs-2";
import { Box, Typography , useTheme, useMediaQuery } from "@mui/material";
import BarChartRounded from "@mui/icons-material/BarChartRounded";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { useState, useEffect } from "react";

const WeeklyGenderAttendance = ({ data }) => {
const { palette, breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down("md"));


  const [chartData, setChartData] = useState({
    labels: ["Male", "Female"], // Bar labels for male and female counts
    datasets: [
      {
        label: "Present",
        data: [0, 0], // Default counts
        backgroundColor: ["#ffc09f", "#ffc09f"], // Teal for male, Orange for female
      },
      {
        label: "Absent",
        data: [0, 0], // Default counts
        backgroundColor: ["#012e54", "#012e54"], // Blue for male, Red for female
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      // Update the chart data with fetched values
      setChartData({
        labels: ["Male", "Female"],
        datasets: [
          {
            label: "Present",
            data: [data.malePresent, data.femalePresent],
            backgroundColor: ["#ffc09f", "#ffc09f"],
            barThickness: 10,
            borderRadius: 10,
          },
          {
            label: "Absent",
            data: [data.maleAbsent, data.femaleAbsent],
            backgroundColor: ["#012e54", "#012e54"],
            barThickness: 10,
            borderRadius: 10,
          },
        ],
      });
    };

    fetchData();
  }, []);

  return (
    <Card elevation={1}>
      <CardHeader
        avatar={<BarChartRounded />}
        title={`Cummulative Attendance`}
        subheader={
          <Typography fontSize={12} fontStyle="italic">
            Total attendance for both males and females.
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
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,

              layout: {
                padding: 2,
                autoPadding: true,
              },
              scales: {
                x: {
                  beginAtZero: true,
                  // stacked: true,
                  ticks: {
                    // display: false,
                  },
                  grid: {
                    display: false,
                  },
                },
                y: {
                  ticks: {
                    // display: false,
                  },
                  grid: {
                    display: false,
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                  // position: "left",
                  fullSize: true,
                },

                datalabels: {
                  display: true,
                  color: "white",
                  anchor: "center",
                  align: "end",
                  font: {
                    size: "14px",
                  },
                  // backgroundColor: "#00000020",
                  borderRadius: 50,
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

export default WeeklyGenderAttendance;
