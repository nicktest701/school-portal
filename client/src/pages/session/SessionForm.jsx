import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";
import * as yup from "yup";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import Student from "./form/Student";
import Level from "./form/Level";
import Exams from "./form/Exams";
import Report from "./form/Report";
import Core from "./form/Core";
import { sessionDefaultValues } from "@/config/initialValues";
import Confirm from "./form/Confirm";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTerm } from "@/api/termAPI";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import { useNavigate } from "react-router-dom";

import { getValidTerm } from "@/api/termAPI";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";
import Swal from "sweetalert2";

// Step Titles
const steps = [
  "Basic Session Details",
  "Levels Structure",
  "Enrollment & Student Management",
  "Exam & Assessment",
  "Report Customization",
  "Confirm",
  // "Extra-Curricular Activities",
  // "System & Settings",
];

// Validation Schemas for each step
const validationSchemas = [
  yup.object().shape({
    core: yup.object().shape({
      name: yup.string().trim().required("Required*"),
      from: yup.string().required("Required*"),
      to: yup
        .string()
        .required("Required*")
        .test(
          "is-after-start",
          "End of Academic Year date must be after or the same as the start of Academic Year",
          function (value) {
            const { from } = this.parent;
            return !from || !value || moment(value).isSameOrAfter(moment(from));
          }
        ),
      term: yup.string().trim().required("Required*"),
    }),
  }),
  yup.object().shape({
    levels: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required("Class is required").optional(),
          type: yup.string().required("Class is required").optional(),
          levelName: yup.string().required("Class is required").optional(),
        })
      )
      .optional(), // ✅ Optional: Only validates if there are files
  }),
  yup.object().shape({
    // students: yup
    //   .array()
    //   .of(
    //     yup.object().shape({
    //       class: yup.object().shape({
    //         name: yup.string().required("Class is required"),
    //         type: yup.string().optional(),
    //       }),
    //       fileName: yup.string().required("Class is required"),
    //       data: yup
    //         .array()
    //         .of(yup.object())
    //         .when("class", {
    //           is: (value) => !!value?.name, // If class is selected
    //           then: yup
    //             .array()
    //             .of(yup.object())
    //             .min(1, "Student data is required when a class is selected"),
    //           otherwise: yup.array().of(yup.object()).optional(),
    //         }),
    //     })
    //   )
    //   .optional(),
    students: yup.array().of(yup.object()).optional(),
  }),
  yup.object().shape({
    exams: yup.object().shape({
      midTermExams: yup
        .object()
        .shape({
          from: yup.string().required("Required*"),
          to: yup
            .string()
            .required("Required*")
            .test(
              "is-after-start",
              "End of Mid-Term must be after or the same as the start of Mid-Term",
              function (value) {
                const { from } = this.parent;
                return (
                  !from || !value || moment(value).isSameOrAfter(moment(from))
                );
              }
            ),
        })
        .optional(),

      revisionWeek: yup
        .object()
        .shape({
          from: yup.string().required("Required*"),
          to: yup
            .string()
            .required("Required*")
            .test(
              "is-after-start",
              "End of Revision Week must be after or the same as the start of Revision Week",
              function (value) {
                const { from } = this.parent;
                return (
                  !from || !value || moment(value).isSameOrAfter(moment(from))
                );
              }
            ),
        })
        .optional(),

      finalExams: yup.object().shape({
        from: yup.string().required("Required*"),
        to: yup
          .string()
          .required("Required*")
          .test(
            "is-after-start",
            "End of Examination Week must be after or the same as the start of Examination Week",
            function (value) {
              const { from } = this.parent;
              return (
                !from || !value || moment(value).isSameOrAfter(moment(from))
              );
            }
          ),
      }),
      scorePreference: yup
        .string()
        .oneOf(["20/80", "30/70", "40/60", "50/50"], "Invalid score preference")
        .required("Score preference is required"),
      grade: yup
        .object()
        .shape({
          name: yup.string().required("Grade 1 is required").optional(),
          ratings: yup
            .array()
            .of(
              yup.object().shape({
                highestMarks: yup
                  .string()
                  .required("Class is required")
                  .optional(),
                lowestMarks: yup
                  .string()
                  .required("Class is required")
                  .optional(),
                grade: yup.string().required("Class is required").optional(),
                remarks: yup.string().required("Class is required").optional(),
              })
            )
            .optional(), // ✅ Optional: Only validates if there are files
        })
        .optional(),
    }),
  }),
  yup.object().shape({
    report: yup.object().shape({
      template: yup.string().required("Please select a report template"),

      dimension: yup
        .string()
        .oneOf(["A4", "A3", "Letter"], "Invalid report dimension")
        .required("Report dimension is required"),
    }),
  }),
];

