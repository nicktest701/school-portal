import React from 'react';
import PropTypes from 'prop-types';
import CloseSharp from '@mui/icons-material/CloseSharp';
import { DialogTitle, IconButton, Stack, Typography } from '@mui/material';

function CustomDialogTitle({ title, subtitle, onClose }) {
  return (
    <DialogTitle>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='h6'>{title}</Typography>
        {onClose && (
          <IconButton onClick={onClose}>
            <CloseSharp />
          </IconButton>
        )}
      </Stack>
      {subtitle && (
        <Typography variant='body2' color='secondary.main'>
          {subtitle}
        </Typography>
      )}
      {/* <Divider /> */}
    </DialogTitle>
  );
}

CustomDialogTitle.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export default CustomDialogTitle;
