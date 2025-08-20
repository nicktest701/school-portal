import { Box, Typography, Stack } from "@mui/material";
import React from "react";

function Circle({ label, value, color, m }) {
  return (
    <Stack justifyContent="space-between" alignItems="center" spacing={3}>
      <Box
        sx={{
          width: { xs: 100, sm: 120, md: 140 },
          height: { xs: 100, sm: 120, md: 140 },
          borderRadius: "50%",
          bgcolor: color || "primary.main",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: m,
        }}
      >
        <Typography textAlign="center" fontSize={20} color="#fff">
          {value}
        </Typography>
      </Box>
      <Typography>{label}</Typography>
    </Stack>
  );
}

export default Circle;
