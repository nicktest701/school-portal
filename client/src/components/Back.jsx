import React from 'react';
import PropTypes from 'prop-types';
import { ArrowBackRounded, DashboardRounded } from '@mui/icons-material';
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

      <Link
        to='/'
        style={{
          color: color || '#fff',
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          textDecoration: 'none',
          border: '1px solid #fff',
          padding: '4px',
        }}
      >
        <span> Dashboard</span>
        <DashboardRounded />
      </Link>
    </Container>
  );
};

Back.propTypes = {
  color: PropTypes.string,
  bg: PropTypes.string,
};
export default Back;
