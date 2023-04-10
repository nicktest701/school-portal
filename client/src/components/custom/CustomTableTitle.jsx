import React from 'react';
import { Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
function CustomTableTitle({ icon, title }) {
  return (
    <Stack
      direction='row'
      columnGap={2}
      justifyContent='center'
      alignItems='center'
    >
      <img alt='ico' src={icon} style={{ width: '45px', heigth: '45px' }} />
      <Typography variant='h5'>{title}</Typography>
    </Stack>
  );
}

CustomTableTitle.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
};
export default CustomTableTitle;
