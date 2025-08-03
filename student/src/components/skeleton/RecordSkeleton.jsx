import React from "react";
import {
  Box,
  Skeleton,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import TableSkeleton from "./TableSkeleton";

const RecordSkeleton = () => {
  return (
    <Box p={3}>
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

      {/* Performance Card */}
      <Box p={3} borderRadius={2} boxShadow={1} bgcolor="white" mb={3}>
        <Grid container spacing={2} alignItems="center">
          <Grid>
            <Skeleton variant="circular" width={60} height={60} />
          </Grid>
          <Grid>
            <Skeleton variant="text" width={150} height={25} />
            <Skeleton variant="text" width={100} height={20} />
          </Grid>
          <Grid>
            <Skeleton variant="circular" width={30} height={30} />
          </Grid>
        </Grid>
        <Skeleton variant="text" width="80%" height={15} />
        <Skeleton variant="text" width="60%" height={15} />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={10}
          sx={{ mt: 2, borderRadius: 1 }}
        />

        {/* Score Summary */}
        <Grid container spacing={3} mt={2}>
          <Grid>
            <Skeleton variant="text" width={50} height={25} />
            <Skeleton variant="text" width={80} height={20} />
          </Grid>
          <Grid>
            <Skeleton variant="text" width={50} height={25} />
            <Skeleton variant="text" width={80} height={20} />
          </Grid>
          <Grid>
            <Skeleton variant="text" width={50} height={25} />
            <Skeleton variant="text" width={80} height={20} />
          </Grid>
        </Grid>
      </Box>

      <TableSkeleton />
    </Box>
  );
};

export default RecordSkeleton;

{
  /* Second Section */
}
//   <Box p={3} borderRadius={2} boxShadow={1} bgcolor="white">
//   <Skeleton variant="text" width={150} height={25} />
//   <Skeleton variant="text" width={100} height={20} />

//   {/* Search and Actions */}
//   <Box
//     display="flex"
//     justifyContent="space-between"
//     alignItems="center"
//     mt={2}
//   >
//     <Skeleton
//       variant="rectangular"
//       width={200}
//       height={40}
//       sx={{ borderRadius: 1 }}
//     />
//     <Box display="flex" gap={2}>
//       <Skeleton
//         variant="rectangular"
//         width={120}
//         height={40}
//         sx={{ borderRadius: 1 }}
//       />
//       <Skeleton
//         variant="rectangular"
//         width={120}
//         height={40}
//         sx={{ borderRadius: 1 }}
//       />
//     </Box>
//   </Box>
// </Box>
