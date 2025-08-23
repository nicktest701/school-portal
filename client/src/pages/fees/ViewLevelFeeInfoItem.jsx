import { Stack, Typography } from "@mui/material";
import React from "react";

function ViewLevelFeeInfoItem({ title, value }) {
  return (
    <Stack>
      <Typography variant="caption" color="primary" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Stack>
  );
}

export default ViewLevelFeeInfoItem;
