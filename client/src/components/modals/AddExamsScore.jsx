import React, { useState } from "react";
import {
  Stack,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
  Alert,
  List,
  Grid2,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { Formik } from "formik";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import ExamsScoreItem from "../list/ExamsScoreItem";
import { generateGrade } from "../../config/generateGrade";
import { useParams } from "react-router-dom";
import { getSubjectsForLevel } from "../../api/levelAPI";
import { postExams } from "../../api/ExaminationAPI";
import { examsScoreValidationSchema } from "../../config/validationSchema";
import CustomDialogTitle from "../dialog/CustomDialogTitle";
const AddExamsScore = ({ open, setOpen, levelId }) => {
  const { examsId } = useParams();
  const queryClient = useQueryClient();
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [scoreList, setScoreList] = useState([]);

  const [msgs, setMsgs] = useState({
    severity: "",
    text: "",
  });

  useQuery({
    queryKey: ["subjects"],
    queryFn: () => getSubjectsForLevel(levelId),
    enabled: !!levelId,
    onSuccess: ({ subjects }) => {
      setSubjectOptions(subjects);
    },
  });

  const initialValues = {
    subject: "",
    classScore: 0,
    examsScore: 0,
  };

  const title = {
    subject: "Subject",
    classScore: "Class",
    examsScore: "Exams",
    totalScore: "Total",
    grade: "Grade",
  };

  const onSubmit = (values, options) => {
    const summary = generateGrade(values.classScore, values.examsScore);
    const score = {
      ...values,
      ...summary,
    };
    const filteredScoreList = _.merge(
      _.keyBy([...scoreList, score], "subject")
    );
    setScoreList(_.values(filteredScoreList));
    options.resetForm();
  };

  //Remove Subject from Score List
  const handleRemoveSubject = (searchSubject) => {
    setScoreList((prev) => {
      const filteredScoreList = prev.filter(
        ({ subject }) => subject !== searchSubject
      );
      return filteredScoreList;
    });
  };

  const {isPending, mutateAsync } = useMutation({ mutationFn: postExams });

  //Handle Save Results
  const handleSaveResults = () => {
    const data = {
      examsId,
      scores: scoreList,
    };

    mutateAsync(data, {
      onSettled: () => {
        queryClient.invalidateQueries(["student-records"]);
      },
      onSuccess: () => {
        setMsgs({
          severity: "info",
          text: "Student Scores updated successfully!!!",
        });
      },
    });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
      <CustomDialogTitle title="Student Assessment Information" />
      <Formik
        initialValues={initialValues}
        validationSchema={examsScoreValidationSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
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
              <DialogContent>
                <Grid2 container spacing={2} rowGap={2}>
                  <Grid2 item xs={12} md={6} padding={2}>
                    <Stack spacing={2} paddingY={2}>
                      <Autocomplete
                        freeSolo
                        options={subjectOptions}
                        getOptionLabel={(option) => option || ""}
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
                    </Stack>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleSubmit}
                    >
                      Add
                    </Button>
                  </Grid2>
                  <Grid2 item xs={12} md={6} padding={2}>
                    <Stack>
                      <Typography variant="caption">Preview</Typography>
                      <ExamsScoreItem item={title} title={true} />
                      <List sx={{ maxHeight: 300, overflowY: "scroll" }}>
                        {scoreList.map((item) => (
                          <ExamsScoreItem
                            key={item.subject}
                            item={item}
                            removeSubject={handleRemoveSubject}
                          />
                        ))}
                      </List>
                    </Stack>
                  </Grid2>
                </Grid2>
              </DialogContent>
              <DialogActions sx={{ padding: 2 }}>
                <Button
                loading={isPending}
                  variant="contained"
                  disabled={scoreList.length === 0 ? true : false}
                  onClick={handleSaveResults}
                >
                  Save Results
                </Button>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default AddExamsScore;
