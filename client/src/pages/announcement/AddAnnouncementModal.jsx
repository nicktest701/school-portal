// AddAnnouncementModal.tsx
import React, { use } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormHelperText,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import { postAnnouncement } from "@/api/announcementAPI";
import { UserContext } from "@/context/providers/UserProvider";

// Validation schema using Yup
const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  //   date: Yup.string().required("Date is required"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  priority: Yup.string().required("Priority is required"),
});

const AddAnnouncementModal = ({ open, onClose }) => {
  const queryClient = useQueryClient();
  const { session } = use(UserContext);
  const { schoolSessionDispatch } = use(SchoolSessionContext);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: postAnnouncement,
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      priority: "default",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutateAsync(
        {
          ...values,
          bgColor: getPriorityColor(values.priority),
          session: session?.sessionId,
          term: session?.termId,
        },
        {
          onSettled: () => {
            queryClient.invalidateQueries(["announcements"]);
          },
          onSuccess: () => {
            schoolSessionDispatch(alertSuccess("Announcement Created"));
            formik.resetForm();
            onClose();
          },
          onError: (error) => {
            schoolSessionDispatch(alertError(error));
          },
        }
      );
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
    <Modal open={open} onClose={onClose}>
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
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Add New Announcement
        </Typography>

        {/* Form Section */}
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

          {/* Date Field */}
          {/* <TextField
            fullWidth
            margin="normal"
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
          /> */}

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
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />

          {/* Priority Select */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={formik.values.priority}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.priority && Boolean(formik.errors.priority)}
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="default">Default</MenuItem>
            </Select>
            {formik.touched.priority && formik.errors.priority && (
              <FormHelperText error>{formik.errors.priority}</FormHelperText>
            )}
          </FormControl>

          {/* Form Actions */}
          <Box
            sx={{
              textAlign: "right",
              mt: 2,
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Button
              onClick={onClose}
              disabled={isPending}
              color="secondary"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              loading={isPending}
              type="submit"
              variant="contained"
              color="primary"
              disabled={!formik.isValid || !formik.dirty}
            >
              Create
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddAnnouncementModal;
