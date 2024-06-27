import SchoolIcon from "@mui/icons-material/School";
import { Box, Typography } from "@mui/material";
import CurrentLevelTab from "./CurrentLevelTab";
import Back from "../../components/Back";
import CustomTitle from "../../components/custom/CustomTitle";
import { useParams } from "react-router-dom";

const CurrentLevel = () => {
  const { type } = useParams();
  return (
    <>
      <Back to="/level" color="primary.main" />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "space-around", md: "space-between" },
          alignItems: "center",
          bgcolor: "#fff",
          mb: 4,
          p: 1,
        }}
      >
        <CustomTitle
          title="Current Level"
          subtitle="Track,manage and control academic and class activities"
          icon={<SchoolIcon color="inherit" sx={{ width: 50, height: 50 }} />}
          color="primary.main"
        />
        <Typography
          // sx={{ display: { xs: "none", md: "inline-flex" } }}
          variant="h5"
          paragraph
          whiteSpace="nowrap"
        >
          {type}
        </Typography>
      </Box>
      <CurrentLevelTab />
    </>
  );
};

export default CurrentLevel;
