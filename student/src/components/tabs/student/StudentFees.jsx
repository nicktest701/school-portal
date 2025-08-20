import { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import StudentFeeReportListItem from "@/components/list/StudentFeeReportListItem";
import { NoteAlt, SearchRounded } from "@mui/icons-material";
import EmptyDataContainer from "@/components/EmptyDataContainer";
import { getStudent } from "@/api/studentAPI";
import { useAuth } from "@/context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import ListItemSkeleton from "@/components/skeleton/ListItemSkeleton";
const StudentFees = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: fees, isPending } = useQuery({
    queryKey: ["student-profile", user?._id],
    queryFn: () => getStudent(user?._id),
    enabled: !!user?._id,
    initialData: {
      fees: [],
    },
    select: (data) => data.fees,
  });

  if (isPending) {
    return (
      <ListItemSkeleton
        title=" Payments"
        subtitle="  View your fees history, payments, and outstanding balances below."
      />
    );
  }

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
          <NoteAlt fontSize="large" />
          Payments
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
          View your fees history, payments, and outstanding balances below.
        </Typography>
      </Box>

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
              return <StudentFeeReportListItem key={index} item={fee} />;
            })}
          </>
        ) : (
          <EmptyDataContainer message="No Fees History Available" />
        )}
      </Stack>
    </Box>
  );
};

export default StudentFees;
