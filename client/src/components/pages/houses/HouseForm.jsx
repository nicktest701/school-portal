import React from "react";
import {
  Button,
  Box,
  FormControl,
  InputLabel,
  Modal,
  Typography,
  IconButton,
} from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/inputs/Input";
import { useEffect } from "react";
import CustomAutoComplete from "@/components/inputs/CustomAutoComplete";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getAllTeachers } from "@/api/teacherAPI";

const schema = yup.object({
  name: yup.string().required("Name is required").max(50),
  initials: yup.string().required("Initials are required").max(500),
  master: yup.object().nullable(),
  color: yup.string().required("Color is required"),
});

const colors = [
  "#ffc09f",
  "#fff9c4",
  "#edf6f9",
  "#ffcdd2",
  "#c5cae9",
  "#5e747f",
  "#7B9E87",
  "#E29578",
  "#FFDDD2",
  "#83C5BE",
];

const HouseFormModal = ({ open, onClose, defaultValues, onSubmit }) => {
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

  const { control, handleSubmit, reset, watch, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || { color: "#ffc09f" },
  });

  const handleChange = (_event, newColor) => {
    if (newColor !== null) {
      setValue("color", newColor);
    }
  };

  const colorWatch = watch("color", colors[0]);

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
      aria-labelledby="house-form-modal"
      aria-describedby="house-form-modal-description"
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
            {defaultValues ? "Edit House" : "New House"}
          </Typography>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        <form
          onSubmit={handleSubmit((data) => {
            onSubmit({
              ...data,
              master: data.master?._id,
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
              name="master"
              label="House Master"
              control={control}
              data={teachers}
            />
            <FormControl fullWidth>
              <InputLabel>Select Color</InputLabel>

              <ToggleButtonGroup
                value={colorWatch}
                exclusive
                onChange={handleChange}
                aria-label="color palette"
                sx={{
                  mt: 6,
                }}
              >
                {colors.map((color) => (
                  <ToggleButton
                    key={color}
                    value={color}
                    sx={{
                      backgroundColor: color,
                      width: 40,
                      height: 30,
                      border: "1px solid #ccc",
                      display: "flex",
                      flexDirection: "column",
                      fontSize: 10,
                      borderColor:
                        colorWatch === color ? "var(--primary)" : "none",
                    }}
                  >
                    <span style={{ fontSize: 15 }}>
                      {colorWatch === color && "✔"}
                    </span>
                    {/* {colorWatch === color && <span> {colorWatch}</span>} */}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </FormControl>

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

export default HouseFormModal;
