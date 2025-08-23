import {
  Box,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserContext } from "@/context/providers/UserProvider";
import CustomFormControl from "@/components/inputs/CustomFormControl";
import { putSchool } from "@/api/schoolAPI";

function BasicInformation() {
  const { school_info } = useContext(UserContext);
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: putSchool,
  });

  const onSubmit = (values, options) => {
    // return
    mutateAsync(values, {
      onSettled: () => {
        options.setSubmitting(false);
        queryClient.invalidateQueries(["school"]);
      },
      onSuccess: (data) => {
        localStorage.setItem("@school_info", JSON.stringify(data));
        schoolSessionDispatch(alertSuccess("Changes Saved"));
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  return (
    <Container
      sx={{
        borderRadius: "12px",
        bgcolor: "#fff",
        p: 2,
      }}
    >
      <Box sx={{ placeSelf: "start" }}>
        <Typography variant="h6" color="primary">
          Basic Information
        </Typography>
        <Typography variant="body2">Update School Logo</Typography>
      </Box>
      <Formik
        initialValues={{
          _id: school_info?._id,
          name: school_info?.name,
          address: school_info?.address,
          location: school_info?.location,
          email: school_info?.email,
          website: school_info?.website,
          phonenumber: school_info?.phonenumber,
          motto: school_info?.motto,
        }}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,

          handleChange,
          handleSubmit,

          isSubmitting,
        }) => {
          return (
            <>
              <Stack spacing={3} pt={4}>
                <TextField
                  label="School Name"
                  placeholder="School Name"
                  type="text"
                  fullWidth
                  size="small"
                  value={values?.name}
                  onChange={handleChange("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  label="Address"
                  placeholder="Address"
                  type="text"
                  fullWidth
                  size="small"
                  value={values?.address}
                  onChange={handleChange("address")}
                  error={Boolean(touched.address && errors.address)}
                  helperText={touched.address && errors.address}
                />
                <TextField
                  label="Location"
                  placeholder="Location"
                  type="text"
                  fullWidth
                  size="small"
                  value={values?.location}
                  onChange={handleChange("location")}
                  error={Boolean(touched.location && errors.location)}
                  helperText={touched.location && errors.location}
                />
                <CustomFormControl>
                  <TextField
                    label="Email Address"
                    placeholder="Email Address"
                    type="email"
                    inputMode="email"
                    fullWidth
                    size="small"
                    value={values?.email}
                    onChange={handleChange("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    label="Website"
                    placeholder="Website"
                    type="text"
                    fullWidth
                    size="small"
                    value={values?.website}
                    onChange={handleChange("website")}
                    error={Boolean(touched.website && errors.website)}
                    helperText={touched.website && errors.website}
                  />
                </CustomFormControl>
                <TextField
                  label="Phone Number"
                  placeholder="e.g. 0244192831-0233847287"
                  type="text"
                  fullWidth
                  size="small"
                  value={values?.phonenumber}
                  onChange={handleChange("phonenumber")}
                  error={Boolean(touched.phonenumber && errors.phonenumber)}
                  helperText={
                    touched.phonenumber && errors.phonenumber
                      ? errors.phonenumber
                      : 'Separate multiple phone numbers with " - "'
                  }
                />
                <TextField
                  label="Motto"
                  placeholder="Motto"
                  type="text"
                  fullWidth
                  size="small"
                  value={values?.motto}
                  onChange={handleChange("motto")}
                  error={Boolean(touched.motto && errors.motto)}
                  helperText={touched.motto && errors.motto}
                />

                <Button
                  loading={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Save Settings
                </Button>
              </Stack>
            </>
          );
        }}
      </Formik>
    </Container>
  );
}

export default BasicInformation;
