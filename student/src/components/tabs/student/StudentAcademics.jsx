import React, { useState } from "react";
import {
  Box,
  InputAdornment,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import StudentAcademicReportListItem from "@/components/list/StudentAcademicReportListItem";
import { SearchRounded, StackedLineChart } from "@mui/icons-material";
import EmptyDataContainer from "@/components/EmptyDataContainer";
import { getStudent } from "@/api/studentAPI";
import { useAuth } from "@/context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import ListItemSkeleton from "@/components/skeleton/ListItemSkeleton";

const StudentAcademics = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: exams, isPending } = useQuery({
    queryKey: ["student-profile", user?._id],
    queryFn: () => getStudent(user?._id),
    enabled: !!user?._id,
    initialData: {
      exams: [],
    },
    select: (data) => {
      return data?.exams;
    },
  });

  if (isPending) {
    return (
      <ListItemSkeleton
        title=" Records"
        subtitle="  View your exam results, grades, and academic progress for each session
          below."
      />
    );
  }

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);
  };

  // Flatten and filter the data
  const filteredItems = exams?.map((items) => {
    const selectedItems = items[1].filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm)
      )
    );

    return [items[0], selectedItems];
  });

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
          Records
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
          View your exam results, grades, and academic progress for each session
          below.
        </Typography>
      </Box>

      <TextField
        label="Search for record"
        variant="outlined"
        fullWidth
        size="small"
        margin="normal"
        onChange={handleSearchChange}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <SearchRounded />
              </InputAdornment>
            ),
          },
        }}
      />
      <Stack spacing={2} pt={2} sx={{ height: "50svh", overflowY: "auto" }}>
        {filteredItems !== undefined ? (
          <>
            {filteredItems?.map((session, index) => {
              return (
                <StudentAcademicReportListItem key={index} item={session} />
              );
            })}
          </>
        ) : (
          <EmptyDataContainer message="No Academic Records Available" />
        )}
      </Stack>
      {/* <ViewExamsRecord /> */}
    </Box>
  );
};

export default StudentAcademics;
