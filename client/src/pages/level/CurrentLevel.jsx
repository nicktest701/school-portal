import SchoolIcon from '@mui/icons-material/School';
import { Container, Divider, Stack, Typography } from '@mui/material';
import CurrentLevelTab from './CurrentLevelTab';

const CurrentLevel = () => {
  return (
    <Container
      sx={{
        position: 'relative',
        height: '400px',
        color: 'primary.contrastText',
        bgcolor: 'secondary.main',
      }}
    >
      {/* <Back /> */}
      <Container
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          paddingY: 2,
        }}
      >
        <Stack color='primary.main'>
          <Typography variant='h5'>Current Level </Typography>
          <Typography>
            Track,manage and control academic and level activities
          </Typography>
        </Stack>
        <SchoolIcon color='inherit' sx={{ width: 50, height: 50 }} />
      </Container>

      <Divider />

      <CurrentLevelTab />
    </Container>
  );
};

export default CurrentLevel;
