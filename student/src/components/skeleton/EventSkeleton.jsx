import React from "react";
import {
  Box,
  Skeleton,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

export default function EventSkeleton() {
  return (
    <Box sx={{ width: "90%", margin: "auto", mt: 3 }}>
      {/* Header Section */}
      <Box mb={3}>
        <Card>
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box>
              <Skeleton variant="text" width={150} height={30} />
              <Skeleton variant="text" width={300} height={20} />
            </Box>

            <Skeleton variant="circular" width={24} height={24} />
          </CardContent>
        </Card>
      </Box>

      {/* Search & Sort Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Skeleton variant="rounded" width={200} height={40} />
        <Skeleton variant="rounded" width={100} height={40} />
      </Box>

      {/* Event Cards Skeleton */}
      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5].map((index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Skeleton variant="text" width="40%" height={25} />
                <Skeleton variant="text" width="60%" height={20} />
                <Skeleton variant="text" width="80%" height={20} />
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Skeleton variant="text" width="20%" height={15} />
                  <Skeleton variant="text" width="30%" height={15} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Skeleton */}
      <Box display="flex" justifyContent="center" mt={3}>
        {[1, 2, 3].map((index) => (
          <Skeleton
            key={index}
            variant="circular"
            width={30}
            height={30}
            sx={{ mx: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
}
