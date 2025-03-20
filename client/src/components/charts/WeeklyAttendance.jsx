import { Bar } from "react-chartjs-2";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import BarChartRounded from "@mui/icons-material/BarChartRounded";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { useEffect, useState } from "react";
import moment from "moment";

function WeeklyAttendance({ data }) {
  const { palette, breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down("md"));

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Present",
        data: [],
        backgroundColor: "#012e54",
      },
      {
        label: "Absent",
        data: [],
        backgroundColor: "#ffc09f",
      },
    ],
  });

  useEffect(() => {
    const labels = data.map((entry) =>
      moment(entry.date, "MM/DD/YYYY").format("ddd,(Do MMM)")
    );

    const presentCounts = data.map((entry) => entry.presentCount);
    const absentCounts = data.map((entry) => entry.absentCount);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Present",
          data: presentCounts,
          backgroundColor: "#012e54",
          barThickness: 10,
          borderRadius: 10,
        },
        {
          label: "Absent",
          data: absentCounts,
          backgroundColor: "#ffc09f",
          barThickness: 10,
          borderRadius: 10,
        },
      ],
    });
  }, [data]);

  return (
    <Card elevation={1}>
      <CardHeader
        avatar={<BarChartRounded />}
        title={`Total Daily Attendance`}
        subheader={
          <Typography fontSize={12} fontStyle="italic">
            Total daily attendance within the current week.
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
}

export default WeeklyAttendance;
