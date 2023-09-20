import React from 'react';
import { Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
const ProfileItem = ({ label, text }) => {
  return (
    <Stack direction='row' columnGap={5} paddingY={1}>
      <Typography
        fontSize={12}
        sx={{ width: '30%', whiteSpace: 'nowrap', fontWeight: 'bold' }}
      >
        {label}
      </Typography>
      <Typography
        fontSize={12}
        color='primary'
        sx={{ width: '50%', textTransform: 'capitalize' }}
      >
        {text}
      </Typography>
    </Stack>
  );
};

ProfileItem.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string,
};

export default ProfileItem;
