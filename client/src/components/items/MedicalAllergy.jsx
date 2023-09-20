import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';

function MedicalAllergy({ title, value, setValue }) {
  return (
    <Stack
      direction='row'
      justifyContent='flex-start'
      alignItems='center'
      spacing={3}
    >
      <Typography
        fontSize={12}
        sx={{ fontWeight: 'bold', width: '40%' }}
      >
        {title}
      </Typography>

      {/* <Divider orientation='vertical' flexItem /> */}
      <RadioGroup
        row
        aria-labelledby='attendance-status'
        name='status'
        value={value}
        onChange={setValue}
      >
        <FormControlLabel
          value='Yes'
          control={<Radio size='small' />}
          label='Yes'
          slotProps={{
            typography: {
              sx: {
                fontSize: 11,
              },
            },
          }}
        />
        <FormControlLabel
          value='No'
          control={<Radio size='small' />}
          label='No'
          slotProps={{
            typography: {
              sx: {
                fontSize: 11,
              },
            },
          }}
        />
      </RadioGroup>
    </Stack>
  );
}

export default MedicalAllergy;
