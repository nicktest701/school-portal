import { BarChartRounded } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";

const ChartContainer = ({ title, subtitle, children }) => {
  return (
    <Card elevation={1}>
      <CardHeader
        avatar={<BarChartRounded />}
        title={title}
        subheader={
          <Typography fontSize={12} fontStyle="italic">
            {subtitle}
          </Typography>
        }
      />
      <CardContent>
        <Box
          sx={{
            minWidth: 100,
            width: "100%",
            height: { xs: 200, md: 400 },
          }}
        >
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChartContainer;
