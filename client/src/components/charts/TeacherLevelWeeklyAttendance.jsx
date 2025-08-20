import React from "react";
import { Bar } from "react-chartjs-2";
import { useTheme, useMediaQuery } from "@mui/material";

import ChartContainer from "./ChartContainer";
const TeacherLevelWeeklyAttendance = ({ data }) => {
  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down("md"));

  return (
    <ChartContainer title="Daily Attendance" subtitle='Review attendance records on a weekly basis'>
      <Bar
        data={data}
        options={{
          indexAxis: matches ? "y" : "x",
          responsive: true,
          maintainAspectRatio: false,

          layout: {
            padding: 2,
            autoPadding: true,
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
              position: "top",
            },
            datalabels: {
              display: true,
              color: "#fff",
              anchor: "center",
              align: "end",
              font: {
                size: matches ? "14px" : "18px",
              },

              formatter: (value) => value, // Display the data value directly
            },
          },
        }}
      />
    </ChartContainer>
  );
};

export default TeacherLevelWeeklyAttendance;
