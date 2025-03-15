import SchoolIcon from "@mui/icons-material/School";
import { Typography } from "@mui/material";
import CurrentLevelTab from "./CurrentLevelTab";
import Back from "@/components/Back";
import CustomTitle from "@/components/custom/CustomTitle";
import { useParams } from "react-router-dom";
import useLevelById from "@/components/hooks/useLevelById";

const CurrentLevel = () => {
  const { id } = useParams();
  const { levelName } = useLevelById(id);
  return (
    <>
      <Back to="/level" color="primary.main" />

      <CustomTitle
        title="Current Level"
        subtitle="Track,manage and control academic and class activities"
        icon={<SchoolIcon color="inherit" sx={{ width: 50, height: 50 }} />}
        color="primary.main"
        right={
          <Typography variant="h5" whiteSpace="nowrap" pr={2}>
            {levelName}
          </Typography>
        }
      />

      <CurrentLevelTab />
    </>
  );
};

export default CurrentLevel;
