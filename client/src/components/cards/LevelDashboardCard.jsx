import React from 'react';
import { HomeMini } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
const LevelDashboardCard = ({ title, value }) => {
  return (
    <Stack
      sx={{
        backgroundColor: '#fff',
        padding: 2,
        borderRadius: '8px',
        boxShadow: '0px 1px 20px 10px rgba(84,84,84,0.10)',
        borderInlineStart: '2px solid',
        borderBlockStart: '2px solid',
        borderTopLeftRadius: '8px',
        borderImageSource:
          'radial-gradient(circle at top left,#012E54,transparent 50%)',
        borderImageSlice: '1',
      }}
      justifyContent='center'
      alignItems='center'
    >
      <Button startIcon={<HomeMini />}>{title}</Button>

      <Typography variant='h2' color='primary'>
        {value}
      </Typography>
    </Stack>
  );
};
LevelDashboardCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
};

export default LevelDashboardCard;
