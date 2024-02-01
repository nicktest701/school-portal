import SchoolIcon from '@mui/icons-material/School';
import { Container, Typography } from '@mui/material';
import CurrentLevelTab from './CurrentLevelTab';
import Back from '../../components/Back';
import CustomTitle from '../../components/custom/CustomTitle';
import { useParams } from 'react-router-dom';

const CurrentLevel = () => {
  const { type } = useParams();
  return (
    <Container
      sx={{
        position: 'relative',
        height: '400px',
        pt: 2,
      }}
    >
      {/* <Back /> */}
      <Back to='/level' color='primary.main' />

      <Container
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          paddingY: 4,
        }}
      >
        <CustomTitle
          title='Current Level '
          subtitle='  Track,manage and control academic and class activities'
          icon={<SchoolIcon color='inherit' sx={{ width: 50, height: 50 }} />}
          color='primary.main'
        />
        <Typography
          sx={{ display: { xs: 'none', md: 'inline-flex' } }}
          variant='h5'
          paragraph
          whiteSpace='nowrap'
        >
          {type}
        </Typography>
      </Container>

      {/* <Divider /> */}

      <CurrentLevelTab />
    </Container>
  );
};

export default CurrentLevel;
