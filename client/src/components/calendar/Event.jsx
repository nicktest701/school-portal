import React from "react";
import { Box, Typography, Card, CardContent, Grid, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import _ from "lodash";
import { getAllEvents } from "@/api/eventAPI";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const Event = () => {
  const navigate = useNavigate();

  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: () => getAllEvents(),
    initialData: [],
  });

  const handleOpenModal = (id) => {
    navigate(`/events/${id}`);
  };

  return (
    <Box>
      {events.length !== 0 ? (
        <>
          <Grid container spacing={2}>
            {_.take(events, 5).map((event) => (
              <Grid item xs={12} key={event._id}>
                <Card
                  sx={{
                    borderTop: `2px solid #d4edda`,
                    borderRadius: 2,
                    cursor: "pointer",
                  }}
                  onClick={() => handleOpenModal(event._id)}
                >
                  <CardContent>
                    <Typography variant="body1" fontWeight="bold">
                      {event.title}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {dayjs(event.createdAt).format("D MMMM, YYYY")}
                    </Typography>
                    <Typography variant="caption" display="block" mt={1}>
                      {event.caption}...
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* View More Button */}
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Link to="/events">View More</Link>
          </Box>
        </>
      ) : (
        <Stack
          sx={{ minHeight: 250 }}
          justifyContent="center"
          alignItems="center"
        >
          <Typography>No Birthday Today</Typography>
        </Stack>
      )}
    </Box>
  );
};

export default Event;
