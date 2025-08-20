import { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import StudentFeeReportListItem from "@/components/list/StudentFeeReportListItem";
import { SearchRounded } from "@mui/icons-material";
const StudentFees = ({ levelId, fees }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);
  };

  // Flatten and filter the data
  const filteredItems = fees?.map((items) => {
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
        Fees History
      </Typography>
      <TextField
        label="Search for fees"
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
            {filteredItems?.map((fee, index) => {
              return (
                <StudentFeeReportListItem
                  key={index}
                  item={fee}
                  levelId={levelId}
                />
              );
            })}
          </>
        ) : (
          <div>No Fees History Available</div>
        )}
      </Stack>
    </Box>
  );
};

export default StudentFees;
