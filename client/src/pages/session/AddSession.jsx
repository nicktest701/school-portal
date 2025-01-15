import React, { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Stack,
  Dialog,
  DialogContent,
  DialogActions,
  MenuItem,
  Divider,
  FormLabel,
} from "@mui/material";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingButton from "@mui/lab/LoadingButton";
import { postTerm } from "../../api/termAPI";
import { sessionValidationSchema } from "../../config/validationSchema";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";
import { sessionInitialValues } from "../../config/initialValues";
import { SCHOOL_TERMS } from "../../mockup/columns/sessionColumns";
import Transition from "@/components/animations/Transition";
import CustomDialogTitle from "@/components/dialog/CustomDialogTitle";
import YearInput from "@/components/inputs/YearInput";
import DateInputPicker from "@/components/inputs/DateInputPicker";
import SelectInput from "@/components/inputs/SelectInput";
const AddSession = () => {
  const { schoolSessionState, schoolSessionDispatch } =
    useContext(SchoolSessionContext);

  const queryClient = useQueryClient();

  const currentYear = new Date().getFullYear();
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(sessionValidationSchema),
    defaultValues: {
      ...sessionInitialValues,
      academicYear: `${currentYear}/${currentYear}`,
      start: moment().format("YYYY"),
      end: moment().format("YYYY"),
      from: moment(),
      to: moment(),
      term: "",
    },
  });

  //ADD New Session
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: postTerm,
  });

  const onSubmit = (values) => {
    const { start, end, from, to, ...rest } = values;

    const payload = {
      ...rest,
      academicYear: `${start}/${end}`,
      from: moment(new Date(from))?.format("l"),
      to: moment(new Date(to))?.format("l"),
    };

    mutateAsync(payload, {
      onSettled: () => {
        queryClient.invalidateQueries(["terms"]);
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

  function handleCloseDialog() {
    schoolSessionDispatch({ type: "displayAddSession", payload: false });
  }
  return (
    <Dialog
      open={schoolSessionState.displayAddSession}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Transition}
    >
      <CustomDialogTitle title="Add Session" onClose={handleCloseDialog} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2} paddingY={2}>
            <FormLabel sx={{ fontSize: 13 }}>Academic Year</FormLabel>
            <Stack direction="row" columnGap={2}>
              <YearInput label="From" name="start" control={control} />
              <YearInput label="To" name="end" control={control} />
            </Stack>

            <DateInputPicker
              label="Start of Academic Term/Semester"
              name="from"
              control={control}
            />
            <DateInputPicker
              label="End of Academic Term/Semester"
              name="to"
              control={control}
            />

            <SelectInput
              label="Term/Semester"
              size="small"
              name="term"
              control={control}
              fullWidth
              margin="normal"
            >
              {SCHOOL_TERMS.map((term) => (
                <MenuItem key={term} value={term}>
                  {term}
                </MenuItem>
              ))}
            </SelectInput>
            <Divider />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <LoadingButton type="submit" loading={isLoading} variant="contained">
            {isLoading ? "Saving" : "Save"}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddSession;
