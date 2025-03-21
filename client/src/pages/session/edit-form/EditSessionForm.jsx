import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";
import * as yup from "yup";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  DialogActions,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTerm, putTerm } from "@/api/termAPI";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";
import Exams from "./Exams";
import Report from "./Report";
import Core from "./Core";
import CustomTitle from "@/components/custom/CustomTitle";
import Headmaster from "./Headmaster";

// Step Titles
const steps = [
  "Basic Session Details",
  "Exam & Assessment",
  "Headmaster Information",
  "Report Customization",
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
    }),
  }),
  yup
    .object()
    .shape({
      headmaster: yup
        .object()
        .shape({
          name: yup.string().required("Name is required"),
          phone: yup
            .string()
            .required("Phone number is required")
            .matches(
              /^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/,
              "Invalid Phone number"
            ),
            signature: yup.string().optional(),
          // signature: yup
          //   .mixed()
          //   .required("Signature is required")
          //   .test("fileType", "Only image files are allowed", (value) => {
          //     if (value) {
          //       return ["image/jpeg", "image/png", "image/gif"].includes(
          //         value.type
          //       );
          //     }
          //     return false;
          //   }),
        })
        .optional(),
    })
    .optional(),

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

export default function EditSessionForm() {
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const session = useQuery({
    queryKey: ["terms/:id", id],
    queryFn: () => getTerm(id),
    initialData: queryClient
      .getQueryData(["terms"])
      ?.find((term) => term?.termId === id),
    enabled: !!id,
  });

  const postMutate = useMutation({
    mutationFn: putTerm,
  });

  const onSubmit = (values) => {
    postMutate.mutateAsync(values, {
      onSettled: () => {
        queryClient.invalidateQueries(["terms"]);
        queryClient.invalidateQueries(["terms/:id", id]);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess("Changes Saved"));
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
    reset,
  } = useForm({
    resolver: yupResolver(validationSchemas[activeStep]),
    mode: "onBlur",
  });

  const watchedValues = watch(); // Watch all form fields

  // Save to localStorage whenever form values change
  useEffect(() => {
    reset(session?.data);
  }, [session?.data]);

  const handleNext = async () => {
    // Handle other steps
    const isValid = await trigger();
    if (isValid) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleCancel = () => {
    navigate(`/session/${id}`);
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
            {/* Financial Info Step */}
            <FormStep active={activeStep === 1}>
              <Exams
                watch={watch}
                control={control}
                setValue={setValue}
                errors={errors}
              />
            </FormStep>
          </>
        );
      case 2:
        return (
          <>
            {/* Financial Info Step */}
            <FormStep active={activeStep === 2}>
              <Headmaster
                setValue={setValue}
                watch={watch}
                control={control}
              />
            </FormStep>
          </>
        );
      case 3:
        return (
          <>
            {/* Financial Info Step */}
            <FormStep active={activeStep === 3}>
              <Report
                setValue={setValue}
                errors={errors}
                watch={watch}
                control={control}
              />
            </FormStep>
          </>
        );
      // case 5:
      //   return (
      //     <FormStep active={activeStep === 5}>
      //       <Confirm isPending={postMutate.isPending} />
      //     </FormStep>
      //   );

      default:
        return <p>More form fields for other steps...</p>;
    }
  };

  return (
    <Container>
      <CustomTitle
        title={`${session?.data?.core?.academicYear},${session?.data?.core?.term}`}
        subtitle="Make changes to academic sessions to ensure smooth academic operations"
        // img={session_icon}
        color="primary.main"
        showBack={true}
        to={`/session/${id}`}
      />
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
          >
            Next
          </Button>
        )}
      </DialogActions>
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <motion.div
            key={activeStep}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent(activeStep)}
          </motion.div>
          <DialogActions>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>

            <Button
              variant="contained"
              color="primary"
              loading={postMutate.isPending}
              // onClick={}
              type="submit"
            >
              {postMutate.isPending ? "Please Wait.." : "Save Changes"}
            </Button>
          </DialogActions>
        </form>
      </>
      {postMutate.isPending && <LoadingSpinner value="Saving Changes.." />}
    </Container>
  );
}
