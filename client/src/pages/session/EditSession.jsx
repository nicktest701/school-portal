import React, { useContext, useEffect, useState } from 'react';
import {
  Stack,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import { Formik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoadingButton } from '@mui/lab';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import { putTerm } from '../../api/termAPI';
import {
  alertSuccess,
  alertError,
} from '../../context/actions/globalAlertActions';
import Transition from '../../components/animations/Transition';
import moment from 'moment';
import CustomDatePicker from '../../components/inputs/CustomDatePicker';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
const EditSession = () => {
  const {
    schoolSessionState: {
      editSession: { open, data },
    },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const queryClient = useQueryClient();

  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [vacationDate, setVacationDate] = useState(null);
  const [reOpeningDate, setReOpeningDate] = useState(null);

  useEffect(() => {
    setFrom(moment(new Date(data.from)));
    setTo(moment(new Date(data.to)));
    setVacationDate(moment(new Date(data.vacationDate)));
    setReOpeningDate(moment(new Date(data.reOpeningDate)));
  }, [data]);
  //initial states
  const initialValues = {
    id: data.termId,
    from,
    to,
    vacationDate,
    reOpeningDate,
    academicYear: data.academicYear,
    term: data.term,
    session: data.sessionId,
  };

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: putTerm,
  });

  const onSubmit = (values, options) => {
    //console.log(values);
    mutateAsync(values, {
      onSettled: () => {
        options.setSubmitting(false);
        queryClient.invalidateQueries(['terms']);
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

  //Edit session
  const handleClose = () => {
    schoolSessionDispatch({
      type: 'editSession',
      payload: {
        open: false,
        data: {},
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='xs'
      TransitionComponent={Transition}
    >
      <CustomDialogTitle title='Edit Session' onClose={handleClose} />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ values, touched, errors, handleChange, handleSubmit }) => {
          return (
            <>
              <DialogContent>
                <Stack spacing={2} paddingY={2}>
                  <TextField
                    label='Academic Year'
                    InputProps={{ readOnly: true }}
                    value={values.academicYear}
                    size='small'
                  />
                  <CustomDatePicker
                    label='Start of Academic Term'
                    date={from}
                    setDate={setFrom}
                    touched={touched.from}
                    error={errors.from}
                    readOnly={true}
                  />
                  <CustomDatePicker
                    label='End of Academic Term'
                    date={to}
                    setDate={setTo}
                    touched={touched.to}
                    error={errors.to}
                    readOnly={true}
                  />

                  <TextField
                    label='Term/Semester'
                    size='small'
                    value={values.term}
                    onChange={handleChange('term')}
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  <Typography fontSize={13}>Vacation</Typography>
                  <CustomDatePicker
                    label='Vacation Date'
                    date={vacationDate}
                    setDate={setVacationDate}

                    // touched={touched.to}
                    // error={errors.to}
                  />

                  <CustomDatePicker
                    label='Next Term Begins'
                    date={reOpeningDate}
                    setDate={setReOpeningDate}
                    // touched={touched.to}
                    // error={errors.to}
                  />
                  <Divider />
                </Stack>
              </DialogContent>
              <DialogActions sx={{ padding: 2 }}>
                <LoadingButton
                  loading={isLoading}
                  variant='contained'
                  onClick={handleSubmit}
                >
                  {isLoading ? 'Please Wait..' : 'Save Changes'}
                </LoadingButton>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default EditSession;

/* <TextField
  // type={isMobile() ? "date" : "text"}
  //                   label="Vacation Date"
  //                   size="small"
  //                   onFocus={(e) =>
  //                     !isMobile() && (e.currentTarget.type = "date")
  //                   }
  //                   onBlur={(e) =>
  //                     !isMobile() && (e.currentTarget.type = "text")
  //                   }
  //                   value={values.vacationDate}
  //                   onChange={handleChange("vacationDate")}
  //                 /> */
/* <TextField
                    type={isMobile() ? "date" : "text"}
                    label="Next Term Begins"
                    size="small"
                    onFocus={(e) =>
                      !isMobile() && (e.currentTarget.type = "date")
                    }
                    onBlur={(e) =>
                      !isMobile() && (e.currentTarget.type = "text")
                    }
                    value={values.reOpeningDate}
                    onChange={handleChange("reOpeningDate")}
                  /> */
/* <TextField
                    type={isMobile() ? "date" : "text"}
                    label="Vacation Date"
                    size="small"
                    onFocus={(e) =>
                      !isMobile() && (e.currentTarget.type = "date")
                    }
                    onBlur={(e) =>
                      !isMobile() && (e.currentTarget.type = "text")
                    }
                    value={values.vacationDate}
                    onChange={handleChange("vacationDate")}
                  /> */
/* <TextField
                    type={isMobile() ? "date" : "text"}
                    label="Next Term Begins"
                    size="small"
                    onFocus={(e) =>
                      !isMobile() && (e.currentTarget.type = "date")
                    }
                    onBlur={(e) =>
                      !isMobile() && (e.currentTarget.type = "text")
                    }
                    value={values.reOpeningDate}
                    onChange={handleChange("reOpeningDate")}
                  /> */
