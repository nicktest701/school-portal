import React from 'react';
import PropTypes from 'prop-types';
import { ArrowBackRounded,  } from '@mui/icons-material';
import { Container, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Back = ({ to, color, bg }) => {
  const navigate = useNavigate();
  const goBack = () => navigate(to || -1);
  return (
    <Container
      sx={{
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <IconButton
        onClick={goBack}
        sx={{ bgcolor: bg || 'rgba(1, 46, 84,0.1)' }}
      >
        <ArrowBackRounded sx={{ color: color || '#fff' }} />
      </IconButton>
    </Container>
  );
};

Back.propTypes = {
  color: PropTypes.string,
  bg: PropTypes.string,
};
export default Back;
