import React, { useEffect, useState } from "react";
import PieChartRounded from "@mui/icons-material/PieChartRounded";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { Bar } from "react-chartjs-2";
import _ from "lodash";
import { Typography, useTheme, useMediaQuery } from "@mui/material";
import { generateRGBAColorsBetween } from "@/config/helper";
const StudentDashboardLineChart = ({ data, academicYear }) => {
  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down("md"));

  const [labels, setLabels] = useState([]);
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    if (data) {
      setLabels(_.map(data, "level"));
      setDataset(_.map(data, "students"));
    }
  }, [data]);

  return (
    <Card elevation={1}>
      <CardHeader
        avatar={<PieChartRounded />}
        title={`Current Students for ${academicYear || ""}`}
        subheader={
          <Typography fontSize={12} fontStyle="italic">
            Total number of active students at each level.
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
            datasetIdKey="id"
            data={{
              labels,
              datasets: [
                {
                  label: "Levels",
                  data: dataset,
                  backgroundColor: ["rgb(255, 192, 159)", " rgb(1, 46, 84)"],
                  // backgroundColor: generateRGBAColorsBetween(),
                  barThickness: matches ? 10 : 20,
                  borderRadius: 5,
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
                  title: "Number of Students",

                },
              },
              plugins: {
                legend: {
                  // display: false,
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
                  formatter: (value) => value || 0, // Display the data value directly
                },
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default StudentDashboardLineChart;
