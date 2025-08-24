import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import ButtonGroup from "@mui/material/ButtonGroup";
import {
  Stepper,
  Step,
  StepLabel,
  DialogActions,
  Paper,
  Stack,
  Link,
  IconButton,
  Avatar,
} from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import PreviousSession from "../PreviousSession";
import { Add, Delete, DownloadRounded, School } from "@mui/icons-material";
import PersonalInformation from "./PersonalInformation";
import ParentInfo from "./ParentInfo";
import MedicalInformation from "./MedicalInformation";
import AcademicInformation from "./AcademicInformation";
import PhotoUpload from "./PhotoUpload";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import CustomTitle from "@/components/custom/CustomTitle";
import { downloadTemplate } from "@/api/userAPI";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";
import ConfirmStudent from "./ConfirmStudent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import { getStudentByIndexNumber, postNewStudent } from "@/api/studentAPI";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newStudentValidationSchema } from "@/config/validationSchema";
import {
  newStudentDefaultValues,
  parentDefaultValues,
} from "@/config/initialValues";
import useLocalStorage from "@/hooks/useLocalStorage";
import { UserContext } from "@/context/providers/UserProvider";
import FormStep from "@/components/FormStep";
import { readXLSX } from "@/config/readXLSX";

const pages = [
  {
    title: "Student Personal Information",
    subtitle:
      "Provide the student's basic details including name, gender, and contact information.",
  },
  {
    title: "Photo Upload",
    subtitle: "Upload a recent passport-size photo of the student.",
  },
  {
    title: "Parent Information",
    subtitle:
      "Enter details of the student's parents or guardians, including their contact information.",
  },
  {
    title: "Medical Records",
    subtitle:
      "Record any medical conditions or disabilities relevant to the student.",
  },
  {
    title: "Academic Information",
    subtitle:
      "Provide details about the student's current level and previous school records.",
  },
  {
    title: " Confirm Student Details",
    subtitle:
      "Review and finalize student academic, personal, and medical information before submission.",
  },
];

