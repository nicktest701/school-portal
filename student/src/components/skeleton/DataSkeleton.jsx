import React from "react";
import {
  Box,
  Skeleton,
  Card,
  CardContent,
} from "@mui/material";
import TableSkeleton from "./TableSkeleton";

function DataSkeleton() {
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

      <TableSkeleton />
    </Box>
  );
}

export default DataSkeleton;
