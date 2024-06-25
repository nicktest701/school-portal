import  BarChartRounded  from "@mui/icons-material/BarChartRounded";
import  ArrowForwardIosRounded from "@mui/icons-material/ArrowForwardIosRounded";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LineChart from "../charts/LineChart";

const StudentDashboardCard = () => {
  return (
    <Stack
      sx={{
        backgroundColor: "#fff",
        padding: 2,
        borderRadius: "8px",
        boxShadow: "0px 1px 20px 10px rgba(84,84,84,0.10)",
        borderInlineStart: "2px solid",
        borderBlockStart: "2px solid",
        borderTopLeftRadius: "8px",
        borderImageSource:
          "radial-gradient(circle at top left,#012E54,transparent 50%)",
        borderImageSlice: "1",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button endIcon={<ArrowForwardIosRounded />}>Total Students</Button>
        <Button
          variant="outlined"
          startIcon={<BarChartRounded />}
          sx={{ width: 65, height: 20, padding: "5px" }}
        >
          4.0%
        </Button>
      </Stack>
      <Typography variant="h6">3.2k</Typography>
      <LineChart />
    </Stack>
  );
};

export default StudentDashboardCard;
