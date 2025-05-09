import React, { useState } from "react";
import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import StudentAcademicReportListItem from "@/components/list/StudentAcademicReportListItem";
import ViewExamsRecord from "@/pages/examination/ViewExamsRecord";
import { SearchRounded } from "@mui/icons-material";

const StudentAcademics = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);
  };

  // Flatten and filter the data
  const filteredItems = data?.map((items) => {
    const selectedItems = items[1].filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm)
      )
    );

    return [items[0], selectedItems];
  });

  return (
    <Box sx={{ minHeight: "70svh" }}>
      <Typography
        variant="h5"
        color="primary.main"
        bgcolor="lightgray"
        p={1}
        sx={{ fontWeight: "bold", width: "100%" }}
      >
         Academic Records
      </Typography>
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
          <div>No Academic Records Available</div>
        )}
      </Stack>
      <ViewExamsRecord />
    </Box>
  );
};

export default StudentAcademics;
