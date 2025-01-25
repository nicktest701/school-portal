import React, { useContext, useMemo, useState } from 'react';
import { SendRounded } from '@mui/icons-material';

import {
  Stack,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  DialogContent,
  Dialog,
} from '@mui/material';
import { Formik } from 'formik';
import { useMutation } from '@tanstack/react-query';
import CustomDialogTitle from '../dialog/CustomDialogTitle';
import Button from "@mui/material/Button";
import { postMessage } from '../../api/messageAPI';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import Transition from '../animations/Transition';
import {
  messageValidationSchema,
  onlyEmailValidationSchema,
  onlyPhoneValidationSchema,
} from '../../config/validationSchema';

const QuickMessage = () => {
  const {
    schoolSessionState: { quickMessageData },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const [radioValue, setRadioValue] = useState('sms');

  const init = useMemo(() => {
    switch (radioValue) {
      case 'sms':
        return {
          init: {
            type: radioValue,
            phonenumber: quickMessageData?.data?.phonenumber,
            title: '',
            message: '',
          },
          val: onlyPhoneValidationSchema,
        };
      case 'email':
        return {
          init: {
            type: radioValue,
            email: quickMessageData?.data?.email,
            title: '',
            message: '',
          },
          val: onlyEmailValidationSchema,
        };

      default:
        return {
          init: {
            type: radioValue,
            email: quickMessageData?.data?.email,
            phonenumber: quickMessageData?.data?.phonenumber,
            title: '',
            message: '',
          },
          val: messageValidationSchema,
        };
    }
  }, [radioValue, quickMessageData]);

  const { mutateAsync } = useMutation(postMessage);
  const onSubmit = (values, options) => {
    values.rate = 'quick';

    mutateAsync(values, {
      onSettled: () => {
        options.setSubmitting(false);
      },
      onSuccess: (data) => {
        schoolSessionDispatch({
          type: 'showAlert',
          payload: {
            severity: 'info',
            message: data,
          },
        });
        handleClose();
      },
      onError: (error) => {
        schoolSessionDispatch({
          type: 'showAlert',
          payload: {
            severity: 'error',
            message: error,
          },
        });
      },
    });
  };

  //CLOSE
  const handleClose = () => {
    schoolSessionDispatch({
      type: 'sendQuickMessage',
      payload: {
        open: false,
        data: {},
      },
    });
  };

  return (
    <Dialog
      open={quickMessageData.open}
      onClose={handleClose}
      fullWidth
      maxWidth='xs'
      TransitionComponent={Transition}
    >
      <CustomDialogTitle title='Send Message' onClose={handleClose} />
      <Formik
        initialValues={init.init}
        onSubmit={onSubmit}
        validationSchema={init.val}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleSubmit,
        }) => {
          return (
            <>
              <DialogContent>
                <FormControl>
                  <FormLabel id='message-type'>Select type</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby='message-type'
                    name='message-type'
                    value={radioValue}
                    onChange={(e, value) => setRadioValue(value)}
                  >
                    <FormControlLabel
                      value='sms'
                      control={<Radio />}
                      label='SMS'
                    />
                    <FormControlLabel
                      value='email'
                      control={<Radio />}
                      label='Email'
                    />
                    <FormControlLabel
                      value='both'
                      control={<Radio />}
                      label='Both'
                    />
                  </RadioGroup>
                </FormControl>

                <Stack
                  spacing={2}
                  justifyContent='center'
                  alignItems='center'
                  paddingY={2}
                >
                  {(radioValue === 'sms' || radioValue === 'both') && (
                    <TextField
                      label="Recipient's Phone No"
                      required
                      inputMode='tel'
                      size='small'
                      type='tel'
                      fullWidth
                      value={values.phonenumber || ''}
                      onChange={handleChange('phonenumber')}
                      hidden={radioValue === 'email' ? true : false}
                      error={Boolean(touched.phonenumber && errors.phonenumber)}
                      helperText={touched.phonenumber && errors.phonenumber}
                    />
                  )}

                  {(radioValue === 'email' || radioValue === 'both') && (
                    <TextField
                      label="Recipient's Email Address"
                      inputMode='email'
                      type='email'
                      size='small'
                      required
                      fullWidth
                      hidden={radioValue === 'sms' ? true : false}
                      value={values.email || ''}
                      onChange={handleChange('email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  )}

                  <TextField
                    label='Message Title'
                    required
                    fullWidth
                    size='small'
                    value={values.title || ''}
                    onChange={handleChange('title')}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                  />

                  <TextField
                    sx={{ textAlign: 'left' }}
                    label='Message'
                    required
                    size='small'
                    multiline
                    rows={4}
                    fullWidth
                    value={values.message || ''}
                    onChange={handleChange('message')}
                    error={Boolean(touched.message && errors.message)}
                    helperText={touched.message && errors.message}
                  />
                </Stack>
                <Button
                  loading={isSubmitting}
                  variant='contained'
                  onClick={handleSubmit}
                  endIcon={<SendRounded />}
                >
                  Send Message
                </Button>
              </DialogContent>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default QuickMessage;

// return (

//     <DialogTitle>Add Level</DialogTitle>
//     <DialogContent></DialogContent>

//     <DialogActions sx={{ padding: 2 }}>
//       <Button onClick={() => setOpen(false)}>Cancel</Button>
//       <Button>Save</Button>
//     </DialogActions>

// );
