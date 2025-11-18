import React from "react";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { useContext } from "react";
import { postExamsRemarks } from "@/api/ExaminationAPI";
import { CONDUCT, INTEREST, TEACHERSREMARKS } from "@/config/remarks";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import CustomDialogTitle from "../dialog/CustomDialogTitle";

function AddRemarks({ open, setOpen, id, remark }) {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      conduct: remark?.conduct || "",
      interest: remark?.interest || "",
      teachersComments: remark?.teachersComments || "",
      headteachersComments: remark?.headteachersComments || "",
    },
  });

  const handleCloseDialog = () => setOpen(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: postExamsRemarks,
  });

  const onSubmit = (data) => {
    const remarks = {
      _id: id,
      comments: data,
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
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      maxWidth="sm"
      fullWidth
      className="add-remark"
    >
      <CustomDialogTitle title="Add Remarks" onClose={handleCloseDialog} />
      <DialogContent sx={{ p: 1 }}>
        <Stack spacing={2} py={2}>
          <Controller
            name="conduct"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                freeSolo
                options={CONDUCT}
                getOptionLabel={(option) => option || ""}
                value={value}
                onChange={(e, value) => onChange(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Conduct/Attitude"
                    size="small"
                    error={Boolean(errors.conduct)}
                    helperText={errors.conduct?.message}
                  />
                )}
              />
            )}
          />
          <Controller
            name="interest"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                freeSolo
                options={INTEREST}
                getOptionLabel={(option) => option || ""}
                value={value}
                onChange={(e, value) => onChange(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Interest"
                    size="small"
                    error={Boolean(errors.interest)}
                    helperText={errors.interest?.message}
                  />
                )}
              />
            )}
          />
          <Controller
            name="teachersComments"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                freeSolo
                options={TEACHERSREMARKS}
                getOptionLabel={(option) => option || ""}
                value={value}
                onChange={(e, value) => onChange(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Class Teacher's Comments"
                    size="small"
                    error={Boolean(errors.teachersComments)}
                    helperText={errors.teachersComments?.message}
                  />
                )}
              />
            )}
          />
          <Controller
            name="headteachersComments"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                freeSolo
                options={TEACHERSREMARKS}
                getOptionLabel={(option) => option || ""}
                value={value}
                onChange={(e, value) => onChange(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Headteacher's Comments"
                    size="small"
                    error={Boolean(errors.headteachersComments)}
                    helperText={errors.headteachersComments?.message}
                  />
                )}
              />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button
          loading={isPending}
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddRemarks;
