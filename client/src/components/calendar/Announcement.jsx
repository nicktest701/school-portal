// Announcement.tsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Modal,
} from "@mui/material";
import _ from "lodash";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllAnnouncements } from "@/api/announcementAPI";
import dayjs from "dayjs";

const Announcement = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const { data: announcements } = useQuery({
    queryKey: ["announcements"],
    queryFn: () => getAllAnnouncements(),
    initialData: [],
  });

  const handleOpenModal = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const handleCloseModal = () => {
    setSelectedAnnouncement(null);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {_.take(announcements, 5).map((announcement) => (
          <Grid item key={announcement._id}>
            <Card
              sx={{
                backgroundColor: announcement.bgColor,
                borderRadius: 2,
                cursor: "pointer",
              }}
              onClick={() => handleOpenModal(announcement)}
            >
              <CardContent>
                <Typography variant="body1" fontWeight="bold">
                  {announcement.title}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {dayjs(announcement.createdAt).format("D MMMM, YYYY")}
                </Typography>
                <Typography variant="body2" mt={1}>
                  {announcement.description.substring(0, 50)}...
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* View More Button */}
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Link to={"/announcements"}>View More</Link>
      </Box>

      {/* Announcement Details Modal */}
      <Modal open={Boolean(selectedAnnouncement)} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {selectedAnnouncement && (
            <>
              <Typography variant="h6" fontWeight="bold">
                {selectedAnnouncement.title}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {dayjs(selectedAnnouncement.createdAt).format("D MMMM, YYYY")}
              </Typography>
              <Typography variant="body1" mt={2}>
                {selectedAnnouncement.description}
              </Typography>
              <Box sx={{ textAlign: "right", mt: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Announcement;
