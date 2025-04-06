import React, { useContext } from "react";
import {
  Stack,
  TextField,
  MenuItem,
  Autocomplete,
  Dialog,
  DialogContent,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";

import CustomFormControl from "@/components/inputs/CustomFormControl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { StudentContext } from "@/context/providers/StudentProvider";
import { parentValidationSchema } from "@/config/validationSchema";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import { NATIONALITY } from "@/mockup/data/nationality";
import { TOWNS } from "@/mockup/data/towns";
import CustomDialogTitle from "@/components/dialog/CustomDialogTitle";
import { putParent } from "@/api/parentAPI";
import { RELATIONSHIP } from "@/mockup/columns/sessionColumns";

const ParentEdit = () => {
  const queryClient = useQueryClient();

  const { studentState, studentDispatch } = useContext(StudentContext);
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  // EDIT parent information
  const { mutateAsync } = useMutation({
    mutationFn: putParent,
  });

  const onSubmit = (values, options) => {
    // //console.log(values);

    mutateAsync(values, {
      onSettled: () => {
        queryClient.invalidateQueries(["parent"]);
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
  };

  //CLOSE
  const handleClose = () => {
    studentDispatch({
      type: "editParent",
      payload: {
        open: false,
        data: {},
      },
    });
  };

  return (
    <>
      <Dialog
        maxWidth="md"
        fullWidth
        open={studentState?.editParentData.open}
        onClose={handleClose}
      >
        <CustomDialogTitle
          title="Edit Parent/Guardian Information"
          onClose={handleClose}
        />
        <DialogContent>
          <Formik
            initialValues={studentState?.editParentData?.data}
            onSubmit={onSubmit}
            enableReinitialize={true}
            validationSchema={parentValidationSchema}
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
                <Stack padding={2} spacing={1}>
                  <CustomFormControl>
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
                      label="Surname"
                      fullWidth
                      size="small"
                      value={values.surname || ""}
                      onChange={handleChange("surname")}
                      error={Boolean(touched.surname && errors.surname)}
                      helperText={touched.surname && errors.surname}
                    />
                  </CustomFormControl>
                  <CustomFormControl>
                    <TextField
                      label="Gender"
                      select
                      fullWidth
                      size="small"
                      value={values.gender || ""}
                      onChange={handleChange("gender")}
                      error={Boolean(touched.gender && errors.gender)}
                      helperText={touched.gender && errors.gender}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </TextField>
                    <Autocomplete
                      freeSolo
                      fullWidth
                      size="small"
                      options={RELATIONSHIP(values.gender)}
                      loadingText="Please wait...."
                      noOptionsText="No Relationship available"
                      getOptionLabel={(option) => option || ""}
                      value={values?.relationship}
                      onInputChange={(e, value) =>
                        setFieldValue("relationship", value)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Relationship"
                          fullWidth
                          size="small"
                          error={Boolean(
                            touched?.relationship && errors?.relationship
                          )}
                          helperText={
                            touched?.relationship && errors?.relationship
                          }
                        />
                      )}
                    />
                  </CustomFormControl>
                  <CustomFormControl>
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
                  </CustomFormControl>
                  <TextField
                    label="Residence Address"
                    fullWidth
                    size="small"
                    row={3}
                    maxRows={3}
                    value={values.address || ""}
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
                      getOptionLabel={(option) => option}
                      value={values.residence || ""}
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
                      value={values.nationality || ""}
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
                            touched.nationality && errors.nationality
                          )}
                          helperText={touched.nationality && errors.nationality}
                        />
                      )}
                    />
                  </CustomFormControl>

                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    spacing={2}
                    paddingY={4}
                  >
                    <Button
                      loading={isSubmitting}
                      variant="contained"
                      color="primary"
                      sx={{ minWidth: { xs: 100, sm: 150 } }}
                      onClick={handleSubmit}
                    >
                      Save Changes
                    </Button>
                  </Stack>
                </Stack>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

ParentEdit.propTypes = {
  open: PropTypes.string,
  setOpen: PropTypes.func,
};

export default ParentEdit;
