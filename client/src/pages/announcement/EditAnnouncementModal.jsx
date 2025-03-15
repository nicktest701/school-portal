// EditAnnouncementModal.tsx
import React, { use } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  CircularProgress,
  Modal,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnnouncement, putAnnouncement } from "@/api/announcementAPI";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";

// Validation Schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required").min(3),
  description: Yup.string().required("Description is required").min(10),
  priority: Yup.string()
    .oneOf(["high", "medium", "low", "default"])
    .required("Priority is required"),
});

const EditAnnouncementModal = ({ onClose }) => {
  const { schoolSessionDispatch } = use(SchoolSessionContext);
  const [searchParams] = useSearchParams();
  const announcementId = searchParams.get("_id");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetching announcement by ID using React Query
  const {
    data: announcement,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["announcement", announcementId],
    queryFn: () => getAnnouncement(announcementId),
    enabled: !!announcementId, // Fetch only if id exists
    initialData: queryClient.getQueryData(
      ["announcements"].find((ann) => ann._id === announcementId)
    ),
  });

  // Mutation for updating the announcement
  const mutation = useMutation({
    mutationFn: putAnnouncement,
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      schoolSessionDispatch(alertSuccess("Announcement Updated!"));
    },

    onSettled: () => {
      queryClient.invalidateQueries(["announcements"]);
    },

    onError: (error) => {
      schoolSessionDispatch(alertError(error));
    },
  });

  // Formik Hook
  const formik = useFormik({
    initialValues: {
      title: announcement?.title || "",
      description: announcement?.description || "",
      priority: announcement?.priority || "medium",
    },
    enableReinitialize: true, // Important for setting data after fetch
    validationSchema,
    onSubmit: (values) => {
      mutation.mutate({
        ...values,
        bgColor: getPriorityColor(values.priority),
        _id: announcementId,
      });
    },
  });

  // Map priority to background colors
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#ffcccb"; // Red shade
      case "medium":
        return "#fff3cd"; // Yellow shade
      case "low":
        return "#d4edda"; // Green shade
      case "default":
        return "#ffffff"; // Green shade
      default:
        return "#ffffff"; // Default white
    }
  };

  return (
    <Modal open={Boolean(searchParams.get("_id"))} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
          borderRadius: 2,
          width: { xs: 300, md: 500 },
        }}
      >
        {isPending ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Typography color="error">Failed to fetch announcement</Typography>
        ) : (
          <>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Edit Announcement
            </Typography>

            {/* Form */}
            <form onSubmit={formik.handleSubmit}>
              {/* Title Field */}
              <TextField
                fullWidth
                margin="normal"
                label="Title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />

              {/* Description Field */}
              <TextField
                fullWidth
                margin="normal"
                label="Description"
                multiline
                rows={4}
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />

              {/* Priority Select */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Priority</InputLabel>
                <Select
                  name="priority"
                  value={formik.values.priority}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.priority && Boolean(formik.errors.priority)
                  }
                >
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
                {formik.touched.priority && formik.errors.priority && (
                  <FormHelperText error>
                    {formik.errors.priority}
                  </FormHelperText>
                )}
              </FormControl>

              {/* Submit Button */}
              <Box sx={{ textAlign: "right", mt: 2 }}>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() => navigate("/announcements")}
                  sx={{ mr: 2 }}
                  disabled={mutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  loading={mutation.isPending}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {mutation.isPending ? "Updating..." : "Save Changes"}
                </Button>
              </Box>
            </form>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default EditAnnouncementModal;
