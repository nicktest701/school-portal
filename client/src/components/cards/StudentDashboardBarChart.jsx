import { useContext, useEffect, useState } from "react";
import BarChartRounded from "@mui/icons-material/BarChartRounded";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import PropTypes from "prop-types";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Bar } from "react-chartjs-2";
import _ from "lodash";
import { UserContext } from "@/context/providers/UserProvider";

const StudentDashboardBarChart = ({ data }) => {
  const { session } = useContext(UserContext);
  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down("md"));

  const [labels, setLabels] = useState([]);
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    if (data) {
      setLabels(_.map(data, "term"));
      setDataset(_.map(data, "student"));
    }
  }, [data]);

  return (
    <Card elevation={1}>
      <CardHeader
        avatar={<BarChartRounded />}
        title={`Students for ${session?.academicYear}`}
        subheader={
          <Typography fontSize={12} fontStyle="italic">
            Total number of active students in each term.
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
            data={{
              labels,
              datasets: [
                {
                  label: "No. of Students",
                  data: dataset,
                  backgroundColor: [" rgb(1, 46, 84)", "rgb(255, 192, 159)"],
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
                autoPadding: true,
              },
              scales: {
                x: {
                  ticks: {
                    // display: true,
                  },
                  grid: {
                    // display: false,
                  },
                },
                y: {
                  ticks: {
                    // maxTicksLimit:50
                    stepSize: 1,
                    // maxTicksLimit: 100,
                    precision: 1,
                  },
                  grid: {
                    // display: false,
                  },
                },
              },
              plugins: {
                legend: {
                  // display: true,
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

StudentDashboardBarChart.propTypes = {
  data: PropTypes.array,
};
export default StudentDashboardBarChart;
