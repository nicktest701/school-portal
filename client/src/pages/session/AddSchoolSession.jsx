import React, { useContext, useState } from 'react';

import {
  Stack,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Divider,
  FormLabel,
} from '@mui/material';
import moment from 'moment';
import { Formik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import LoadingButton from '@mui/lab/LoadingButton';
import { postTerm } from '../../api/termAPI';
import { sessionValidationSchema } from '../../config/validationSchema';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';
import { sessionInitialValues } from '../../config/initialValues';
import { SCHOOL_TERMS } from '../../mockup/columns/sessionColumns';
import Transition from '../../components/animations/Transition';
import CustomDatePicker from '../../components/inputs/CustomDatePicker';
import CustomYearPicker from '../../components/inputs/CustomYearPicker';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';

const AddSchoolSession = ({ open, setOpen }) => {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const queryClient = useQueryClient();
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  //ADD New Session
  const { mutateAsync } = useMutation({
    mutationFn: postTerm,
  });

  const currentYear = new Date().getFullYear();
  const onSubmit = (values, options) => {
    values.academicYear = `${startYear || currentYear}/${
      endYear || currentYear
    }`;

    // console.log(values);

    mutateAsync(values, {
      onSettled: () => {
        options.setSubmitting(false);
        queryClient.invalidateQueries(['terms']);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
        handleCloseAddSession();
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
    options.setSubmitting(false);
  };

  const handleCloseAddSession = () => setOpen(false);

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth='xs'
      TransitionComponent={Transition}
    >
      <CustomDialogTitle title='Add Session' onClose={handleCloseAddSession} />
      <Formik
        initialValues={{
          ...sessionInitialValues,
          from: startDate.format('l'),
          to: endDate.format('l'),
        }}
        onSubmit={onSubmit}
        validationSchema={sessionValidationSchema}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => {
          return (
            <>
              <DialogContent>
                <Stack spacing={2} paddingY={2}>
                  <FormLabel sx={{ fontSize: 13 }}>Academic Year</FormLabel>
                  <Stack direction='row' columnGap={2}>
                    <CustomYearPicker
                      label='From'
                      year={startYear}
                      setYear={setStartYear}
                    />
                    <CustomYearPicker
                      label='To'
                      year={endYear}
                      setYear={setEndYear}
                    />
                  </Stack>
                  <CustomDatePicker
                    label='Start of Academic Term/Semester'
                    date={startDate}
                    setDate={setStartDate}
                    touched={touched.from}
                    error={errors.from}
                  />
                  <CustomDatePicker
                    label='End of Academic Term/Semester'
                    date={endDate}
                    setDate={setEndDate}
                    touched={touched.to}
                    error={errors.to}
                  />

                  <TextField
                    select
                    label='Term/Semester'
                    size='small'
                    value={values.term}
                    onChange={handleChange('term')}
                    error={Boolean(touched.term && errors.term)}
                    helperText={touched.term && errors.term}
                  >
                    {SCHOOL_TERMS.length !== 0 ? (
                      SCHOOL_TERMS.map((term) => (
                        <MenuItem key={term} value={term}>
                          {term}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>No Term Available </MenuItem>
                    )}
                  </TextField>
                  <Divider />
                </Stack>
              </DialogContent>
              <DialogActions sx={{ padding: 2 }}>
                <LoadingButton
                  loading={isSubmitting}
                  variant='contained'
                  onClick={handleSubmit}
                >
                  Save
                </LoadingButton>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default AddSchoolSession;
