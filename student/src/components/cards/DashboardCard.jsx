import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CountUp from "react-countup";
import { memo } from "react";

const DashboardCard = ({ title, value, icon }) => {
  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: 2,
        boxShadow: "20px 20px 60px #d9d9d9",
        // boxShadow: '20px 20px 60px #d9d9d9,-20px -20px 60px #ffffff',
        py: 2,
      }}
      elevation={1}
    >
      <CardContent>
        <Typography variant="h5" textAlign="center" sx={{ paddingY: 1 }}>
          <CountUp duration={5} end={value || 0} enableScrollSpy />
        </Typography>
        <div
          style={{
            position: "absolute",
            right: 10,
            bottom: 5,
          }}
        >
          {icon}
        </div>
        <Typography variant="body1" color="primary">{title}</Typography>
      </CardContent>
    </Card>
  );
};



export default memo(DashboardCard);
