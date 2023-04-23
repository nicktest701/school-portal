import { Button, Container, Typography } from '@mui/material';

const Error = ({ error, resetErrorBoundary }) => {
  return (
    <Container
      sx={{
        minHeight: '100vh',
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
      <Typography variant='caption'>{error?.message}</Typography>
      <Typography variant='caption'>
        Try checking your internet connection.
      </Typography>
      <Button variant='outlined' onClick={() => resetErrorBoundary()}>
        Try Again
      </Button>
    </Container>
  );
};

export default Error;
