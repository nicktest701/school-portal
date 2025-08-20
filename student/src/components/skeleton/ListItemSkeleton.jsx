import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { StackedLineChart } from "@mui/icons-material";
function ListItemSkeleton({ title, subtitle }) {
  return (
    <Box sx={{ minHeight: "100svh", pt: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            color: (theme) => theme.palette.primary.dark,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <StackedLineChart fontSize="large" />
          {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
          {subtitle}
        </Typography>
      </Box>

      <Skeleton variant="rounded" width="100%" height={30} />

      <Box
        sx={{
          border: "1px solid whitesmoke",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          p: 1,
          my: 2,
        }}
      >
        <Skeleton variant="text" width={100} height={30} />
      </Box>
      <Skeleton variant="text" width={60} height={30} />
      <Skeleton variant="text" width={30} height={30} />
      <Box
        sx={{
          border: "1px solid whitesmoke",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          p: 1,
          my: 2,
        }}
      >
        <Skeleton variant="text" width={100} height={30} />
      </Box>
      <Skeleton variant="text" width={60} height={30} />
      <Skeleton variant="text" width={30} height={30} />
    </Box>
  );
}

export default ListItemSkeleton;
