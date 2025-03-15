import React from "react";
import {
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const TableSkeleton = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const columns = matches
    ? [
        "Index Number",
        "Student",
        "Subject",
        "Class Score",
        "Exams Score",
        "Total Score",
        "Grade",
        "Remarks",
        "Action",
      ]
    : ["Index Number", "Student", "Subject"];

  return (
    <Card>
      <CardContent>
        <Box p={3}>
          {/* Header Section */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            p={2}
            sx={{ background: "#f8f9fa", borderRadius: 2 }}
          >
            <Box>
              <Skeleton variant="text" width={200} height={30} />
              <Skeleton variant="text" width={350} height={20} />
            </Box>
            <Skeleton variant="rectangular" width={120} height={40} />
          </Box>

          {/* Search and Actions */}
          {matches && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Skeleton
                variant="rectangular"
                width={250}
                height={40}
                sx={{ borderRadius: 1 }}
              />
              <Box display="flex" gap={2}>
                <Skeleton
                  variant="rectangular"
                  width={150}
                  height={40}
                  sx={{ borderRadius: 1 }}
                />
                <Skeleton
                  variant="rectangular"
                  width={150}
                  height={40}
                  sx={{ borderRadius: 1 }}
                />
              </Box>
            </Box>
          )}

          {/* Table Section */}
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              {/* Table Head */}
              <TableHead>
                <TableRow>
                  {columns.map((header, index) => (
                    <TableCell key={index}>
                      <Skeleton variant="text" width="80%" height={20} />
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {/* Table Body */}
              <TableBody>
                {[...Array(5)].map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {[...Array(matches ? 9 : 3)].map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <Skeleton variant="text" width="70%" height={20} />
                      </TableCell>
                    ))}
                    {matches && (
                      <TableCell>
                        <Skeleton
                          variant="rectangular"
                          width={100}
                          height={35}
                          sx={{ borderRadius: 1 }}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Skeleton variant="text" width={150} height={25} />
            <Box display="flex" gap={2}>
              <Skeleton
                variant="rectangular"
                width={40}
                height={30}
                sx={{ borderRadius: 1 }}
              />
              <Skeleton
                variant="rectangular"
                width={40}
                height={30}
                sx={{ borderRadius: 1 }}
              />
              <Skeleton
                variant="rectangular"
                width={40}
                height={30}
                sx={{ borderRadius: 1 }}
              />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TableSkeleton;
