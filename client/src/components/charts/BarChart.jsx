import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Box from "@mui/material/Box";
import _ from "lodash";
const LineChart = ({ data }) => {
  const [labels, setLabels] = useState([]);
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    if (data) {
      setLabels(_.map(data, "term"));
      setDataset(_.map(data, "student"));
    }
  }, [data]);

  return (
    // <Card>
    //   <CardContent>
    <Box
      sx={{
        minWidth: 100,
        width: "100%",
        height: 200,
      }}
    >
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: "No of Students",
              data: dataset,
              backgroundColor: [" rgb(1, 46, 84)", "rgb(255, 192, 159)"],
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
            autoPadding: true,
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
    //   </CardContent>
    // </Card>
  );
};

export default LineChart;