export default function SessionForm() {
  const sessionData =
    JSON.parse(localStorage.getItem("@session-data")) || sessionDefaultValues;
  const [activeStep, setActiveStep] = useState(0);
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const postMutate = useMutation({
    mutationFn: postTerm,
  });

  const onSubmit = (values) => {
    postMutate.mutateAsync(values, {
      onSettled: () => {
        queryClient.invalidateQueries(["terms"]);
      },
      onSuccess: (data) => {
        navigate("/session");
        schoolSessionDispatch(alertSuccess("New Session created"));
        localStorage.removeItem("@session-data");
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  const {
    control,
    trigger,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm({
    resolver:
      activeStep === 5 ? null : yupResolver(validationSchemas[activeStep]),
    defaultValues: sessionData,
    mode: "onBlur",
  });

  const watchedValues = watch(); // Watch all form fields

  // Save to localStorage whenever form values change
  useEffect(() => {
    localStorage.setItem("@session-data", JSON.stringify(watchedValues));
  }, [watchedValues]);

  const from = watchedValues?.core?.from;
  const to = watchedValues?.core?.to;
  const term = watchedValues?.core?.term;

  const { isPending, mutateAsync } = useMutation({
    mutationFn: () =>
      getValidTerm({
        academicYear: `${moment(from).year()}/${moment(to).year()}`,
        term,
      }),
  });

  const handleNext = async () => {
    if (activeStep === 0) {
      try {
        await mutateAsync({});
        clearErrors("core.term");
        const isValid = await trigger();
        if (isValid) setActiveStep((prev) => prev + 1);
      } catch (error) {
        setError("core.term", {
          message: error,
          type: "custom",
        });
      }
      return;
    }

    if (activeStep === 2) {
      const duplicates = JSON.parse(
        sessionStorage.getItem("@duplicates") || "[]"
      );
      if (!_.isEmpty(duplicates)) {
        setError("students", {
          message:
            "Some index numbers in the selected students list already exist. Please remove all duplicates before submitting the data.",
          type: "custom",
        });
        return;
      }
    }

    // Handle other steps
    const isValid = await trigger();
    if (isValid) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };
  const handleCancel = () => {
    Swal.fire({
      title: "Canceling",
      text: "All unsaved data will be lost.Do you wish to proceed?",
      showCancelButton: true,
      backdrop: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        navigate("/session");
        localStorage.removeItem("@session-data");
      }
    });
  };

  const FormStep = styled("div")(({ theme, active }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    transition: "transform 0.3s ease-in-out",
    transform: active ? "translateX(0)" : "translateX(100%)",
    paddingBlock: theme.spacing(3),
  }));

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <FormStep active={activeStep === 0}>
            <Core errors={errors} control={control} watch={watch} />
          </FormStep>
        );
      case 1:
        return (
          <>
            {/* Semester Details Step */}
            <FormStep active={activeStep === 1}>
              <Level
                watch={watch}
                setValue={setValue}
                errors={errors}
                handleNext={handleNext}
              />
            </FormStep>
          </>
        );

      case 2:
        return (
          <>
            <FormStep active={activeStep === 2}>
              <Student
                watch={watch}
                control={control}
                setValue={setValue}
                errors={errors}
                handleNext={handleNext}
              />
            </FormStep>
          </>
        );
      case 3:
        return (
          <>
            {/* Financial Info Step */}
            <FormStep active={activeStep === 3}>
              <Exams
                watch={watch}
                control={control}
                setValue={setValue}
                errors={errors}
              />
            </FormStep>
          </>
        );
      case 4:
        return (
          <>
            {/* Financial Info Step */}
            <FormStep active={activeStep === 4}>
              <Report
                setValue={setValue}
                errors={errors}
                watch={watch}
                control={control}
              />
            </FormStep>
          </>
        );
      case 5:
        return (
          <FormStep active={activeStep === 5}>
            <Confirm isPending={postMutate.isPending} />
          </FormStep>
        );

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
        {activeStep === steps.length - 1 ? null : (
          <Button
            variant="contained"
            color="primary"
            // disabled={activeStep === 2 && !_.isEmpty(duplicates)}
            onClick={handleNext}
            loading={isPending}
          >
            Next
          </Button>
        )}
      </DialogActions>
      <Box>
        <motion.div
          key={activeStep}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStepContent(activeStep)}
          </form>
        </motion.div>
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
      {postMutate.isPending && <LoadingSpinner value="Creating session.." />}
    </>
  );
}
