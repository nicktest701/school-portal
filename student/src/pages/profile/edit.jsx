import React, { useEffect, useState } from "react";
import {
  Button,
  Autocomplete,
  Avatar,
  DialogActions,
  DialogContent,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";

import { getStudent, putStudent } from "@/api/studentAPI";
import CustomFormControl from "@/components/inputs/CustomFormControl";
import CustomDatePicker from "@/components/inputs/CustomDatePicker";
import CustomImageChooser from "@/components/inputs/CustomImageChooser";
import { useAlert } from "@/context/AlertProvider";
import { useAuth } from "@/context/AuthProvider";
import { studentEditValidationSchema } from "@/config/validationSchema";
import CustomTitle from "@/components/custom/CustomTitle";
import { TOWNS } from "@/data/towns";
import Input from "@/components/inputs/Input";
import SelectInput from "@/components/inputs/SelectInput";
import Title from "@/components/custom/Title";
// import { TOWNS } from "@/mockup/data/towns";

const ProfileEdit = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { openAlert } = useAlert();
  const [dob, setDob] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const { data: student } = useQuery({
    queryKey: ["student-profile", user?._id],
    queryFn: () => getStudent(user?._id),
    enabled: !!user?._id,
    initialData: {
      profile: user,
    },
  });

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(studentEditValidationSchema),
    defaultValues: {
      firstname: "",
      surname: "",
      othername: "",
      indexnumber: "",
      gender: "",
      email: "",
      phonenumber: "",
      address: "",
      residence: "",
      nationality: "",
    },
  });

  useEffect(() => {
    if (student) {
      reset(student?.profile);
      setDob(moment(student?.profile?.dateofbirth));
      setProfileImage(student?.profile?.profile);
    }
  }, [student, user, reset]);

  const handleClose = () => {};

  const { mutateAsync, isPending } = useMutation({ mutationFn: putStudent });

  const onSubmit = async (values) => {
    values.dateofbirth = moment(dob).format("L");
    values.profile = profileImage;

    mutateAsync(values, {
      onSettled: () => {
        queryClient.invalidateQueries(["student-profile"]);
        queryClient.invalidateQueries(["user"]);
      },
      onSuccess: (data) => {
        openAlert("success", data);
        handleClose();
      },
      onError: (error) => {
        openAlert("error", error);
      },
    });
  };

  const uploadProfile = async (e) => {
    const profile = e.target?.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const ImageURL = event.target.result;
      setProfileImage(ImageURL);
      openAlert("success", "Photo Updated");
    };
    reader.readAsDataURL(profile);
  };

  return (
    <Container fullWidth>
      <CustomTitle
        title="Edit Profile"
        subtitle="Edit your profile information"
        showBack={true}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ p: 1.5 }}>
          <Stack spacing={3}>
            <Stack alignSelf="center">
              <CustomImageChooser handleImageUpload={uploadProfile}>
                <Avatar
                  srcSet={profileImage}
                  sx={{ width: 100, height: 100, alignSelf: "center" }}
                />
              </CustomImageChooser>
            </Stack>
            <Typography
              variant="body2"
              color="primary.main"
              sx={{ fontWeight: "bold" }}
            >
              Personal information
            </Typography>
            <Input
              label="Student ID"
              disabled
              size="small"
              name="indexnumber"
              control={control}
              sx={{ maxWidth: { xs: "100%", md: 240 } }}
            />
            <CustomFormControl>
              <Input
                control={control}
                label="Firstname"
                name="firstname"
                fullWidth
                size="small"
              />
              <Input
                control={control}
                label="Surname"
                name="surname"
                fullWidth
                size="small"
              />
              <Input
                control={control}
                label="Othername"
                name="othername"
                fullWidth
                size="small"
              />
            </CustomFormControl>

            <CustomFormControl>
              <CustomDatePicker
                label="Date of Birth"
                date={dob}
                setDate={setDob}
                disableFuture={true}
              />
              <SelectInput
                control={control}
                name="gender"
                fullWidth
                size="small"
              >
                <MenuItem value="male">male</MenuItem>
                <MenuItem value="female">female</MenuItem>
              </SelectInput>
            </CustomFormControl>

            <CustomFormControl>
              <Input
                control={control}
                label="Email"
                name="email"
                fullWidth
                size="small"
              />
              <Input
                control={control}
                label="Telephone No."
                type="tel"
                name="phonenumber"
                fullWidth
                size="small"
              />
            </CustomFormControl>

            <Input
              control={control}
              label="Address"
              fullWidth
              size="small"
              name="address"
            />

            <CustomFormControl>
              <Controller
                control={control}
                name="residence"
                render={({ field }) => (
                  <Autocomplete
                    freeSolo
                    size="small"
                    fullWidth
                    options={TOWNS}
                    value={field.value || ""}
                    onChange={(_, value) => field.onChange(value)}
                    renderInput={(params) => (
                      <TextField {...params} label="Residence" />
                    )}
                  />
                )}
              />
            </CustomFormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending}
          >
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Container>
  );
};

export default React.memo(ProfileEdit);
