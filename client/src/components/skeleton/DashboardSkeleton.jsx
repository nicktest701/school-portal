import React from "react";
import { Box, Skeleton, Grid2 as Grid, Stack } from "@mui/material";

const DashboardSkeleton = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        p: 2,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        {/* Header */}
        <Skeleton variant="text" width="10%" height={40} />
        <Skeleton variant="text" width="30%" height={20} />

        {/* Overview Cards */}
        <Grid container spacing={2} my={2}>
          {[...Array(4)].map((_, index) => (
            <Grid size={{ xs: 6, md: 3 }} key={index}>
              <Skeleton variant="rounded" height={80} />
            </Grid>
          ))}
        </Grid>

        {/* Attendance Details */}
        <Grid container spacing={2} my={3}>
          <Grid size={{ xs: 3, md: 6 }}>
            <Skeleton variant="rounded" height={150} />
          </Grid>
          <Grid size={{ xs: 3, md: 6 }}>
            <Skeleton variant="rounded" height={150} />
          </Grid>
        </Grid>

        {/* Total Daily Attendance */}
        <Skeleton variant="rounded" height={120} mt={3} />

        {/* News & Events */}
        <Skeleton variant="rounded" height={200} mt={3} />

        {/* Calendar Section */}
        <Skeleton variant="rounded" height={350} mt={3} />
      </Box>

      {/* Sidebar Elements */}
      <Box
        sx={{
          width: { xs: 0, sm: 270 },
          // minWidth: { xs: 0, md: 250 },
          display: { xs: "none", md: "block" },
          transition: "all 0.4s ease-in-out",
          position: "sticky",
          top: 0,
          // height:'200svh',
          minHeight: "100svh",
        }}
      >
        <Stack spacing={3} height="100%">
          <Skeleton variant="rounded" height={250} />

          <Skeleton variant="rounded" height={250} />

          <Skeleton variant="rounded" height={250} />
        </Stack>
      </Box>
    </Box>
  );
};

export default DashboardSkeleton;