const StudentInfo = () => {
  const studentData =
    JSON.parse(localStorage.getItem("@student-data")) ||
    newStudentDefaultValues;
  const { session } = useContext(UserContext);
  const [activeStep, setActiveStep] = useLocalStorage("active-add-student", 0);
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const [id, setId] = useState("");
  const [hideSaveBtn, setHideSaveBtn] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [loadingFile, setLoadingFile] = useState(false);
  const [openPreviousSession, setOpenPreviousSession] = useState(false);

  const confirmMessage =
    "Are you sure you want to leave this page? Your changes may not be saved.";

  useEffect(() => {
    const beforeUnloadHandler = (e) => {
      e.preventDefault();
      e.returnValue = confirmMessage;
    };

    window.addEventListener("beforeunload", beforeUnloadHandler);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, []);

  const {
    register,
    control,
    trigger,
    setValue,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm({
    resolver:
      activeStep === 5
        ? null
        : yupResolver(newStudentValidationSchema[activeStep]),
    defaultValues: studentData,
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "parent",
  });

  const watchedValues = watch();

  const doesStudentExist = useMutation({
    mutationFn: () =>
      getStudentByIndexNumber(watchedValues?.personal?.indexnumber),
  });

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: postNewStudent,
  });

  const onSubmit = (values) => {
    const { photo, ...rest } = values;

    mutateAsync(
      {
        photo: photo?.profile,
        details: {
          ...rest,
          session: {
            sessionId: session?.sessionId,
            termId: session?.termId,
          },
        },
      },
      {
        onSettled: () => {
          queryClient.invalidateQueries(["all-students"]);
        },
        onSuccess: (data) => {
          if (data) {
            schoolSessionDispatch(alertSuccess("New Student Added!"));
            setId(data);
            setHideSaveBtn(true);
            queryClient.invalidateQueries(["student-profile", data]);
            localStorage.removeItem("@student-data");

         
          }
        },
        onError: (error) => {
          schoolSessionDispatch(alertError(error));
        },
      }
    );
  };

  // Save to localStorage whenever form values change
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem(
        "@student-data",
        JSON.stringify(newStudentDefaultValues)
      );
    } else {
      localStorage.setItem("@student-data", JSON.stringify(watchedValues));
    }
    // console.log(watchedValues?.personal);
  }, [watchedValues]);

  const handleNext = async () => {
    if (activeStep === 0) {
      try {
        await doesStudentExist.mutateAsync({});
        clearErrors("personal.indexnumber");
        const isValid = await trigger();
        if (isValid) setActiveStep((prev) => prev + 1);
      } catch (error) {
        setError("personal.indexnumber", {
          message: error,
          type: "custom",
        });
      }
      return;
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
        navigate("/student/view");
        localStorage.removeItem("@student-data");
      }
    });
  };

  const handleClearFields = () => {
    reset(newStudentDefaultValues);
    setActiveStep(0);
  };

  //LOAD Students from file excel,csv
  async function handleLoadFile(e) {
    setLoadingFile(true);
    const file = e.target.files?.[0];

    if (file) {
      try {
        const results = await readXLSX(file);
        schoolSessionDispatch({
          type: "openAddStudentFileDialog",
          payload: { data: results, type: "file" },
        });
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoadingFile(false);
      }
    }
  }

  // Step Titles
  const steps = [
    "Personal Information",
    "Photo Upload",
    "Parent/Guardian Information",
    "Medical Records",
    "Academic Information",
    "Confirmation ",
  ];

  const handleDownloadTemplate = async () => {
    await downloadTemplate("students");
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <FormStep>
            <PersonalInformation
              register={register}
              setValue={setValue}
              errors={errors}
              watch={watch}
              control={control}
            />
          </FormStep>
        );
      case 1:
        return (
          <>
            {/* Semester Details Step */}
            <FormStep>
              <PhotoUpload
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
            <FormStep>
              <Button
                variant="contained"
                color="primary"
                onClick={() => append(parentDefaultValues)}
                sx={{ mb: 2, alignSelf: "start" }}
                startIcon={<Add />}
              >
                Add Parent
              </Button>
              {fields.map((item, index) => (
                <>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Typography
                      variant="body1"
                      color="primary.main"
                      bgcolor="whitesmoke"
                      p={1}
                      pb={0}
                      sx={{
                        fontWeight: "bold",

                        display: "flex",
                        gap: 2,
                        width: "fit-content",
                      }}
                    >
                      <span>Parent / Guardian Information</span>
                      <Avatar
                        sx={{ width: 24, height: 24, bgcolor: "primary.main" }}
                      >
                        {index + 1}
                      </Avatar>
                    </Typography>

                    {index > 0 && (
                      <IconButton
                        sx={{ alignSelf: "flex-end" }}
                        onClick={() => remove(index)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </Stack>
                  <ParentInfo
                    key={index}
                    control={control}
                    errors={errors}
                    handleNext={handleNext}
                    watch={watch}
                    index={index}
                  />
                </>
              ))}
            </FormStep>
          </>
        );
      case 3:
        return (
          <>
            {/* Financial Info Step */}
            <FormStep>
              <MedicalInformation
                watch={watch}
                setValue={setValue}
                control={control}
                errors={errors}
              />
            </FormStep>
          </>
        );
      case 4:
        return (
          <>
            {/* Financial Info Step */}
            <FormStep>
              <AcademicInformation
                watch={watch}
                control={control}
                setValue={setValue}
                errors={errors}
              />
            </FormStep>
          </>
        );
      case 5:
        return (
          <FormStep>
            <ConfirmStudent
              watch={watch}
              isPending={isPending}
              id={id}
              hideSaveBtn={hideSaveBtn}
              reset={reset}
            />
          </FormStep>
        );

      default:
        return <p>More form fields for other steps...</p>;
    }
  };

  return (
    <>
      {/* <Prompt when={true} message={confirmMessage} /> */}
      <Container>
        <CustomTitle
          title="New Student"
          subtitle="  Track,manage and control academic and class activities"
          icon={<School sx={{ width: 30, height: 30 }} />}
          color="primary.main"
        />

        <Container
          sx={{
            mb: 4,
            py: 2,

            bgcolor: "#fff",
            borderRadius: "12px",
          }}
        >
          <ButtonGroup
            variant="contained"
            size="small"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "center",
              py: 2,
              boxShadow: 0,
              borderRadius: 0,
              gap: { xs: 1, md: 0 },
            }}
          >
            <Button sx={{ bgcolor: "var(--secondary)" }}>
              <FormLabel
                htmlFor="studentFile"
                title="Import students"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  gap: 1,
                  color: "primary.main",
                  fontSize: 11,
                  cursor: "pointer",
                }}
              >
                <DownloadRounded htmlColor="#fff" />
                <Typography variant="caption" color="#fff">
                  Student From file
                </Typography>

                <Input
                  type="file"
                  id="studentFile"
                  name="studentFile"
                  hidden
                  inputProps={{
                    accept: ".xlsx,.xls,.csv",
                  }}
                  onChange={handleLoadFile}
                  onClick={(e) => {
                    e.target.value = null;
                    e.currentTarget.value = null;
                  }}
                />
              </FormLabel>
            </Button>
            <Button
              startIcon={<PublishIcon />}
              onClick={() => setOpenPreviousSession(true)}
            >
              Student From Previous Sessions
            </Button>
          </ButtonGroup>
          <Link
            sx={{ cursor: "pointer", alignSelf: "start" }}
            onClick={handleDownloadTemplate}
            variant="caption"
          >
            Download Student template here
          </Link>
        </Container>

        {/* Stepper  */}
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

        <Paper sx={{ elevation: 1, borderRadius: "12px", p: 2, mb: 6 }}>
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
                loading={doesStudentExist.isPending}
              >
                Next
              </Button>
            )}
          </DialogActions>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            py={1}
          >
            <Button color="success" onClick={handleClearFields}>
              Clear Fields
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Stack>

          <motion.div
            key={activeStep}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box bgcolor="whitesmoke" p={1}>
              <Typography variant="h6" fontWeight="bold">
                {pages[activeStep].title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {pages[activeStep].subtitle}
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              {renderStepContent(activeStep)}
            </form>
          </motion.div>
        </Paper>
      </Container>
      <PreviousSession
        open={openPreviousSession}
        setOpen={setOpenPreviousSession}
      />
      {loadingFile && <LoadingSpinner value="Loading data.." />}
      {isPending && <LoadingSpinner value="Creating new student.." />}
    </>
  );
};

export default StudentInfo;
