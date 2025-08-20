import BarChartRounded from "@mui/icons-material/BarChartRounded";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { currencyFormatter } from "@/config/currencyFormatter";

const FeesDashboardCard = ({ text, value }) => {
  return (
    <Stack
      spacing={1}
      sx={{
        backgroundColor: "#fff",
        px: 2,
        py: 2,
        borderRadius: "8px",
        boxShadow: "0px 1px 20px 10px rgba(84,84,84,0.10)",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography>{text}</Typography>
        <BarChartRounded color="secondary" />
      </Stack>
      <Typography variant="h5">{currencyFormatter(value ?? 0)}</Typography>
    </Stack>
  );
};

export default FeesDashboardCard;
