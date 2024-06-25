import { Stepper } from '@mui/material';
import React, { useContext } from 'react';
import CustomStepperItem from './CustomStepperItem';
import { StudentContext } from '../../context/providers/StudentProvider';

const CustomStepper = () => {
  const {
    studentState: { newStudent },
  } = useContext(StudentContext);
  return (
    <Stepper
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        py: 2,
      }}
    >
      <CustomStepperItem
        initValue={1}
        title='Personal Details'
        showProgress={true}
        isCompleted={newStudent?.personal?.isCompleted}
      />
      <CustomStepperItem
        initValue={2}
        title='Upload Photo'
        showProgress={true}
        isCompleted={newStudent?.photo?.isCompleted}
      />
      <CustomStepperItem
        initValue={3}
        title='Guardian Information'
        showProgress={true}
        isCompleted={newStudent?.parent?.isCompleted}
      />
      <CustomStepperItem
        initValue={4}
        title='Medical Records'
        showProgress={true}
        isCompleted={newStudent?.medical?.isCompleted}
      />
      <CustomStepperItem
        initValue={5}
        title='Academic Records'
        showProgress={false}
        isCompleted={newStudent?.academic?.isCompleted}
      />
   
    </Stepper>
  );
};

export default CustomStepper;
