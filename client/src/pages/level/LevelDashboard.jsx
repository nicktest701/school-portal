import React from "react";
import ClassIcon from "@mui/icons-material/Class";
import SubjectIcon from "@mui/icons-material/Subject";
import Person3 from "@mui/icons-material/Person3";

import { Box, Divider, Typography } from "@mui/material";
import LevelTab from "./LevelTab";
import useLevel from "@/components/hooks/useLevel";
import CustomTitle from "@/components/custom/CustomTitle";
import level_icon from "@/assets/images/header/level_ico.svg";
import DashboardCard from "@/components/cards/DashboardCard";

const LevelDashboard = () => {
  const { levelSummary } = useLevel();

  return (
    <>
      <CustomTitle
        title="School Levels & Subjects"
        subtitle="Organize and manage different educational levels to streamline curriculum and student progress tracking."
        img={level_icon}
        color="primary.main"
      />
      {/* <Divider /> */}

      <Typography  variant='h5' py={2}>Level Details</Typography>
      <Divider/>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
          gap: 2,
          py: 2,
        }}
      >
        <DashboardCard
          title="Levels"
          value={levelSummary.noOfLevels}
          icon={
            <SubjectIcon
              sx={{
                width: 30,
                height: 30,
                color: "secondary.main",
              }}
            />
          }
        />
        <DashboardCard
          title="Courses Offered"
          value={levelSummary.noOfSubjects}
          icon={
            <ClassIcon
              sx={{
                width: 30,
                height: 30,
                color: "secondary.main",
              }}
            />
          }
        />
        <DashboardCard
          title="Assigned Teachers"
          value={levelSummary.noOfAssignedTeachers}
          icon={
            <Person3
              sx={{
                width: 30,
                height: 30,
                color: "secondary.main",
              }}
            />
          }
        />
      </Box>

      <LevelTab />
    </>
  );
};

export default LevelDashboard;
