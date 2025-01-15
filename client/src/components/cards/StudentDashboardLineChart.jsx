import React, { useEffect, useState } from "react";
import PieChartRounded from "@mui/icons-material/PieChartRounded";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { Bar } from "react-chartjs-2";
import _ from "lodash";
const StudentDashboardLineChart = ({ data }) => {
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
      <CardHeader avatar={<PieChartRounded />} title="Students" />
      <CardContent>
        <Box
          sx={{
            minWidth: 100,
            width: "100%",
            height: 200,
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
                  backgroundColor: ["rgb(255, 192, 159)"," rgb(1, 46, 84)", ],
                  barThickness: 10,
                  borderRadius: 10,
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
