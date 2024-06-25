import { Stack, Typography } from '@mui/material';

const FeePrintItem = ({ title, value }) => {
  return (
    <Stack direction='row' columnGap={2}>
      <Typography variant='caption'>
        {title}
      </Typography>
      <Typography
        variant='caption'
        flex={1}
        sx={{
          borderBottom: '1px dashed #333',
        }}
        fontWeight='bold'
      >
        {value}
      </Typography>
    </Stack>
  );
};

export default FeePrintItem;
