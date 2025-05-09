import React from "react";
import { Line } from "react-chartjs-2";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import BarChartRounded from "@mui/icons-material/BarChartRounded";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { currencyFormatter } from "@/config/currencyFormatter";

const WeeklyFeePaymentChart = ({ data }) => {
  const { palette, breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down("md"));
  return (
    <Card elevation={1}>
      <CardHeader
        avatar={<BarChartRounded />}
        title="Cummulative Weekly Fees"
        subheader={
          <Typography fontSize={12} fontStyle="italic">
            Total Daily Fees Projections for the week
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
          <Line
            data={data}
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
                  beginAtZero: true,
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
                  display: matches ? false : true,
                  color: "black",
                  anchor: "center",
                  align: "end",
                  font: {
                    size: matches ? "14px" : "18px",
                  },
                  // backgroundColor: "#000",
                  // borderRadius:'40px',
                  formatter: (value) => currencyFormatter(value), // Display the data value directly
                },
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeeklyFeePaymentChart;
