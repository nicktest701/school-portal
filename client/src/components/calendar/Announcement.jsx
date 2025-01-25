// Announcement.tsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Stack,
  CardContent,
  Button,
  Modal,
  Grid2,
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
      {announcements.length !== 0 ? (
        <>
          <Grid2 container spacing={2} pt={1} sx={{ minHeight: 400 }}>
            {_.take(announcements, 5).map((announcement) => (
              <Grid2 item xs={12} key={announcement._id} sx={{ width: "100%" }}>
                <Card
                  sx={{
                    borderLeft: `2px solid ${announcement.bgColor}`,
                    // backgroundColor: announcement.bgColor,
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
                    <Typography variant="caption" display="block" mt={1}>
                      {announcement.description.substring(0, 50)}...
                    </Typography>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>

          {/* View More Button */}
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Link
              to={"/announcements"}
              style={{ fontSize: "12px", color: "var(--primary-color)" }}
            >
              View More
            </Link>
          </Box>
        </>
      ) : (
        <Stack
          sx={{ minHeight: 250 }}
          justifyContent="center"
          alignItems="center"
        >
          <Typography>No Announcement </Typography>
        </Stack>
      )}

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
            minWidth: 320,
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
