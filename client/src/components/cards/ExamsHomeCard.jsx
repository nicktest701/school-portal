import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
function ExamsHomeCard({ title, value, icon, color }) {
  return (
    <Stack
      direction='row'
      spacing={2}
      sx={{
        bgcolor:'white',
        borderRadius: 1,
        padding: 2,
        border: `1px solid lightgray`,
        borderLeft: `2px solid #012E54`,
      }}
    >
      <Avatar
        sx={{
          width: 50,
          height: 50,
          color: `${color}.dark`,
          bgcolor: `${color}.lighter`,
        }}
      >
        {icon}
      </Avatar>

      <Stack spacing={1}>
        <Typography variant='body2'>{title}</Typography>
        <Typography variant='h5'>{value}</Typography>
      </Stack>
    </Stack>
  );
}
ExamsHomeCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
  icon: PropTypes.node,
  color: PropTypes.string,
};

export default ExamsHomeCard;
