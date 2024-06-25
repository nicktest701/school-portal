import React, { useContext, useState } from 'react';
import {
  Stack,
  Button,
  TextField,
  Autocomplete,
  Alert,
  List,
  Grid,
  Container,
} from '@mui/material';
import _ from 'lodash';
import { Formik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoadingButton } from '@mui/lab';

import { updateExams } from '../../api/ExaminationAPI';
import { examsScoreValidationSchema } from '../../config/validationSchema';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import ExamsScoreItem from '../../components/list/ExamsScoreItem';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';
import { generateCustomGrade } from '../../config/generateCustomGrade';

const ExamsScoreInput = ({ setTab, options }) => {
  const { schoolSessionState, schoolSessionDispatch } =
    useContext(SchoolSessionContext);
  const openExamsScore = schoolSessionState.examsScore;

  const queryClient = useQueryClient();

  const [msgs, setMsgs] = useState({
    severity: '',
    text: '',
  });

  const [scoreList, setScoreList] = useState([]);

  const initialValues = {
    subject: '',
    classScore: 0,
    examsScore: 0,
  };

  const title = {
    subject: 'Subject',
    classScore: 'Class',
    examsScore: 'Exams',
    totalScore: 'Total',
    grade: 'Grade',
    remarks: 'Remarks',
  };

  
  const onSubmit = (values, option) => {
    const total = Number(values.classScore) + Number(values.examsScore);
    const summary = generateCustomGrade(total, options?.grades);

    const score = {
      ...values,
      ...summary,
    };
    const filteredScoreList = _.merge(
      _.keyBy([...scoreList, score], 'subject')
    );
    setScoreList(_.values(filteredScoreList));
    option.resetForm();
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

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: updateExams,
  });

  //Handle Save Results
  const handleSaveResults = () => {
    const data = {
      session: openExamsScore.data,
      scores: scoreList,
    };

    mutateAsync(data, {
      onSettled: () => {
        queryClient.invalidateQueries(['student-records']);
        queryClient.invalidateQueries(['exams-scores']);
        queryClient.invalidateQueries(['exams-details']);
        queryClient.invalidateQueries(['exams-reports']);
        queryClient.invalidateQueries(['exams-by-id']);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        setTab('1');
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  //CLOSE FORM
  const handleClose = () =>
    schoolSessionDispatch({
      type: 'openAddExamsScore',
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
                    text: '',
                  })
                }
              >
                {msgs.text}
              </Alert>
            )}
            <Container>
              <Grid container spacing={2} rowGap={2}>
                <Grid item xs={12} md={5} padding={2}>
                  <Stack spacing={2} paddingY={2}>
                    <Autocomplete
                      freeSolo
                      options={options?.subjects}
                      loadingText='Loading Subjects.Please Wait...'
                      getOptionLabel={(option) => option || ''}
                      value={values.subject}
                      onChange={(e, value) => setFieldValue('subject', value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label='Subject'
                          size='small'
                          error={Boolean(errors.subject)}
                          helperText={touched.subject && errors.subject}
                        />
                      )}
                    />
                    <TextField
                      type='number'
                      label='Class Score'
                      size='small'
                      value={values.classScore}
                      onChange={handleChange('classScore')}
                      error={Boolean(errors.classScore)}
                      helperText={touched.classScore && errors.classScore}
                    />
                    <TextField
                      type='number'
                      label='Exams Score'
                      size='small'
                      value={values.examsScore}
                      onChange={handleChange('examsScore')}
                      error={Boolean(errors.examsScore)}
                      helperText={touched.examsScore && errors.examsScore}
                    />
                  </Stack>
                  <Button
                    variant='contained'
                    size='small'
                    onClick={handleSubmit}
                  >
                    Add Score
                  </Button>
                </Grid>
                <Grid item xs={12} md={7} padding={2}>
                  <ExamsScoreItem item={title} title={true} />
                  <List sx={{ maxHeight: 300, overflowY: 'scroll' }}>
                    {scoreList.map((item) => (
                      <ExamsScoreItem
                        key={item.subject}
                        item={item}
                        removeSubject={handleRemoveSubject}
                      />
                    ))}
                  </List>
                </Grid>
              </Grid>

              <Stack spacing={2} direction='row' justifyContent='flex-end'>
                <Button onClick={handleClose}>Cancel</Button>
                <LoadingButton
                  variant='contained'
                  disabled={scoreList.length === 0}
                  onClick={handleSaveResults}
                  loading={isLoading}
                >
                  Save Results
                </LoadingButton>
              </Stack>
            </Container>
          </>
        );
      }}
    </Formik>
  );
};

export default ExamsScoreInput;
