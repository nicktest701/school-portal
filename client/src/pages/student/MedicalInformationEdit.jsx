import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { Formik } from 'formik';
import { Dialog, DialogContent, TextField } from '@mui/material';
import { SaveAs } from '@mui/icons-material';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import CustomFormControl from '../../components/inputs/CustomFormControl';
import MedicalAllergy from '../../components/items/MedicalAllergy';
import { medicalValidationSchema } from '../../config/validationSchema';
import { useSearchParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStudentMedicalHistory } from '../../api/studentAPI';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';

const MedicalInformationEdit = ({ medical }) => {
  const queryClient = useQueryClient();
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateStudentMedicalHistory,
  });
  const onSubmit = (values, options) => {
    // console.log(values);

    mutateAsync(values, {
      onSettled: () => {
        queryClient.invalidateQueries(['student-by-id']);
        options.setSubmitting(false);
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

  const handleClose = () =>
    setSearchParams({
      open: 'false',
    });

  return (
    <Dialog
      open={searchParams.get('open') === 'true'}
      maxWidth='sm'
      fullWidth
      onClose={handleClose}
    >
      <CustomDialogTitle title='Medical History' onClose={handleClose} />
      <DialogContent>
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
                  <Button
                    loading={isSubmitting || isPending}
                    variant='contained'
                    color='primary'
                    onClick={handleSubmit}
                    endIcon={<SaveAs />}
                  >
                    Save Changes
                  </Button>
                </Stack>
                {/* <Typography
                  variant='body2'
                  color='primary.main'
                  sx={{ fontWeight: 'bold' }}
                >
                  Medical Records
                </Typography>
                <Typography variant='body2' color='primary.main'>
                  (Kindly note that this section, even though required, will not
                  affect your child’s admission into the school).
                </Typography> */}
                <Stack width={{ xs: '100%', md: '80%' }} py={5}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
                    }}
                  >
                    <MedicalAllergy
                      title='1. Heart Disease'
                      value={values?.heartDisease}
                      setValue={handleChange('heartDisease')}
                    />
                    <MedicalAllergy
                      title='2. Visual Impairment'
                      value={values?.visualImpairment}
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
                      value={values?.asthma}
                      setValue={handleChange('asthma')}
                    />
                    <MedicalAllergy
                      title='4. Hearing Impairment'
                      value={values?.hearingImpairment}
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
                      value={values?.siezures}
                      setValue={handleChange('siezures')}
                    />
                    <MedicalAllergy
                      title='6. Physical Disability'
                      value={values?.physicalDisability}
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
      </DialogContent>
    </Dialog>
  );
};

MedicalInformationEdit.propTypes = {};

export default MedicalInformationEdit;
