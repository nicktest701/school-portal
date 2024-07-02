import React from 'react';
import PropTypes from 'prop-types';
import { ArrowBackRounded,  } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Back = ({ to, color, bg }) => {
  const navigate = useNavigate();
  const goBack = () => navigate(to || -1);
  return (
    <Box
      sx={{
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        my:1
      }}
    >
      <IconButton
        onClick={goBack}
        sx={{ bgcolor: bg || 'rgba(1, 46, 84,0.1)' }}
      >
        <ArrowBackRounded sx={{ color: color || '#fff' }} />
      </IconButton>
    </Box>
  );
};

Back.propTypes = {
  color: PropTypes.string,
  bg: PropTypes.string,
};
export default Back;
