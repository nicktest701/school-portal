import React from "react";
import { Bar } from "react-chartjs-2";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import BarChartRounded from "@mui/icons-material/BarChartRounded";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { currencyFormatter } from "@/config/currencyFormatter";

const MonthlyFeePaymentChart = ({ data }) => {
  const { palette, breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down("md"));
  return (
    <Card elevation={1}>
      <CardHeader
        avatar={<BarChartRounded />}
        title="Cummulative Fees"
        subheader={
          <Typography fontSize={12} fontStyle="italic">
            Total Fees Projections for the Term /Semester
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
                  color: "#fff",
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

export default MonthlyFeePaymentChart;
