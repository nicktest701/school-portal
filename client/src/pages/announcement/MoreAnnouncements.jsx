// MoreAnnouncements.tsx
import React, { useContext, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Modal,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Pagination,
  IconButton,
  Checkbox,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import CustomTitle from "@/components/custom/CustomTitle";
import exams_icon from "../../assets/images/header/exams_ico.svg";
import { Add } from "@mui/icons-material";
import AddAnnouncementModal from "./AddAnnouncementModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteAnnouncement,
  deleteAnnouncements,
  getAllAnnouncements,
} from "@/api/announcementAPI";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "@/context/providers/UserProvider";
import Swal from "sweetalert2";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";
import { AnimatePresence } from "framer-motion";
import EditAnnouncementModal from "./EditAnnouncementModal";

const pageSize = 6;
const MoreAnnouncements = () => {
  const { user } = useContext(UserContext);
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("_title") || ""
  );
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [openAddAnnouncement, setOpenAddAnnouncement] = useState(false);
  const [page, setPage] = useState(1);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedAnnouncements, setSelectedAnnouncements] = useState([]);

  const { data: announcements } = useQuery({
    queryKey: ["announcements"],
    queryFn: () => getAllAnnouncements(),
    initialData: [],
  });

  // const handleOpenModal = (announcement) =>
  //   setSelectedAnnouncement(announcement);
  const handleCloseModal = () => setSelectedAnnouncement(null);
  const handleFilterChange = (event) => setFilter(event.target.value);
  const handleSearchChange = (event) =>
    setSearchTerm(event.target.value.toLowerCase());
  const handlePageChange = (_, value) => setPage(value);

  //
  const handleOpenAddAnnouncement = () => setOpenAddAnnouncement(true);
  const handleCloseAddAnnouncement = () => setOpenAddAnnouncement(false);

  const handleOpenEditAnnouncement = (id) => {
    setSearchParams((params) => {
      params.set("_id", id);
      return params;
    });
  };
  const handleCloseEditAnnouncement = () => {
    setSearchParams((params) => {
      params.delete("_id");
      return params;
    });
  };

  const sortedAnnouncement = useMemo(() => {
    const filterAnnouncementsByDate = () => {
      const today = dayjs();
      switch (filter) {
        case "today":
          return announcements.filter((a) =>
            dayjs(a.createdAt).isSame(today, "day")
          );
        case "yesterday":
          return announcements.filter((a) =>
            dayjs(a.createdAt).isSame(today.subtract(1, "day"), "day")
          );
        case "thisWeek":
          return announcements.filter((a) =>
            dayjs(a.createdAt).isSame(today, "week")
          );
        case "lastWeek":
          return announcements.filter((a) =>
            dayjs(a.createdAt).isSame(today.subtract(1, "week"), "week")
          );
        case "thisMonth":
          return announcements.filter((a) =>
            dayjs(a.createdAt).isSame(today, "month")
          );
        case "lastMonth":
          return announcements.filter((a) =>
            dayjs(a.createdAt).isSame(today.subtract(1, "month"), "month")
          );
        default:
          return announcements;
      }
    };

    // Apply both search and date filters
    const filteredAnnouncements = filterAnnouncementsByDate().filter(
      (announcement) =>
        announcement.title.toLowerCase().includes(searchTerm) ||
        announcement.createdAt.includes(searchTerm)
    );

    // Pagination Logic
    const paginatedAnnouncements = filteredAnnouncements.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    const totalPages = Math.ceil(filteredAnnouncements.length / pageSize);

    return {
      announcements: paginatedAnnouncements,
      total: filteredAnnouncements.length,
      totalPages,
    };
  }, [announcements, searchTerm, searchParams, filter, page]);
  // Filter announcements based on date

  // Toggle checkbox selection
  const handleSelect = (id) => {
    setSelectedAnnouncements((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: deleteAnnouncement,
  });

  const handleDeleteAnnouncement = (id) => {
    Swal.fire({
      title: "Removing Announcements",
      text: `You are about to remove the selected announcements.Changes cannot be undone.`,
      showCancelButton: true,
    }).then(({ isConfirmed }) => {
      // const announcements = _.map(selectedAnnouncements, "_id");

      if (isConfirmed) {
        mutateAsync(id, {
          onSettled: () => {
            queryClient.invalidateQueries(["announcements"]);
          },
          onSuccess: (data) => {
            schoolSessionDispatch(alertSuccess(data));
          },
          onError: (error) => {
            schoolSessionDispatch(alertError(error));
          },
        });
      }
    });
  };

  const multipleDeleteAnnouncements = useMutation({
    mutationFn: deleteAnnouncements,
  });
  const handleDeleteAnnouncements = () => {
    Swal.fire({
      title: "Removing Announcements",
      text: `You are about to remove the selected announcements.Changes cannot be undone.`,
      showCancelButton: true,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        multipleDeleteAnnouncements.mutateAsync(
          {
            announcements: selectedAnnouncements,
          },
          {
            onSettled: () => {
              queryClient.invalidateQueries(["announcements"]);
            },
            onSuccess: (data) => {
              schoolSessionDispatch(alertSuccess(data));
              setSelectedAnnouncements([]);
            },
            onError: (error) => {
              schoolSessionDispatch(alertError(error));
            },
          }
        );
      }
    });
  };

  return (
    <Box sx={{ px: 4 }}>
      <CustomTitle
        title="Announcements"
        subtitle="Organize and oversee exams, schedule, and results to ensure a fair and efficient examination process."
        img={exams_icon}
        color="primary.main"
        right={
          <>
            {user?.role === "administrator" ? (
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleOpenAddAnnouncement}
              >
                New Announcement
              </Button>
            ) : null}
          </>
        }
      />

      {/* MUI Select for Filtering */}
      <Box
        sx={{
          py: 3,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <TextField
          label="Search for announcement"
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

        {user?.role === "administrator" && selectedAnnouncements.length > 0 && (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <IconButton
              // color="error"
              onClick={handleDeleteAnnouncements}
              size="large"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Announcements List */}
      {selectedAnnouncements.length > 0 && (
        <Typography gutterBottom p={2} bgcolor="lightgray">
          {selectedAnnouncements.length} Announcements Selected
        </Typography>
      )}
      <AnimatePresence>
        <Grid container spacing={2} sx={{ height: "60svh", overflowY: "auto" }}>
          {sortedAnnouncement.announcements.length > 0 ? (
            sortedAnnouncement.announcements.map((announcement, index) => (
              <Grid item xs={12} key={announcement._id}>
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card
                    sx={{
                      backgroundColor: announcement.bgColor,
                      borderRadius: 0,
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": { boxShadow: 6 },
                    }}
                    onMouseEnter={() => setHoveredCard(announcement._id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    // onClick={() => handleOpenModal(announcement)}
                  >
                    {/* Checkbox for selection */}
                    {user?.role === "administrator" && (
                      <Checkbox
                        checked={selectedAnnouncements.includes(
                          announcement._id
                        )}
                        onChange={() => handleSelect(announcement._id)}
                        sx={{ position: "absolute", top: 8, left: 8 }}
                      />
                    )}
                    <CardContent sx={{ px: 8 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {announcement.title}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {dayjs(announcement.createdAt).format("D MMMM, YYYY")}
                      </Typography>
                      <Typography variant="body2" mt={1}>
                        {announcement.description}
                      </Typography>
                    </CardContent>
                    {/* Show Edit and Delete Icons on Hover */}

                    {user?.role === "administrator" ? (
                      <>
                        {hoveredCard === announcement._id && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              display: "flex",
                              gap: 1,
                            }}
                          >
                            <IconButton
                              // color="primary"
                              onClick={() =>
                                handleOpenEditAnnouncement(announcement._id)
                              }
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              // color="error"
                              onClick={() =>
                                handleDeleteAnnouncement(announcement._id)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        )}
                      </>
                    ) : null}
                  </Card>
                </motion.div>
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
              <Typography>No announcements found.</Typography>
            </Box>
          )}
        </Grid>
      </AnimatePresence>

      {/* Pagination Component */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          variant="outlined"
          count={sortedAnnouncement.totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
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
                {selectedAnnouncement.date}
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

      <AddAnnouncementModal
        open={openAddAnnouncement}
        onClose={handleCloseAddAnnouncement}
      />
      <EditAnnouncementModal onClose={handleCloseEditAnnouncement} />

      {(multipleDeleteAnnouncements.isLoading || isLoading) && (
        <LoadingSpinner value="Removing Announcement.Please Wait.." />
      )}
    </Box>
  );
};

export default MoreAnnouncements;
