import { CheckRounded } from "@mui/icons-material";
import { Avatar, LinearProgress, Stack, Typography } from "@mui/material";
import React from "react";

function CustomStepperItem({ initValue, title, isCompleted, showProgress }) {
  return (
    <>
      <Stack justifyContent="center" alignItems="çenter">
        <Avatar
          sx={{
            alignSelf: "center",
            mb: 1,
            bgcolor: isCompleted ? "success.main" : null,
          }}
        >
          {isCompleted ? <CheckRounded /> : initValue}
        </Avatar>
        <Typography variant='caption' textAlign='center'>{title}</Typography>
      </Stack>
      {showProgress && (
        <LinearProgress
          variant="determinate"
          sx={{
            width: 80,
            borderRadius: 1,
            bgcolor: isCompleted ? "success.main" : null,
          }}
          color={isCompleted ? "success" : "primary"}
          value={isCompleted ? 100 : 0}
        />
      )}
    </>
  );
}

export default CustomStepperItem;
