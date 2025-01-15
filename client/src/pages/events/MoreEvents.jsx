// MoreEvents.tsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Pagination,
} from "@mui/material";
import dayjs from "dayjs";
import CustomTitle from "@/components/custom/CustomTitle";
import exams_icon from "../../assets/images/header/exams_ico.svg";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "@/api/eventAPI";

const pageSize = 6;
const MoreEvents = () => {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: () => getAllEvents(),
    initialData: [],
  });

  const handleViewEvent = (id) => {
    navigate(`/events/${id}?redirect_to=/events`, {
      state: {
        prevPath: "/events",
      },
    });
  };
  const handleFilterChange = (event) => setFilter(event.target.value);
  const handleSearchChange = (event) =>
    setSearchTerm(event.target.value.toLowerCase());
  const handlePageChange = (_, value) => setPage(value);

  console.log(events);

  // Filter events based on date
  const filterEventsByDate = () => {
    const today = dayjs();
    switch (filter) {
      case "today":
        return events.filter((a) => dayjs(a?.createdAt).isSame(today, "day"));
      case "yesterday":
        return events.filter((a) =>
          dayjs(a?.createdAt).isSame(today.subtract(1, "day"), "day")
        );
      case "thisWeek":
        return events.filter((a) => dayjs(a?.createdAt).isSame(today, "week"));
      case "lastWeek":
        return events.filter((a) =>
          dayjs(a?.createdAt).isSame(today.subtract(1, "week"), "week")
        );
      case "thisMonth":
        return events.filter((a) => dayjs(a?.createdAt).isSame(today, "month"));
      case "lastMonth":
        return events.filter((a) =>
          dayjs(a?.createdAt).isSame(today.subtract(1, "month"), "month")
        );
      default:
        return events;
    }
  };

  // Apply both search and date filters
  const filteredEvents = filterEventsByDate().filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm) ||
      event.date.includes(searchTerm)
  );

  // Pagination Logic
  const paginatedEvents = filteredEvents.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  const totalPages = Math.ceil(filteredEvents.length / pageSize);

  return (
    <Box sx={{ px: 4 }}>
      <CustomTitle
        title="Events"
        subtitle="Organize and oversee exams, schedule, and results to ensure a fair and efficient examination process."
        img={exams_icon}
        color="primary.main"
      />

      {/* MUI Select for Filtering */}
      <Box
        sx={{
          py: 3,
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <TextField
          label="Search for event"
          variant="outlined"
          // size=''
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1, maxWidth: { xs: "100%", sm: 300 } }}
        />
        <FormControl
          sx={{
            minWidth: 200,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <InputLabel>Sort by</InputLabel>
          <Select
            value={filter}
            onChange={handleFilterChange}
            // size="small"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="yesterday">Yesterday</MenuItem>
            <MenuItem value="thisWeek">This Week</MenuItem>
            <MenuItem value="lastWeek">Last Week</MenuItem>
            <MenuItem value="thisMonth">This Month</MenuItem>
            <MenuItem value="lastMonth">Last Month</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Events List */}
      <Grid container spacing={2} sx={{ height: "60svh", overflowY: "auto" }}>
        {paginatedEvents.length > 0 ? (
          paginatedEvents.map((event) => (
            <Grid item xs={12} key={event.id}>
              <Card
                sx={{
                  backgroundColor: event.bgColor,
                  borderRadius: 0,
                  cursor: "pointer",
                }}
                onClick={() => handleViewEvent(event._id)}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {event.title}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {event.createdAt}
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    {event.description.substring(0, 50)}...
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",

              display: "flex",
              justifyContent: "center",
              mx: "auto",
            }}
          >
            {" "}
            <Typography>No events found.</Typography>
          </Box>
        )}
      </Grid>

      {/* Pagination Component */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          variant="outlined"
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default MoreEvents;
