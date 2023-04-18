import { Container, Typography } from '@mui/material';
import React from 'react';

const Error = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Typography variant='h1'>oOps!!</Typography>
      <Typography variant='h4'>
        Something went wrong.Try again later!
      </Typography>
    </Container>
  );
};

export default Error;
