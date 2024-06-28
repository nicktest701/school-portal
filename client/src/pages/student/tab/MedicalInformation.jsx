import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import CustomFormControl from '../../../components/inputs/CustomFormControl';
import { Formik } from 'formik';
import { StudentContext } from '../../../context/providers/StudentProvider';
import MedicalAllergy from '../../../components/items/MedicalAllergy';
import { TextField } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { medicalValidationSchema } from '../../../config/validationSchema';

const MedicalInformation = ({ setMode }) => {
  const {
    studentState: {
      newStudent: { medical },
    },
    studentDispatch,
  } = useContext(StudentContext);

  const onSubmit = (values, options) => {
    studentDispatch({
      type: 'addNewStudent',
      payload: {
        medical: {
          ...values,
          isCompleted: true,
        },
      },
    });

    options.setSubmitting(false);
    setMode('academic-info');
  };

  return (
    <Formik
      initialValues={medical}
      onSubmit={onSubmit}
      enableReinitialize={true}
      validationSchema={medicalValidationSchema}
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
          <Stack padding={2} spacing={1}>
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
           variant='h5'
           color='primary.main'
           bgcolor='whitesmoke'
           p={1}
           sx={{ fontWeight: 'bold' }}
            >
              Medical Records
            </Typography>
            <Typography variant='body2' color='primary.main'>
              (Kindly note that this section, even though required, will not
              affect your child’s admission into the school).
            </Typography>
            <Stack width={{ xs: '100%', md: '80%' }} py={5}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
                }}
              >
                <MedicalAllergy
                  title='1. Heart Disease'
                  value={values.heartDisease}
                  setValue={handleChange('heartDisease')}
                />
                <MedicalAllergy
                  title='2. Visual Impairment'
                  value={values.visualImpairment}
                  setValue={handleChange('visualImpairment')}
                />
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
                }}
              >
                <MedicalAllergy
                  title='3. Asthma'
                  value={values.asthma}
                  setValue={handleChange('asthma')}
                />
                <MedicalAllergy
                  title='4. Hearing Impairment'
                  value={values.hearingImpairment}
                  setValue={handleChange('hearingImpairment')}
                />
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
                }}
              >
                <MedicalAllergy
                  title='5. Siezures'
                  value={values.siezures}
                  setValue={handleChange('siezures')}
                />
                <MedicalAllergy
                  title='6. Physical Disability'
                  value={values.physicalDisability}
                  setValue={handleChange('physicalDisability')}
                />
              </div>
            </Stack>
            <Stack py={2} spacing={1}>
              <Typography
                variant='body2'
                color='primary.main'
                sx={{ fontWeight: 'bold' }}
              >
                Emergency Contact
              </Typography>
              <CustomFormControl>
                <TextField
                  label='Fullname'
                  type='text'
                  fullWidth
                  size='small'
                  value={values?.emergencyContact?.fullname}
                  onChange={handleChange('emergencyContact.fullname')}
                  error={Boolean(
                    touched?.emergencyContact?.fullname &&
                      errors?.emergencyContact?.fullname
                  )}
                  helperText={
                    touched?.emergencyContact?.fullname &&
                    errors?.emergencyContact?.fullname
                  }
                />
                <TextField
                  label='Telephone No.'
                  inputMode='tel'
                  type='tel'
                  fullWidth
                  size='small'
                  value={values?.emergencyContact?.phonenumber}
                  onChange={handleChange('emergencyContact.phonenumber')}
                  error={Boolean(
                    touched?.emergencyContact?.phonenumber &&
                      errors?.emergencyContact?.phonenumber
                  )}
                  helperText={
                    touched?.emergencyContact?.phonenumber &&
                    errors?.emergencyContact?.phonenumber
                  }
                />
              </CustomFormControl>

              <CustomFormControl>
                <TextField
                  label='Address'
                  fullWidth
                  size='small'
                  row={3}
                  maxRows={3}
                  value={values?.emergencyContact?.address}
                  onChange={handleChange('emergencyContact.address')}
                  error={Boolean(
                    touched?.emergencyContact?.address &&
                      errors?.emergencyContact?.address
                  )}
                  helperText={
                    touched?.emergencyContact?.address &&
                    errors?.emergencyContact?.address
                  }
                />
              </CustomFormControl>
            </Stack>
          </Stack>
        );
      }}
    </Formik>
  );
};

MedicalInformation.propTypes = {};

export default MedicalInformation;
