import React from "react";
import { Bar } from "react-chartjs-2";
import Box from "@mui/material/Box";
import { useTheme, useMediaQuery } from "@mui/material";

const BarCharts = ({ labels, data }) => {
  const { palette, breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down("md"));
  return (
    <Box
      sx={{
        minWidth: 200,
        height: matches ? 200 : 400,
      }}
    >
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: "No of Students",
              data: data,
              backgroundColor: [palette.primary.main, palette.secondary.main],
              barThickness: 50,
              borderRadius: 2,
            },
          ],
        }}
        options={{
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
              display: false,
            },
            datalabels: {
              display: true,
              color: "white",
              anchor: "center",
              align: "end",
              font: {
                size: matches ? "14px" : "18px",
              },
              // backgroundColor: "#000",
              // borderRadius:'40px',
              formatter: (value) => value, // Display the data value directly
            },
          },
        }}
      />
    </Box>
  );
};

export default BarCharts;
