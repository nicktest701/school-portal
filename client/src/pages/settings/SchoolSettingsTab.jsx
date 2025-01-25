import { Avatar, Box, Container, Stack, TextField } from "@mui/material";
import { Formik } from "formik";
import React, { useContext, useState } from "react";

import Button from "@mui/material/Button";
import CustomImageChooser from "../../components/inputs/CustomImageChooser";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putSchoolInfo, updateSchoolLogo } from "../../api/userAPI";
import { UserContext } from "../../context/providers/UserProvider";

function SchoolSettingsTab() {
  const school_info = JSON.parse(localStorage.getItem("@school_info"));
  const {
    userDispatch,
  } = useContext(UserContext);

  const [badge, setBadge] = useState(
    `${import.meta.env.VITE_BASE_URL}/images/users/${school_info?.badge}`
  );
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: putSchoolInfo,
  });

  const onSubmit = (values, options) => {
    mutateAsync(values, {
      onSettled: () => {
        options.setSubmitting(false);
        queryClient.invalidateQueries(["school"]);
      },
      onSuccess: (data) => {
        localStorage.setItem("@school_info", JSON.stringify(values));
        userDispatch({ type: "setUserInfo", payload: data });
        schoolSessionDispatch(alertSuccess(data));
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  const uploadProfile = async (e) => {
    const badge = e.target?.files[0];

    try {
      const updatedBadge = await updateSchoolLogo(badge);
      schoolSessionDispatch(alertSuccess("School Image Uploaded"));

      queryClient.invalidateQueries(["school"]);
      setBadge(`${import.meta.env.VITE_BASE_URL}/images/users/${updatedBadge}`);
      school_info.badge = updatedBadge;
      localStorage.setItem("@school_info", JSON.stringify(school_info));
    } catch (error) {
      schoolSessionDispatch(alertError("Error updating school logo"));
    }
  };

  return (
    <Container maxWidth="md">
      <Formik
        initialValues={school_info}
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
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  marginY: 2,
                }}
              >
                <CustomImageChooser handleImageUpload={uploadProfile}>
                  <Avatar
                    src={badge}
                    sx={{
                      width: 120,
                      height: 120,
                      justifySelf: "center",
                      alignSelf: "center",
                    }}
                  />
                </CustomImageChooser>
              </Box>

              <Stack spacing={3} pt={4}>
                <TextField
                  label="School Name"
                  placeholder="School Name"
                  type="text"
                  fullWidth
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
                  value={values?.location}
                  onChange={handleChange("location")}
                  error={Boolean(touched.location && errors.location)}
                  helperText={touched.location && errors.location}
                />
                <TextField
                  label="Email Address"
                  placeholder="Email Address"
                  type="email"
                  inputMode="email"
                  fullWidth
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
                  value={values?.website}
                  onChange={handleChange("website")}
                  error={Boolean(touched.website && errors.website)}
                  helperText={touched.website && errors.website}
                />
                <TextField
                  label="Phone Number"
                  placeholder="e.g. 0244192831-0233847287"
                  type="text"
                  fullWidth
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

export default SchoolSettingsTab;
