import { FormControlLabel, Radio, Stack, Typography } from '@mui/material';

function MedicalAllergyItem({ title, value }) {
  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      spacing={3}
      pr={6}
    >
      <Typography textAlign='right' fontSize={11}>
        {title}
      </Typography>

      <FormControlLabel
        sx={{
          fontSize: 11,
        }}
        value={value}
        control={<Radio size='small' checked />}
        label={value}
        slotProps={{
          typography: {
            sx: {
              fontSize: 11,
            },
          },
        }}
      />
    </Stack>
  );
}

export default MedicalAllergyItem;
