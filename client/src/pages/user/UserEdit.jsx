import React, { useContext, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Avatar from "@mui/material/Avatar";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { getUser, putUser } from "../../api/userAPI";
import CustomFormControl from "../../components/inputs/CustomFormControl";
import { userEditValidationSchema } from "../../config/validationSchema";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import { uploadProfileImage } from "../../api/sessionAPI";
import moment from "moment";
import CustomDatePicker from "../../components/inputs/CustomDatePicker";
import CustomImageChooser from "../../components/inputs/CustomImageChooser";
import Back from "../../components/Back";
import CustomTitle from "../../components/custom/CustomTitle";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";

const UserEdit = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();
  const [dob, setDob] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  // const user = userEditData?.data;

  const user = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    initialData: queryClient
      .getQueryData(["users"])
      ?.find((user) => user?._id === id),
  });

  useEffect(() => {
    setDob(moment(user?.data?.dateofbirth));
    setProfileImage(
      `${import.meta.env.VITE_BASE_URL}/images/users/${user?.data?.profile}`
    );
  }, [user?.data]);

  //PUT user
  const { mutateAsync, isLoading } = useMutation({ mutationFn: putUser });
  const onSubmit = (values, options) => {
    delete values.profile;
     values.fullname=`${values?.firstname} ${values?.lastname}`
    values.dateofbirth = moment(dob).format("L");

    // //console.log(values);
    mutateAsync(values, {
      onSettled: () => {
        queryClient.invalidateQueries(["users"]);
        options.setSubmitting(false);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        navigate(`/users/${id}`);
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
      type: "users",
    };

    try {
      const data = await uploadProfileImage(info);
      schoolSessionDispatch(alertSuccess(data));
      setProfileImage(URL.createObjectURL(profile));
    } catch (error) {
      schoolSessionDispatch(alertError(error));
    }
    queryClient.invalidateQueries(["users"]);
  };

  return (
    <>
      <Back color="#012e54" />
      <CustomTitle
        title="Update User Information"
        subtitle="Make Changes to user profile information"
        color="primary.main"
      />
      <Divider />
      <Formik
        initialValues={user?.data}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={userEditValidationSchema}
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
              <Box sx={{ bgcolor: "#fff" }}>
                <Stack padding={2} spacing={2}>
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

                  <CustomFormControl>
                  <TextField
                    label="Firstname"
                    type="text"
                    fullWidth
                    size="small"
                    value={values.firstname}
                    onChange={handleChange("firstname")}
                    error={Boolean(touched.firstname && errors.firstname)}
                    helperText={touched.firstname && errors.firstname}
                  />
                  <TextField
                    label="Lastname"
                    type="text"
                    fullWidth
                    size="small"
                    value={values.lastname}
                    onChange={handleChange("lastname")}
                    error={Boolean(touched.lastname && errors.lastname)}
                    helperText={touched.lastname && errors.lastname}
                  />
        
                 
                </CustomFormControl>
                              
                    <TextField
                      label="Username"
                      fullWidth
                      size="small"
                      value={values?.username || ""}
                      onChange={handleChange("username")}
                      error={Boolean(touched.username && errors.username)}
                      helperText={touched.username && errors.username}
                    />
               
                  <CustomFormControl>
                    <CustomDatePicker
                      label="Date of Birth"
                      date={dob}
                      setDate={setDob}
                      disableFuture={true}
                      error={Boolean(touched.dateofbirth && errors.dateofbirth)}
                      helperText={touched.dateofbirth && errors.dateofbirth}
                    />

                    <TextField
                      label="Gender"
                      select
                      fullWidth
                      size="small"
                      value={values?.gender || ""}
                      onChange={handleChange("gender")}
                      error={Boolean(touched.gender && errors.gender)}
                      helperText={touched.gender && errors.gender}
                    >
                      <MenuItem value="male">male</MenuItem>
                      <MenuItem value="female">female</MenuItem>
                    </TextField>
                  </CustomFormControl>
                  <TextField
                    label="Role"
                    select
                    fullWidth
                    size="small"
                    value={values?.role || ""}
                    onChange={handleChange("role")}
                    error={Boolean(touched.role && errors.role)}
                    helperText={touched.role && errors.role}
                  >
                    <MenuItem value="administrator">Administrator</MenuItem>
                    <MenuItem value="director">Director</MenuItem>
                    <MenuItem value="secretary">Secretary</MenuItem>
                    <MenuItem value="coordinator">Exams Coordinator</MenuItem>
                    <MenuItem value="teacher">Facilitator</MenuItem>
                  </TextField>
                  <CustomFormControl>
                    <TextField
                      label="Email"
                      fullWidth
                      size="small"
                      row={3}
                      maxRows={3}
                      value={values?.email || ""}
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
                      value={values?.phonenumber || ""}
                      onChange={handleChange("phonenumber")}
                      error={Boolean(touched.phonenumber && errors.phonenumber)}
                      helperText={touched.phonenumber && errors.phonenumber}
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
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  <CustomFormControl>
                    <TextField
                      label="Place of Birth"
                      type="text"
                      fullWidth
                      size="small"
                      value={values?.residence || ""}
                      onChange={handleChange("residence")}
                      error={Boolean(touched.residence && errors.residence)}
                      helperText={touched.residence && errors.residence}
                    />
                    <TextField
                      label="Nationality"
                      fullWidth
                      size="small"
                      value={values?.nationality || ""}
                      onChange={handleChange("nationality")}
                      error={Boolean(touched.nationality && errors.nationality)}
                      helperText={touched.nationality && errors.nationality}
                    />
                  </CustomFormControl>
                  <DialogActions>
                    <LoadingButton
                      loading={isSubmitting || isLoading}
                      variant="contained"
                      color="primary"
                      sx={{ minWidth: { xs: 100, sm: 150 } }}
                      onClick={handleSubmit}
                    >
                      Save Changes
                    </LoadingButton>
                  </DialogActions>
                </Stack>
              </Box>
            </>
          );
        }}
      </Formik>
    </>
  );
};

UserEdit.propTypes = {};

export default UserEdit;
