import React from "react";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { useContext } from "react";
import { postExamsRemarks } from "@/api/ExaminationAPI";
import { CONDUCT, INTEREST, TEACHERSREMARKS } from "@/config/remarks";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import CustomDialogTitle from "../dialog/CustomDialogTitle";

function AddRemarks({ open, setOpen, id, remark }) {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const queryClient = useQueryClient();

  const initialValues = {
    conduct: remark?.conduct,
    interest: remark?.interest,
    teachersComments: remark?.teachersComments,
    headteachersComments: remark?.headteachersComments,
  };

  const handleCloseDialog = () => setOpen(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: postExamsRemarks,
  });
  const onSubmit = (values) => {
    const remarks = {
      _id: id,
      comments: values,
    };
    mutateAsync(remarks, {
      onSettled: () => {
        queryClient.invalidateQueries(["exams-id", id]);
        queryClient.invalidateQueries(["exams-reports"]);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        handleCloseDialog();
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, setFieldValue, errors, touched, handleSubmit }) => {
        return (
          <Dialog
            open={open}
            onClose={handleCloseDialog}
            maxWidth="sm"
            fullWidth
            className="add-remark"
          >
            <CustomDialogTitle
              title="Add Remarks"
              onClose={handleCloseDialog}
            />
            <DialogContent sx={{ p: 1 }}>
              <Stack spacing={2} py={2}>
                <Autocomplete
                  freeSolo
                  options={CONDUCT}
                  getOptionLabel={(option) => option || ""}
                  value={values.conduct}
                  onChange={(e, value) => setFieldValue("conduct", value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Conduct/Attitude"
                      size="small"
                      error={Boolean(errors.conduct)}
                      helperText={touched.conduct && errors.conduct}
                    />
                  )}
                />
                <Autocomplete
                  freeSolo
                  options={INTEREST}
                  getOptionLabel={(option) => option || ""}
                  value={values.interest}
                  onChange={(e, value) => setFieldValue("interest", value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Interest"
                      size="small"
                      error={Boolean(errors.interest)}
                      helperText={touched.interest && errors.interest}
                    />
                  )}
                />
                <Autocomplete
                  freeSolo
                  options={TEACHERSREMARKS}
                  getOptionLabel={(option) => option || ""}
                  value={values.teachersComments}
                  onChange={(e, value) =>
                    setFieldValue("teachersComments", value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=" Class Teacher's Comments"
                      size="small"
                      error={Boolean(errors.teachersComments)}
                      helperText={
                        touched.teachersComments && errors.teachersComments
                      }
                    />
                  )}
                />
                <Autocomplete
                  freeSolo
                  options={TEACHERSREMARKS}
                  getOptionLabel={(option) => option || ""}
                  value={values.headteachersComments}
                  onChange={(e, value) =>
                    setFieldValue("headteachersComments", value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Headteacher's Comments"
                      size="small"
                      error={Boolean(errors.headteachersComments)}
                      helperText={
                        touched.headteachersComments &&
                        errors.headteachersComments
                      }
                    />
                  )}
                />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
              <Button
                loading={isPending}
                variant="contained"
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>
        );
      }}
    </Formik>
  );
}

export default AddRemarks;
