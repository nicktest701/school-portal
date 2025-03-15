import React, { useState, use } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  TextField,
  Typography,
  MenuItem,
  Divider,
  FormLabel,
  Stack,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import YearInput from "@/components/inputs/YearInput";
import DateInputPicker from "@/components/inputs/DateInputPicker";
import SelectInput from "@/components/inputs/SelectInput";
import { SCHOOL_TERMS } from "@/mockup/columns/sessionColumns";
import { postTerm } from "@/api/termAPI";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import CustomFormControl from "@/components/inputs/CustomFormControl";

// Step Titles
const steps = [
  "Basic Session Details",
  "Academic Structure",
  "Enrollment & Student Management",
  "Exam & Assessment",
  "Extra-Curricular Activities",
  "System & Settings",
];

// Validation Schemas for each step
const validationSchemas = [
  yup.object().shape({
    name: yup.string().required("Required*"),
    from: yup.string().required("Required*"),
    to: yup.string().required("Required*"),
    term: yup.string().required("Required*"),
  }),
  yup.object().shape({
    classLevels: yup.string().required("Class level is required"),
    subjects: yup.string().required("Subjects are required"),
    curriculum: yup.string().required("Curriculum type is required"),
  }),
  yup.object().shape({
    enrollmentStart: yup.date().required("Enrollment start date is required"),
    enrollmentEnd: yup.date().required("Enrollment end date is required"),
  }),
  yup.object().shape({
    midTermExams: yup.object().shape({
      from: yup.string().required("Required*"),
      to: yup.string().required("Required*"),
    }),

    revisionWeek: yup.object().shape({
      from: yup.string().required("Required*"),
      to: yup.string().required("Required*"),
    }),

    finalExams: yup.object().shape({
      from: yup.string().required("Required*"),
      to: yup.string().required("Required*"),
    }),
    assessmentCriteria: yup
      .string()
      .required("Assessment criteria is required"),
  }),
  yup.object().shape({
    sports: yup.string().required("Sports selection is required"),
    schoolEvents: yup.string().required("School event is required"),
  }),
  yup.object().shape({
    accessControl: yup.string().required("Access control is required"),
    sessionLocking: yup.string().required("Session locking is required"),
  }),
];

export default function SessionForm() {
  const { schoolSessionDispatch } = use(SchoolSessionContext);
  const queryClient = useQueryClient();

  const [activeStep, setActiveStep] = useState(0);

  const {
    handleSubmit,
    control,
    register,
    trigger,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(validationSchemas[activeStep]),
    mode: "onBlur",
  });

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const { mutateAsync, isPending } = useMutation({
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

  const FormContainer = styled("div")({
    position: "relative",
  });

  const FormStep = styled("div")(({ theme, active }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    transition: "transform 0.3s ease-in-out",
    transform: active ? "translateX(0)" : "translateX(100%)",
    padding: theme.spacing(3),
  }));

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            {/* Core Session Step */}
            <FormStep active={activeStep === 0}>
              <Typography variant="h6" gutterBottom>
                Core Session Details
              </Typography>

              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    label="Session Name"
                    fullWidth
                    error={!!errors.semesterName}
                    helperText={errors.semesterName?.message}
                  />
                )}
              />
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
              <Typography variant="h6" gutterBottom>
                Semester
              </Typography>
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
            </FormStep>
          </>
        );
      case 1:
        return (
          <>
            {/* Semester Details Step */}
            <FormStep active={activeStep === 1}>
              <Typography variant="h6" gutterBottom>
                Semester Details
              </Typography>
              <Controller
                name="classLevels"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Class Levels"
                    fullWidth
                    error={!!errors.classLevels}
                    helperText={errors.classLevels?.message}
                  />
                )}
              />
              <Controller
                name="subjects"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Subjects"
                    fullWidth
                    error={!!errors.subjects}
                    helperText={errors.subjects?.message}
                  />
                )}
              />
              <Controller
                name="curriculum"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Curriculum Type"
                    fullWidth
                    error={!!errors.curriculum}
                    helperText={errors.curriculum?.message}
                  >
                    <MenuItem value="National">National</MenuItem>
                    <MenuItem value="IB">IB</MenuItem>
                    <MenuItem value="Cambridge">Cambridge</MenuItem>
                  </TextField>
                )}
              />
            </FormStep>
          </>
        );

      case 2:
        return (
          <>
            {/* Academic Calendar Step */}
            <FormStep active={activeStep === 2}>
              <Typography variant="h6" gutterBottom>
                Academic Calendar
              </Typography>

              <TextField
                label="Midterm Date"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                {...register("academic.midtermDate")}
                error={!!errors.academic?.midtermDate}
                helperText={errors.academic?.midtermDate?.message}
              />

              <TextField
                label="Final Exam Date"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                {...register("academic.finalExamDate")}
                error={!!errors.academic?.finalExamDate}
                helperText={errors.academic?.finalExamDate?.message}
              />
            </FormStep>
          </>
        );
      case 3:
        return (
          <>
            {/* Financial Info Step */}
            <FormStep active={activeStep === 3}>
              <Typography variant="h6" gutterBottom>
                Mid-term Examination
              </Typography>
              {/* Mid-term Examination */}
              <Stack
                spacing={2}
                sx={{
                  borderRadius: "12px",
                  border: "1px solid lightgray",
                  p: 2,
                }}
              >
                <FormLabel sx={{ fontSize: 13 }}>
                  Mid-term Examination
                </FormLabel>
                <CustomFormControl>
                  <DateInputPicker label="From" name="from" control={control} />
                  <DateInputPicker label="To" name="to" control={control} />
                </CustomFormControl>
              </Stack>
              {/* Revision Week */}
              <Stack
                spacing={2}
                sx={{
                  borderRadius: "12px",
                  border: "1px solid lightgray",
                  p: 2,
                }}
              >
                <FormLabel sx={{ fontSize: 13 }}>Revision Week</FormLabel>
                <CustomFormControl>
                  <DateInputPicker label="From" name="from" control={control} />
                  <DateInputPicker label="To" name="to" control={control} />
                </CustomFormControl>
              </Stack>
              {/* Examination */}
              <Stack
                spacing={2}
                sx={{
                  borderRadius: "12px",
                  border: "1px solid lightgray",
                  p: 2,
                }}
              >
                <FormLabel sx={{ fontSize: 13 }}>Examination</FormLabel>
                <CustomFormControl>
                  <DateInputPicker label="From" name="from" control={control} />
                  <DateInputPicker label="To" name="to" control={control} />
                </CustomFormControl>
              </Stack>
            </FormStep>
          </>
        );
      case 4:
        return <></>;
      case 5:
        return <></>;
      case 6:
        return <></>;
      case 7:
        return <></>;

      default:
        return <p>More form fields for other steps...</p>;
    }
  };

  return (
    <>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ mb: 4, display: { xs: "none", md: "flex" } }}
      >
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Actions */}
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            px: 4,
          }}
        >
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Previous
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              loading={isPending}
            >
              {isPending ? "Please Wait.." : "Create Session"}
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          )}
        </DialogActions>
        <DialogContent>
          <FormContainer>{renderStepContent(activeStep)}</FormContainer>
        </DialogContent>
      </form>
    </>
  );
}
