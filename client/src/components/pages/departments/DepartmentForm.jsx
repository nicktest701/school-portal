import React from "react";
import { Button, Box, Modal, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/inputs/Input";
import { useEffect } from "react";
import { getAllTeachers } from "@/api/teacherAPI";
import CustomAutoComplete from "@/components/inputs/CustomAutoComplete";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

const schema = yup.object({
  name: yup.string().required("Name is required").max(50),
  initials: yup.string().required("Initials are required").max(500),
  hod: yup.object().nullable(),
});

const DepartmentFormModal = ({ open, onClose, defaultValues, onSubmit }) => {
  const { session } = useAuth();

  const teachers = useQuery({
    queryKey: ["teachers"],
    queryFn: () => getAllTeachers(),
    initialData: [],
    select: (teachers) => {
      const modifiedTeachers = teachers?.map((teacher) => {
        return {
          _id: teacher?._id,
          fullName: teacher?.fullname,
        };
      });
      // console.log(modifiedTeachers);
      return modifiedTeachers;
    },
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues?._id]);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="department-form-modal"
      aria-describedby="department-form-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 500, md: 768 },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6">
            {defaultValues ? "Edit Department" : "New Department"}
          </Typography>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        <form
          onSubmit={handleSubmit((data) => {
            onSubmit({
              ...data,
              hod: data.hod?._id,
              session: session?.sessionId,
            });
            handleClose();
          })}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Input
              label="Name"
              name="name"
              fullWidth
              autoFocus
              control={control}
              size="small"
            />
            <Input
              label="Initials"
              name="initials"
              fullWidth
              autoFocus
              control={control}
              size="small"
            />

            <CustomAutoComplete
              name="hod"
              label="Head of Department"
              control={control}
              data={teachers}
            />

            {/* <Input
              label="Content"
              name="content"
              control={control}
              multiline
              rows={4}
              fullWidth
              size="small"
            /> */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 3,
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                {defaultValues ? "Save Changes" : "Create"}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default DepartmentFormModal;
