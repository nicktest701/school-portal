import React, { useContext, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import DialogActions from "@mui/material/DialogActions";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { getTeacher, putTeacher } from "../../api/teacherAPI";
import CustomFormControl from "../../components/inputs/CustomFormControl";
import { teacherValidationSchema } from "../../config/validationSchema";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import { uploadProfileImage } from "../../api/sessionAPI";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import CustomDatePicker from "../../components/inputs/CustomDatePicker";
import { TOWNS } from "../../mockup/data/towns";
import { NATIONALITY } from "../../mockup/data/nationality";
import CustomImageChooser from "../../components/inputs/CustomImageChooser";
import CustomDialogTitle from "../../components/dialog/CustomDialogTitle";
import Loader from "../../config/Loader";
import { Box, Button, Container } from "@mui/material";
import Back from "../../components/Back";
import CustomTitle from "../../components/custom/CustomTitle";

const TeacherEdit = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const [dob, setDob] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const teacher = useQuery({
    queryKey: ["teacher", id],
    queryFn: () => getTeacher(id),
    initialData: queryClient
      .getQueryData(["teachers", id])
      ?.find((teacher) => teacher?._id === id),
    enabled: !!id,
  });

  useEffect(() => {
    setDob(moment(teacher?.data?.dateofbirth));
    setProfileImage(
      `${import.meta.env.VITE_BASE_URL}/images/users/${teacher?.data?.profile}`
    );
  }, [teacher?.data]);

  //Put teacher
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: putTeacher,
  });
  const onSubmit = (values) => {
    delete values?.profile;
    values.dateofbirth = moment(dob).format("L");

    mutateAsync(values, {
      onSettled: () => {
        queryClient.invalidateQueries(["teachers"]);
        queryClient.invalidateQueries(["teacher", id]);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        handleClose();
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  const uploadProfile = async (e) => {
    const profile = e.target?.files[0];
    const info = {
      _id: id,
      profile,
      type: "teachers",
    };

    try {
      const data = await uploadProfileImage(info);
      schoolSessionDispatch(alertSuccess(data));
      setProfileImage(URL.createObjectURL(profile));
    } catch (error) {
      schoolSessionDispatch(alertError(error));
    }
    queryClient.invalidateQueries(["teachers"]);
  };

  const handleClose = () => {
    navigate(`/teacher/${id}`);
  };

  if (teacher?.isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <Back to={`/teacher/${id}`} color="primary.main" />
      <CustomTitle
        title="Edit Teacher"
        subtitle="Manage teachers profile"
        color="primary.main"
      />

      <Divider />
      <Formik
        initialValues={teacher?.data}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={teacherValidationSchema}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          handleChange,
          handleSubmit,
        }) => {
          return (
            <>
              <Box>
                <Stack padding={2} spacing={1}>
                  <Stack sx={{ position: "relative" }}>
                    <Avatar
                      srcSet={profileImage}
                      sx={{ width: 100, height: 100, alignSelf: "center" }}
                    />
                    <CustomImageChooser handleImageUpload={uploadProfile} />
                  </Stack>
                  <Typography
                    variant="body2"
                    color="primary.main"
                    sx={{ fontWeight: "bold" }}
                  >
                    Personal information
                  </Typography>
                  <CustomFormControl>
                    <TextField
                      label="Firstname"
                      type="text"
                      fullWidth
                      size="small"
                      value={values?.firstname || ""}
                      onChange={handleChange("firstname")}
                      error={Boolean(touched?.firstname && errors?.firstname)}
                      helperText={touched?.firstname && errors?.firstname}
                    />
                    <TextField
                      label="Surname"
                      fullWidth
                      size="small"
                      value={values?.surname || ""}
                      onChange={handleChange("surname")}
                      error={Boolean(touched?.surname && errors?.surname)}
                      helperText={touched?.surname && errors?.surname}
                    />
                  </CustomFormControl>
                  <TextField
                    label="Username"
                    fullWidth
                    size="small"
                    value={values?.username || ""}
                    onChange={handleChange("username")}
                    error={Boolean(touched?.username && errors?.username)}
                    helperText={touched?.username && errors?.username}
                  />
                  <CustomFormControl>
                    <CustomDatePicker
                      label="Date of Birth"
                      date={dob}
                      setDate={setDob}
                      disableFuture={true}
                      touched={Boolean(
                        touched?.dateofbirth && errors?.dateofbirth
                      )}
                      error={touched?.dateofbirth && errors?.dateofbirth}
                    />

                    <TextField
                      label="Gender"
                      select
                      fullWidth
                      size="small"
                      value={values?.gender || ""}
                      onChange={handleChange("gender")}
                      error={Boolean(touched?.gender && errors?.gender)}
                      helperText={touched?.gender && errors?.gender}
                    >
                      <MenuItem value="male">male</MenuItem>
                      <MenuItem value="female">female</MenuItem>
                    </TextField>
                  </CustomFormControl>
                  <CustomFormControl>
                    <TextField
                      label="Email"
                      fullWidth
                      size="small"
                      row={3}
                      maxRows={3}
                      value={values?.email || ""}
                      onChange={handleChange("email")}
                      error={Boolean(touched?.email && errors?.email)}
                      helperText={touched?.email && errors?.email}
                    />
                    <TextField
                      label="Telephone No."
                      inputMode="tel"
                      type="tel"
                      fullWidth
                      size="small"
                      value={values?.phonenumber || ""}
                      onChange={handleChange("phonenumber")}
                      error={Boolean(
                        touched?.phonenumber && errors?.phonenumber
                      )}
                      helperText={touched?.phonenumber && errors?.phonenumber}
                    />
                  </CustomFormControl>
                  <TextField
                    label="Address"
                    fullWidth
                    size="small"
                    row={3}
                    maxRows={3}
                    value={values?.address || ""}
                    onChange={handleChange("address")}
                    error={Boolean(touched?.address && errors?.address)}
                    helperText={touched?.address && errors?.address}
                  />
                  <CustomFormControl>
                    <Autocomplete
                      freeSolo
                      fullWidth
                      size="small"
                      options={TOWNS}
                      loadingText="Please wait...."
                      noOptionsText="No Town available"
                      getOptionLabel={(option) => option || ""}
                      value={values?.residence || ""}
                      onChange={(e, value) => setFieldValue("residence", value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Residence"
                          fullWidth
                          size="small"
                          error={Boolean(
                            touched?.residence && errors?.residence
                          )}
                          helperText={touched?.residence && errors?.residence}
                        />
                      )}
                    />

                    <Autocomplete
                      freeSolo
                      fullWidth
                      size="small"
                      loadingText="Please wait...."
                      options={NATIONALITY}
                      noOptionsText="No Nationality available"
                      getOptionLabel={(option) => option || ""}
                      value={values?.nationality || ""}
                      onChange={(e, value) =>
                        setFieldValue("nationality", value)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Nationality"
                          fullWidth
                          size="small"
                          error={Boolean(
                            touched?.nationality && errors?.nationality
                          )}
                          helperText={
                            touched?.nationality && errors?.nationality
                          }
                        />
                      )}
                    />
                  </CustomFormControl>
                </Stack>
              </Box>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <LoadingButton
                  loading={isLoading}
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
    </Container>
  );
};

TeacherEdit.propTypes = {};

export default TeacherEdit;
