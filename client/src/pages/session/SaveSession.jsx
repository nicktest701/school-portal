import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  TextField,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/system';

// Form validation schema
const formSchema = yup.object({
  core: yup.object({
    academicYear: yup.string().required('Academic year is required'),
    sessionName: yup.string().required('Session name is required'),
    startDate: yup.date().required('Start date is required'),
    endDate: yup.date().required('End date is required')
  }),
  semester: yup.object({
    semesterName: yup.string().required('Semester name is required'),
    registrationDeadline: yup.date().required('Registration deadline is required')
  }),
  academic: yup.object({
    midtermDate: yup.date().required('Midterm date is required'),
    finalExamDate: yup.date().required('Final exam date is required')
  }),
  financial: yup.object({
    tuitionDueDate: yup.date().required('Tuition due date is required'),
    lateFeePerDay: yup.number().positive('Must be positive').required()
  })
});

const steps = ['Core Session', 'Semester Details', 'Academic Calendar', 'Financial Info'];

const FormContainer = styled('div')({
  position: 'relative',
  height: '400px',
  overflow: 'hidden'
});

const FormStep = styled('div')(({ theme, active }) => ({
  position: 'absolute',
  width: '100%',
  transition: 'transform 0.3s ease-in-out',
  transform: active ? 'translateX(0)' : 'translateX(100%)',
  padding: theme.spacing(3)
}));

export default function SaveSession() {
  const [activeStep, setActiveStep] = useState(0);
  const { register, handleSubmit, trigger, formState: { errors } } = useForm({
    resolver: yupResolver(formSchema),
    mode: 'onChange'
  });

  const handleNext = async () => {
    const stepKey = steps[activeStep].toLowerCase().replace(' ', '');
    const isValid = await trigger(stepKey);
    
    if (isValid) {
      setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = (data) => {
    console.log('Form data:', data);
    // Handle form submission
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: 'auto' }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          {/* Core Session Step */}
          <FormStep active={activeStep === 0}>
            <Typography variant="h6" gutterBottom>Core Session Details</Typography>
            
            <TextField
              label="Academic Year"
              fullWidth
              margin="normal"
              {...register('core.academicYear')}
              error={!!errors.core?.academicYear}
              helperText={errors.core?.academicYear?.message}
            />

            <TextField
              label="Session Name"
              fullWidth
              margin="normal"
              {...register('core.sessionName')}
              error={!!errors.core?.sessionName}
              helperText={errors.core?.sessionName?.message}
            />

            <TextField
              label="Start Date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              {...register('core.startDate')}
              error={!!errors.core?.startDate}
              helperText={errors.core?.startDate?.message}
            />
          </FormStep>

          {/* Semester Details Step */}
          <FormStep active={activeStep === 1}>
            <Typography variant="h6" gutterBottom>Semester Details</Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel>Semester Name</InputLabel>
              <Select
                label="Semester Name"
                {...register('semester.semesterName')}
                error={!!errors.semester?.semesterName}
              >
                <MenuItem value="Fall">Fall</MenuItem>
                <MenuItem value="Spring">Spring</MenuItem>
                <MenuItem value="Summer">Summer</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Registration Deadline"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              {...register('semester.registrationDeadline')}
              error={!!errors.semester?.registrationDeadline}
              helperText={errors.semester?.registrationDeadline?.message}
            />
          </FormStep>

          {/* Academic Calendar Step */}
          <FormStep active={activeStep === 2}>
            <Typography variant="h6" gutterBottom>Academic Calendar</Typography>

            <TextField
              label="Midterm Date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              {...register('academic.midtermDate')}
              error={!!errors.academic?.midtermDate}
              helperText={errors.academic?.midtermDate?.message}
            />

            <TextField
              label="Final Exam Date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              {...register('academic.finalExamDate')}
              error={!!errors.academic?.finalExamDate}
              helperText={errors.academic?.finalExamDate?.message}
            />
          </FormStep>

          {/* Financial Info Step */}
          <FormStep active={activeStep === 3}>
            <Typography variant="h6" gutterBottom>Financial Information</Typography>

            <TextField
              label="Tuition Due Date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              {...register('financial.tuitionDueDate')}
              error={!!errors.financial?.tuitionDueDate}
              helperText={errors.financial?.tuitionDueDate?.message}
            />

            <TextField
              label="Late Fee Per Day ($)"
              type="number"
              fullWidth
              margin="normal"
              {...register('financial.lateFeePerDay')}
              error={!!errors.financial?.lateFeePerDay}
              helperText={errors.financial?.lateFeePerDay?.message}
            />
          </FormStep>
        </FormContainer>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
            variant="outlined"
          >
            Back
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button type="submit" variant="contained" color="primary">
              Create Session
            </Button>
          ) : (
            <Button onClick={handleNext} variant="contained">
              Next
            </Button>
          )}
        </Box>
      </form>
    </Paper>
  );
}