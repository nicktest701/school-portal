import React, { useContext } from "react";
import {
  Stack,
  Typography,
  TextField,
  MenuItem,
  Autocomplete,
  Avatar,
  DialogContent,
  Dialog,
  Button,
  DialogActions,
} from "@mui/material";

import CustomFormControl from "@/components/inputs/CustomFormControl";
import { Formik } from "formik";
import { StudentContext } from "@/context/providers/StudentProvider";
import { NATIONALITY } from "@/mockup/data/nationality";
import { TOWNS } from "@/mockup/data/towns";
import { RELATIONSHIP } from "@/mockup/columns/sessionColumns";
import { guardianValidationSchema } from "@/config/validationSchema";
import CustomDialogTitle from "@/components/dialog/CustomDialogTitle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postParent } from "@/api/parentAPI";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import { useParams } from "react-router-dom";

const ParentNew = ({ open, setOpen }) => {
  const {
    studentState: {
      newStudent: { parent },
    },
  } = useContext(StudentContext);
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const queryClient = useQueryClient();
  const { studentId } = useParams();

  const { isPending, mutateAsync } = useMutation({ mutationFn: postParent });

  const onSubmit = (values, options) => {
    // console.log(values);

    values.parent1.student = studentId;
    values.parent2.student = studentId;

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

  const handleClose = () => setOpen(false);
  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={open}
      onClose={handleClose}
      // TransitionComponent={Transition}
    >
      <CustomDialogTitle
        title="New Parent/Guardian Information"
        onClose={handleClose}
      />
      <DialogContent xs={{ p: 1 }}>
        <Formik
          initialValues={parent}
          onSubmit={onSubmit}
          enableReinitialize={true}
          validationSchema={guardianValidationSchema}
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
              <Stack py={2} spacing={1}>
                <div style={{ maxHeight: 350, overflowY: "auto" }}>
                  <Stack py={2} spacing={1}>
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={2}
                    >
                      <Typography
                        variant="body2"
                        color="primary.main"
                        sx={{ fontWeight: "bold" }}
                      >
                        Parent/Guardian Information
                      </Typography>
                      <Avatar
                        sx={{ width: 30, height: 30, bgcolor: "primary.main" }}
                      >
                        1
                      </Avatar>
                    </Stack>

                    <CustomFormControl>
                      <TextField
                        label="Firstname"
                        type="text"
                        fullWidth
                        size="small"
                        value={values?.parent1?.firstname}
                        onChange={handleChange("parent1.firstname")}
                        error={Boolean(
                          touched.parent1?.firstname &&
                            errors.parent1?.firstname
                        )}
                        helperText={
                          touched.parent1?.firstname &&
                          errors.parent1?.firstname
                        }
                      />
                      <TextField
                        label="Surname"
                        fullWidth
                        size="small"
                        value={values?.parent1?.surname}
                        onChange={handleChange("parent1.surname")}
                        error={Boolean(
                          touched.parent1?.surname && errors.parent1?.surname
                        )}
                        helperText={
                          touched.parent1?.surname && errors.parent1?.surname
                        }
                      />
                    </CustomFormControl>
                    <CustomFormControl>
                      <TextField
                        label="Gender"
                        select
                        fullWidth
                        size="small"
                        value={values?.parent1?.gender}
                        onChange={handleChange("parent1.gender")}
                        error={Boolean(
                          touched.parent1?.gender && errors.parent1?.gender
                        )}
                        helperText={
                          touched.parent1?.gender && errors.parent1?.gender
                        }
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </TextField>

                      <Autocomplete
                        freeSolo
                        fullWidth
                        size="small"
                        options={RELATIONSHIP}
                        loadingText="Please wait...."
                        noOptionsText="No Relationship available"
                        getOptionLabel={(option) => option || ""}
                        value={values?.parent1?.relationship}
                        onInputChange={(e, value) =>
                          setFieldValue("parent1.relationship", value)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Relationship"
                            fullWidth
                            size="small"
                            error={Boolean(
                              touched.parent1?.relationship &&
                                errors.parent1?.relationship
                            )}
                            helperText={
                              touched.parent1?.relationship &&
                              errors.parent1?.relationship
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
                        value={values?.parent1?.email}
                        onChange={handleChange("parent1.email")}
                        error={Boolean(
                          touched.parent1?.email && errors.parent1?.email
                        )}
                        helperText={
                          touched.parent1?.email && errors.parent1?.email
                        }
                      />
                      <TextField
                        label="Telephone No."
                        inputMode="tel"
                        type="tel"
                        fullWidth
                        size="small"
                        value={values?.parent1?.phonenumber}
                        onChange={handleChange("parent1.phonenumber")}
                        error={Boolean(
                          touched.parent1?.phonenumber &&
                            errors.parent1?.phonenumber
                        )}
                        helperText={
                          touched.parent1?.phonenumber &&
                          errors.parent1?.phonenumber
                        }
                      />
                    </CustomFormControl>
                    <TextField
                      label="Address"
                      fullWidth
                      size="small"
                      row={3}
                      maxRows={3}
                      multiline
                      value={values?.parent1?.address}
                      onChange={handleChange("parent1.address")}
                      error={Boolean(
                        touched.parent1?.address && errors.parent1?.address
                      )}
                      helperText={
                        touched.parent1?.address && errors.parent1?.address
                      }
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
                        value={values?.parent1?.residence}
                        onChange={(e, value) =>
                          setFieldValue("parent1.residence", value)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Residence"
                            fullWidth
                            size="small"
                            error={Boolean(
                              touched.parent1?.residence &&
                                errors.parent1?.residence
                            )}
                            helperText={
                              touched.parent1?.residence &&
                              errors.parent1?.residence
                            }
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
                        value={values?.parent1?.nationality}
                        onChange={(e, value) =>
                          setFieldValue("parent1.nationality", value)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Nationality"
                            fullWidth
                            size="small"
                            error={Boolean(
                              touched.parent1?.nationality &&
                                errors.parent1?.nationality
                            )}
                            helperText={
                              touched.parent1?.nationality &&
                              errors.parent1?.nationality
                            }
                          />
                        )}
                      />
                    </CustomFormControl>
                  </Stack>
                  {/* Parent 2  */}
                  <Stack py={2} spacing={1}>
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={2}
                    >
                      <Typography
                        variant="body2"
                        color="primary.main"
                        sx={{ fontWeight: "bold" }}
                      >
                        Parent/Guardian Information
                      </Typography>
                      <Avatar
                        sx={{ width: 30, height: 30, bgcolor: "primary.main" }}
                      >
                        2
                      </Avatar>
                    </Stack>

                    <CustomFormControl>
                      <TextField
                        label="Firstname"
                        type="text"
                        fullWidth
                        size="small"
                        value={values?.parent2?.firstname}
                        onChange={handleChange("parent2.firstname")}
                        error={Boolean(
                          touched.parent2?.firstname &&
                            errors.parent2?.firstname
                        )}
                        helperText={
                          touched.parent2?.firstname &&
                          errors.parent2?.firstname
                        }
                      />
                      <TextField
                        label="Surname"
                        fullWidth
                        size="small"
                        value={values?.parent2?.surname}
                        onChange={handleChange("parent2.surname")}
                        error={Boolean(
                          touched.parent2?.surname && errors.parent2?.surname
                        )}
                        helperText={
                          touched.parent2?.surname && errors.parent2?.surname
                        }
                      />
                    </CustomFormControl>
                    <CustomFormControl>
                      <TextField
                        label="Gender"
                        select
                        fullWidth
                        size="small"
                        value={values?.parent2?.gender}
                        onChange={handleChange("parent2.gender")}
                        error={Boolean(
                          touched.parent2?.gender && errors.parent2?.gender
                        )}
                        helperText={
                          touched.parent2?.gender && errors.parent2?.gender
                        }
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </TextField>

                      <Autocomplete
                        freeSolo
                        fullWidth
                        size="small"
                        options={RELATIONSHIP}
                        loadingText="Please wait...."
                        noOptionsText="No Relationship available"
                        getOptionLabel={(option) => option || ""}
                        value={values?.parent2?.relationship}
                        onInputChange={(e, value) =>
                          setFieldValue("parent2.relationship", value)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Relationship"
                            fullWidth
                            size="small"
                            error={Boolean(
                              touched.parent2?.relationship &&
                                errors.parent2?.relationship
                            )}
                            helperText={
                              touched.parent2?.relationship &&
                              errors.parent2?.relationship
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
                        value={values?.parent2?.email}
                        onChange={handleChange("parent2.email")}
                        error={Boolean(
                          touched.parent2?.email && errors.parent2?.email
                        )}
                        helperText={
                          touched.parent2?.email && errors.parent2?.email
                        }
                      />
                      <TextField
                        label="Telephone No."
                        inputMode="tel"
                        type="tel"
                        fullWidth
                        size="small"
                        value={values?.parent2?.phonenumber}
                        onChange={handleChange("parent2.phonenumber")}
                        error={Boolean(
                          touched.parent2?.phonenumber &&
                            errors.parent2?.phonenumber
                        )}
                        helperText={
                          touched.parent2?.phonenumber &&
                          errors.parent2?.phonenumber
                        }
                      />
                    </CustomFormControl>
                    <TextField
                      label="Address"
                      fullWidth
                      size="small"
                      row={3}
                      maxRows={3}
                      multiline
                      value={values?.parent2?.address}
                      onChange={handleChange("parent2.address")}
                      error={Boolean(
                        touched.parent2?.address && errors.parent2?.address
                      )}
                      helperText={
                        touched.parent2?.address && errors.parent2?.address
                      }
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
                        value={values?.parent2?.residence}
                        onChange={(e, value) =>
                          setFieldValue("parent2.residence", value)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Residence"
                            fullWidth
                            size="small"
                            error={Boolean(
                              touched.parent2?.residence &&
                                errors.parent2?.residence
                            )}
                            helperText={
                              touched.parent2?.residence &&
                              errors.parent2?.residence
                            }
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
                        value={values?.parent2?.nationality}
                        onChange={(e, value) =>
                          setFieldValue("parent2.nationality", value)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Nationality"
                            fullWidth
                            size="small"
                            error={Boolean(
                              touched.parent2?.nationality &&
                                errors.parent2?.nationality
                            )}
                            helperText={
                              touched.parent2?.nationality &&
                              errors.parent2?.nationality
                            }
                          />
                        )}
                      />
                    </CustomFormControl>
                  </Stack>
                </div>

                <DialogActions>
                  <Button disabled={isPending} onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    loading={isPending}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </DialogActions>
              </Stack>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ParentNew;
