import React, { useContext, useState } from "react";
import {
  Autocomplete,
  Button,
  Container,
  DialogActions,
  Box,
  Stack,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import { assignLevelValidationSchema } from "../../config/validationSchema";
import {
  alertError,
  alertSuccess,
} from "../../context/actions/globalAlertActions";

import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import useLevel from "../../components/hooks/useLevel";
import CustomTitle from "../../components/custom/CustomTitle";
import Back from "../../components/Back";
import useLevelById from "../../components/hooks/useLevelById";
import { UserContext } from "../../context/providers/UserProvider";
import { postCourse } from "../../api/courseAPI";
import TeacherCourses from "./TeacherCourses";

const TeacherAssignCourse = () => {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const {
    userState: { session },
  } = useContext(UserContext);

  const queryClient = useQueryClient();
  const [subject, setSubject] = useState("");
  const [currentLevel, setCurrentLevel] = useState({
    _id: "",
    type: "",
  });

  const initialValues = {
    currentLevel,
    subject,
  };

  const { levelsOption, levelLoading } = useLevel();
  const { subjects, levelLoading: subjectLoading } = useLevelById(
    currentLevel?._id
  );

  const { id } = useParams();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: postCourse,
  });

  const onSubmit = (values, options) => {
    const info = {
      session: session?.sessionId,
      term: session?.termId,
      teacher: id,
      level: values?.currentLevel?._id,
      subject: values?.subject,
    };

    mutateAsync(info, {
      onSettled: () => {
        queryClient.invalidateQueries(["courses", id]);
        options.setSubmitting(false);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        options.resetForm();
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  return (
    <Container>
      <Back to={`/teacher/${id}`} color="primary.main" />
      <CustomTitle
        title="Course Allocation Management"
        subtitle=" Assign courses to teachers, ensuring that everyone is aware of their responsibilities and schedules."
        color="primary.main"
      />

      <Formik
        initialValues={initialValues}
        validationSchema={assignLevelValidationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ errors, touched, handleSubmit, handleReset }) => {
          return (
            <>
              <Box
                sx={{
                  mt: 4,
                  py: 4,
                  px: 2,
                  border: "1px solid lightgray",
                  // borderRadius: 2,
                  bgcolor: "#fff",
                }}
              >
                <Stack spacing={3}>
                  <Autocomplete
                    size="small"
                    options={levelsOption}
                    loading={levelLoading}
                    loadingText="Loading levels.Please wait..."
                    getOptionLabel={(option) => option?.type || ""}
                    isOptionEqualToValue={(option, value) =>
                      value._id === undefined ||
                      value._id === "" ||
                      value._id === option._id
                    }
                    value={currentLevel}
                    onChange={(e, value) => {
                      setCurrentLevel(value);
                      setSubject("");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select a level"
                        error={Boolean(
                          touched.currentLevel?.type &&
                            errors.currentLevel?.type
                        )}
                        helperText={
                          touched.currentLevel?.type &&
                          errors.currentLevel?.type
                        }
                      />
                    )}
                    sx={{ marginY: 2 }}
                  />
                  <Autocomplete
                    freeSolo
                    fullWidth
                    noOptionsText="No subject available"
                    loading={subjectLoading}
                    loadingText={"Please Wait..."}
                    options={subjects ? subjects : []}
                    closeText=" "
                    getOptionLabel={(option) => option || ""}
                    value={subject}
                    onChange={(e, value) => setSubject(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Subject"
                        size="small"
                        error={Boolean(touched.subject && errors.subject)}
                        helperText={touched.subject && errors.subject}
                      />
                    )}
                  />
                </Stack>
                <DialogActions>
                  <Button onClick={handleReset}>Cancel</Button>
                  <LoadingButton
                    loading={isLoading}
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={
                      currentLevel?._id === "" && subjects?.length === 0
                    }
                  >
                    Assign Course
                  </LoadingButton>
                </DialogActions>
              </Box>
            </>
          );
        }}
      </Formik>
      <TeacherCourses />
    </Container>
  );
};

export default React.memo(TeacherAssignCourse);
