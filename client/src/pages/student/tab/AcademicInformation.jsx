import React, { useContext, useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import LoadingButton from '@mui/lab/LoadingButton';
import CustomFormControl from '../../../components/inputs/CustomFormControl';
import { Formik } from 'formik';
import { StudentContext } from '../../../context/providers/StudentProvider';
import _ from 'lodash';
import useLevel from '../../../components/hooks/useLevel';
import ConfirmStudent from './ConfirmStudent';
import { useDropzone } from 'react-dropzone';
import { Add, AddToDrive, ArrowForward } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { TOWNS } from '../../../mockup/data/towns';
import { studentCurrentLevelValidationSchema } from '../../../config/validationSchema';

const AcademicInformation = ({ setMode }) => {
  const {
    studentState: {
      newStudent: { academic },
    },
    studentDispatch,
  } = useContext(StudentContext);

  const [openConfirmStudent, setOpenConfirmStudent] = useState(false);
  const [report, setReport] = useState(academic?.previousSchool?.report);

  const { levelsOption } = useLevel();

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    accept: {
      'image/*': ['.jpeg', '.png', '.webp'],
      'application/pdf': ['.pdf'],
    },

    multiple: false,
    onDrop: (acceptedFiles) => {
      if (!_.isEmpty(acceptedFiles)) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const reportURL = event.target.result;
          setReport(reportURL);
        };

        reader.readAsDataURL(acceptedFiles[0]);
      }
    },
  });

  const onSubmit = (values, options) => {
    values.previousSchool.report = report;

    studentDispatch({
      type: 'addNewStudent',
      payload: {
        academic: {
          ...values,
          isCompleted: true,
        },
      },
    });

    options.setSubmitting(false);

    setOpenConfirmStudent(true);
  };

  return (
    <>
      <Formik
        initialValues={academic}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={studentCurrentLevelValidationSchema}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => {
          return (
            <Stack py={2} spacing={1}>
              <Stack direction='row' justifyContent='flex-end' spacing={2}>
                <LoadingButton
                  loading={isSubmitting}
                  variant='contained'
                  color='primary'
                  onClick={handleSubmit}
                  endIcon={<ArrowForward />}
                >
                  Continue
                </LoadingButton>
              </Stack>
              <Typography
                variant='body2'
                color='primary.main'
                sx={{ fontWeight: 'bold' }}
              >
                Academic Records
              </Typography>
              <CustomFormControl>
                <Autocomplete
                  fullWidth
                  size='small'
                  options={levelsOption}
                  noOptionsText='No Level available'
                  getOptionLabel={(option) => option.type || ''}
                  isOptionEqualToValue={(option, value) =>
                    value._id === undefined ||
                    value._id === '' ||
                    value._id === option._id
                  }
                  value={values.level}
                  onChange={(e, value) => setFieldValue('level', value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Current Level'
                      fullWidth
                      size='small'
                      error={Boolean(
                        touched?.level?.type && errors?.level?.type
                      )}
                      helperText={touched?.level?.type && errors?.level?.type}
                    />
                  )}
                />
              </CustomFormControl>

              <Typography
                variant='body2'
                color='primary.main'
                sx={{ fontWeight: 'bold' }}
              >
                Previous School Records
              </Typography>
              <CustomFormControl>
                <TextField
                  label='School Name'
                  type='text'
                  fullWidth
                  size='small'
                  value={values?.previousSchool?.name}
                  onChange={handleChange('previousSchool.name')}
                  error={Boolean(
                    touched?.previousSchool?.name &&
                      errors?.previousSchool?.name
                  )}
                  helperText={
                    touched?.previousSchool?.name &&
                    errors?.previousSchool?.name
                  }
                />

                <Autocomplete
                  freeSolo
                  fullWidth
                  size='small'
                  options={TOWNS}
                  loadingText='Please wait....'
                  noOptionsText='No Town available'
                  getOptionLabel={(option) => option || ''}
                  value={values?.previousSchool?.location}
                  onInputChange={(e, value) =>
                    setFieldValue('previousSchool.location', value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Location'
                      fullWidth
                      size='small'
                      error={Boolean(
                        touched?.previousSchool?.location &&
                          errors?.previousSchool?.location
                      )}
                      helperText={
                        touched?.previousSchool?.location &&
                        errors?.previousSchool?.location
                      }
                    />
                  )}
                />
              </CustomFormControl>
              <Typography
                variant='body2'
                color='primary.main'
                sx={{ fontWeight: 'bold' }}
              >
                A copy of the most recent school report
              </Typography>

              <Stack
                padding={2}
                spacing={1}
                {...getRootProps({ className: 'dropzone' })}
                style={{ border: '1px dashed black' }}
              >
                <Stack
                  spacing={2}
                  justifyContent='center'
                  alignItems='center'
                  paddingY={1}
                >
                  <Avatar
                    variant='square'
                    src={report}
                    sx={{ width: 120, height: 120 }}
                  >
                    <Add />
                  </Avatar>

                  <Stack>
                    <input {...getInputProps()} />
                    <Typography textAlign='center' paragraph>
                      Drag & drop your report here
                    </Typography>
                    <Button
                      variant='outlined'
                      onClick={open}
                      startIcon={<AddToDrive />}
                    >
                      Upload Report
                    </Button>
                  </Stack>

                  {!_.isEmpty(report) && (
                    <iframe
                      style={{ width: '100%', height: '5in' }}
                      src={report}
                    ></iframe>
                  )}
                </Stack>
              </Stack>
            </Stack>
          );
        }}
      </Formik>

      <ConfirmStudent
        open={openConfirmStudent}
        setOpen={setOpenConfirmStudent}
        setMode={setMode}
      />
    </>
  );
};

AcademicInformation.propTypes = {};

export default AcademicInformation;
