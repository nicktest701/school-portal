import React, { useContext, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import PropTypes from "prop-types";
import { putUser } from "../../api/userAPI";
import CustomFormControl from "../../components/inputs/CustomFormControl";
import { updateProfileValidationSchema } from "../../config/validationSchema";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import { uploadProfileImage } from "../../api/sessionAPI";

import CustomDialogTitle from "../../components/dialog/CustomDialogTitle";
import CustomImageChooser from "../../components/inputs/CustomImageChooser";
import { UserContext } from "../../context/providers/UserProvider";
import { useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";

const UpdateUserProfile = () => {
  const { user } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const queryClient = useQueryClient();
  const [confirmPasswordErr, setConfirmPasswordError] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  useEffect(() => {
    setProfileImage(
      `${import.meta.env.VITE_BASE_URL}/images/users/${user?.profile}`
    );
  }, [user]);

  //PUT user
  const { mutateAsync } = useMutation(putUser);
  const onSubmit = (values, options) => {
    if (values.confirmPassword !== values.password) {
      setConfirmPasswordError("Passwords do not match");
      options.setSubmitting(false);
      return;
    }
    values.fullname = `${values?.firstname} ${values?.lastname}`;
    delete values.profile;
    delete values.confirmPassword;

    values._id = user?.id;
    mutateAsync(values, {
      onSettled: () => {
        queryClient.invalidateQueries(["user"]);
        options.setSubmitting(false);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        handleClose();
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });

    // options.setSubmitting(false);
  };

  const uploadProfile = async (e) => {
    const profile = e.target?.files[0];
    const info = {
      _id: user?.id,
      profile,
      type: "users",
    };

    try {
      const data = await uploadProfileImage(info);
      schoolSessionDispatch(alertSuccess(data));
      setProfileImage(URL.createObjectURL(profile));
    } catch (error) {
      schoolSessionDispatch(alertError(error));
    }
    queryClient.invalidateQueries(["user"]);
  };

  const handleClose = () => {
    setSearchParams((params) => {
      params.delete("e_p");
      return params;
    });
  };

  return (
    <Dialog open={searchParams.get("e_p")} maxWidth="md" fullWidth>
      <CustomDialogTitle title="Edit User" onClose={handleClose} />

      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
          ...user,
        }}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={updateProfileValidationSchema}
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
              <DialogContent>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  justifyContent="center"
                  columnGap={3}
                >
                  <Stack>
                    <CustomImageChooser handleImageUpload={uploadProfile}>
                      <Avatar
                        srcSet={profileImage}
                        sx={{ width: 100, height: 100, alignSelf: "center" }}
                      />
                    </CustomImageChooser>
                  </Stack>

                  <Stack padding={2} spacing={2}>
                    <Typography
                      variant="body2"
                      color="primary.main"
                      sx={{ fontWeight: "bold" }}
                    >
                      Personal information
                    </Typography>

                    <TextField
                      label="Firstname"
                      type="text"
                      fullWidth
                      size="small"
                      value={values.firstname || ""}
                      onChange={handleChange("firstname")}
                      error={Boolean(touched.firstname && errors.firstname)}
                      helperText={touched.firstname && errors.firstname}
                    />
                    <TextField
                      label="Lastname"
                      type="text"
                      fullWidth
                      size="small"
                      value={values.lastname || ""}
                      onChange={handleChange("lastname")}
                      error={Boolean(touched.lastname && errors.lastname)}
                      helperText={touched.lastname && errors.lastname}
                    />

                    <TextField
                      label="Username"
                      fullWidth
                      size="small"
                      value={values.username || ""}
                      onChange={handleChange("username")}
                      error={Boolean(touched.username && errors.username)}
                      helperText={touched.username && errors.username}
                    />
                    <TextField
                      label="Email"
                      fullWidth
                      size="small"
                      row={3}
                      maxRows={3}
                      value={values.email || ""}
                      onChange={handleChange("email")}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />

                    <TextField
                      label="Telephone No."
                      inputMode="tel"
                      type="tel"
                      fullWidth
                      size="small"
                      value={values.phonenumber || ""}
                      onChange={handleChange("phonenumber")}
                      error={Boolean(touched.phonenumber && errors.phonenumber)}
                      helperText={touched.phonenumber && errors.phonenumber}
                    />
                    <CustomFormControl>
                      <TextField
                        type="password"
                        label="Password"
                        fullWidth
                        size="small"
                        value={values.password}
                        onChange={handleChange("password")}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                      />
                      <TextField
                        type="password"
                        label="Confirm Password"
                        fullWidth
                        size="small"
                        value={values.confirmPassword}
                        onChange={handleChange("confirmPassword")}
                        error={Boolean(
                          touched.confirmPassword && errors.confirmPassword
                        )}
                        helperText={
                          confirmPasswordErr
                            ? confirmPasswordErr
                            : touched.confirmPassword && errors.confirmPassword
                        }
                        FormHelperTextProps={{
                          color: "error.main",
                        }}
                      />
                    </CustomFormControl>
                  </Stack>
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <LoadingButton
                  loading={isSubmitting}
                  variant="contained"
                  color="primary"
                  sx={{ minWidth: { xs: 100, sm: 150 } }}
                  onClick={handleSubmit}
                >
                  Save Changes
                </LoadingButton>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

UpdateUserProfile.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default UpdateUserProfile;
