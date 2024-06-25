import React, { useContext } from 'react';
import { examsScoreValidationSchema } from '../../config/validationSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { generateCustomGrade } from '../../config/generateCustomGrade';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import { updateExams } from '../../api/ExaminationAPI';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';
import { Formik } from 'formik';
import { Dialog, DialogContent, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import { UserContext } from '../../context/providers/UserProvider';

function AddCourseResults() {
  const {
    userState: { session },
  } = useContext(UserContext);

  const {
    schoolSessionState: {
      addStudentResults: { open, data, grade },
    },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: updateExams,
  });
  const onSubmit = (values) => {
    const total = Number(values.classScore) + Number(values.examsScore);
    const summary = generateCustomGrade(total, grade);

    const result = {
      session: {
        sessionId: session?.sessionId,
        termId: session?.termId,
        levelId: session?.levelId,
        studentId: values?._id,
      },
      scores: [
        {
          subject: values?.subject,
          classScore: values?.classScore,
          examsScore: values?.examsScore,

          ...summary,
        },
      ],
    };

    // console.log(result);

    mutateAsync(result, {
      onSettled: () => {
        queryClient.invalidateQueries(['student-records']);
        queryClient.invalidateQueries(['exams-scores']);
        queryClient.invalidateQueries(['exams-details']);
        queryClient.invalidateQueries(['exams-reports']);
        queryClient.invalidateQueries(['exams-by-id']);
        queryClient.invalidateQueries(['subject-score']);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        handleClose();
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  const handleClose = () => {
    schoolSessionDispatch({
      type: 'addStudentResults',
      payload: {
        open: false,
        data: {
          _id: '',
          level: '',
          classScore: '',
          examsScore: '',
          totalScore: '',
          grade: '',
          remarks: '',
        },
        grade,
      },
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
      <CustomDialogTitle title='New Level' onClose={handleClose} />
      <DialogContent>
        <Formik
          initialValues={data}
          validationSchema={examsScoreValidationSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => {
            return (
              <>
                <Stack spacing={2} paddingY={2}>
                  <TextField
                    label='Subject'
                    size='small'
                    value={values.subject}
                    onChange={handleChange('subject')}
                    error={Boolean(errors.subject)}
                    helperText={touched.subject && errors.subject}
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

                  <LoadingButton
                    loading={isLoading}
                    variant='contained'
                    size='small'
                    onClick={handleSubmit}
                  >
                    Save Results
                  </LoadingButton>
                </Stack>
              </>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default AddCourseResults;
