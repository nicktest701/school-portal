import React, { useContext, useState } from "react";
import {
  Stack,
  Button,
  TextField,
  Autocomplete,
  Alert,
  List,
  Grid,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExams } from "@/api/ExaminationAPI";
import { examsScoreValidationSchema } from "@/config/validationSchema";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import { generateCustomGrade } from "@/config/generateCustomGrade";
import { useParams, useSearchParams } from "react-router-dom";
import { UserContext } from "@/context/providers/UserProvider";
import useLevelById from "@/components/hooks/useLevelById";
import ExamsScoreTable from "@/components/tables/ExamsScoreTable";

const ExamsScoreInput = ({ setTab }) => {
  const {
    userState: { session },
  } = useContext(UserContext);
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const { levelId } = useParams();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const [msgs, setMsgs] = useState({
    severity: "",
    text: "",
  });

  const [scoreList, setScoreList] = useState([]);

  const { gradeSystem, subjects } = useLevelById(levelId);

  const initialValues = {
    subject: {
      _id: "",
      name: "",
    },
    classScore: 0,
    examsScore: 0,
  };

  const onSubmit = (values, option) => {
    const total = Number(values.classScore) + Number(values.examsScore);

    const summary = generateCustomGrade(total, gradeSystem?.ratings);

    const score = {
      _id: values?.subject?._id,
      subject: values?.subject?.name,
      classScore: values.classScore,
      examsScore: values.examsScore,
      ...summary,
    };

    const filteredScoreList = _.merge(_.keyBy([...scoreList, score], "_id"));
    setScoreList(_.values(filteredScoreList));
    option.resetForm();
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateExams,
  });

  //Handle Save Results
  const handleSaveResults = () => {
    const data = {
      session: {
        levelId,
        studentId: searchParams.get("sid"),
        sessionId: session.sessionId,
        termId: session.termId,
      },
      scores: scoreList,
    };

    mutateAsync(data, {
      onSettled: () => {
        queryClient.invalidateQueries(["exams-by-id", searchParams.get("eid")]);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        setTab("1");
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  //CLOSE FORM
  const handleClose = () =>
    schoolSessionDispatch({
      type: "openAddExamsScore",
      payload: {
        open: false,
        data: {},
      },
    });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={examsScoreValidationSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        isValid,
        dirty,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => {
        return (
          <>
            {msgs.text && (
              <Alert
                sx={{
                  marginY: 1,
                }}
                severity={msgs.severity}
                onClose={() =>
                  setMsgs({
                    text: "",
                  })
                }
              >
                {msgs.text}
              </Alert>
            )}
            <>
              <Stack spacing={2} direction="row" justifyContent="flex-end">
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  variant="contained"
                  disabled={scoreList.length === 0}
                  onClick={handleSaveResults}
                  loading={isPending}
                >
                  Save Results
                </Button>
              </Stack>
              <Grid
                container
                spacing={2}
                rowGap={2}
                sx={{ minHeight: "60svh" }}
              >
                <Grid item xs={12} md={5} padding={2}>
                  <Stack spacing={2} py={2}>
                    <Typography>Add Subject Score</Typography>
                    <Autocomplete
                      // freeSolo
                      options={subjects}
                      loadingText="Loading Subjects.Please Wait..."
                      getOptionLabel={(option) => option?.name || ""}
                      value={values.subject}
                      onChange={(e, value) => setFieldValue("subject", value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Subject"
                          size="small"
                          error={Boolean(errors.subject)}
                          helperText={touched.subject && errors.subject}
                        />
                      )}
                    />
                    <TextField
                      type="number"
                      label="Class Score"
                      size="small"
                      value={values.classScore}
                      onChange={handleChange("classScore")}
                      error={Boolean(errors.classScore)}
                      helperText={touched.classScore && errors.classScore}
                    />
                    <TextField
                      type="number"
                      label="Exams Score"
                      size="small"
                      value={values.examsScore}
                      onChange={handleChange("examsScore")}
                      error={Boolean(errors.examsScore)}
                      helperText={touched.examsScore && errors.examsScore}
                    />
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      disabled={!isValid || !dirty}
                    >
                      Add Score
                    </Button>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={7} padding={2}>
                  <Typography>Scores Preview</Typography>
                  <ExamsScoreTable
                    data={scoreList || []}
                    setData={setScoreList}
                  />
                </Grid>
              </Grid>
            </>
          </>
        );
      }}
    </Formik>
  );
};

export default ExamsScoreInput;
