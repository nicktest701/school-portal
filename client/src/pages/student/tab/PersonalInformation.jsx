import React, { useContext, useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import LoadingButton from "@mui/lab/LoadingButton";
import CustomFormControl from "../../../components/inputs/CustomFormControl";
import { Formik } from "formik";
import { StudentContext } from "../../../context/providers/StudentProvider";
import { studentPersonalDataValidationSchema } from "../../../config/validationSchema";
import CustomDatePicker from "../../../components/inputs/CustomDatePicker";
import moment from "moment";
import { NATIONALITY } from "../../../mockup/data/nationality";
import { TOWNS } from "../../../mockup/data/towns";
import { ArrowForward } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { getStudentByIndexNumber } from "../../../api/studentAPI";

const PersonalInformation = ({ setMode }) => {
  const {
    studentState: {
      newStudent: { personal },
    },
    studentDispatch,
  } = useContext(StudentContext);
  const [indexNumber, setIndexNumber] = useState("");
  const [dob, setDob] = useState(moment(personal?.dateofbirth));

  const doesStudentExist = useQuery({
    queryKey: ["student-exist", indexNumber],
    queryFn: () => getStudentByIndexNumber(indexNumber),
    enabled: !!indexNumber,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const onSubmit = (values, options) => {
    values.dateofbirth = moment(dob).format("L");

    studentDispatch({
      type: "addNewStudent",
      payload: {
        personal: {
          ...values,
          isCompleted: true,
        },
      },
    });

    options.setSubmitting(false);
    setMode("photo-info");
  };

  return (
    <Formik
      initialValues={personal}
      onSubmit={onSubmit}
      enableReinitialize={true}
      validationSchema={studentPersonalDataValidationSchema}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        handleChange,
        handleSubmit,

        isSubmitting,
      }) => {
        return (
          <Stack py={2} spacing={2}>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <LoadingButton
                loading={isSubmitting}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                endIcon={<ArrowForward />}
                disabled={doesStudentExist?.isError}
              >
                Continue
              </LoadingButton>
            </Stack>
            <Typography
              variant="h5"
              color="primary.main"
              bgcolor="whitesmoke"
              p={1}
              sx={{ fontWeight: "bold" }}
            >
              Personal Details
            </Typography>
            <TextField
              label="Student ID"
              type="text"
              // fullWidth
              sx={{ maxWidth: 300 }}
              size="small"
              value={values.indexnumber}
              onChange={(e) => {
                setFieldValue("indexnumber", e.target.value);
                setIndexNumber(e.target.value);
              }}
              error={
                doesStudentExist.isError ||
                Boolean(touched?.indexnumber && errors?.indexnumber)
              }
              helperText={
                doesStudentExist?.error ||
                (touched?.indexnumber && errors?.indexnumber)
              }
            />
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
                label="Surname"
                fullWidth
                size="small"
                value={values.surname}
                onChange={handleChange("surname")}
                error={Boolean(touched.surname && errors.surname)}
                helperText={touched.surname && errors.surname}
              />
              <TextField
                label="Othername"
                fullWidth
                size="small"
                value={values.othername}
                onChange={handleChange("othername")}
                error={Boolean(touched.othername && errors.othername)}
                helperText={touched.othername && errors.othername}
              />
            </CustomFormControl>
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
                value={values.gender}
                onChange={handleChange("gender")}
                error={Boolean(touched.gender && errors.gender)}
                helperText={touched.gender && errors.gender}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
            </CustomFormControl>
            <CustomFormControl>
              <TextField
                label="Email"
                fullWidth
                size="small"
                row={3}
                maxRows={3}
                value={values.email}
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
                value={values.phonenumber}
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
              value={values.address}
              onChange={handleChange("address")}
              error={Boolean(touched.address && errors.address)}
              helperText={touched.address && errors.address}
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
                value={values.residence}
                onChange={(e, value) => setFieldValue("residence", value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Residence"
                    fullWidth
                    size="small"
                    error={Boolean(touched.residence && errors.residence)}
                    helperText={touched.residence && errors.residence}
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
                value={values.nationality}
                onChange={(e, value) => setFieldValue("nationality", value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Nationality"
                    fullWidth
                    size="small"
                    error={Boolean(touched.nationality && errors.nationality)}
                    helperText={touched.nationality && errors.nationality}
                  />
                )}
              />
            </CustomFormControl>
          </Stack>
        );
      }}
    </Formik>
  );
};

PersonalInformation.propTypes = {};

export default PersonalInformation;
