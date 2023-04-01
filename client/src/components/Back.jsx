import React from 'react';
import PropTypes from 'prop-types';
import { ArrowBackRounded } from '@mui/icons-material';
import { Container, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Back = ({ color, bg }) => {
  const navigate = useNavigate();
  return (
    <Container
      width='inherit'
      sx={{
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingY: 1,
      }}
    >
      <IconButton
        onClick={() => navigate(-1)}
        sx={{ bgcolor: bg || 'rgba(1, 46, 84,0.1)' }}
      >
        <ArrowBackRounded sx={{ color: color || '#fff' }} />
      </IconButton>

      <Link to='/' style={{ color: color || '#fff' }}>
        Dashboard
      </Link>
    </Container>
  );
};

Back.propTypes = {
  color: PropTypes.string,
  bg: PropTypes.string,
};
export default Back;
