import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';

const SMS = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

SMS.propTypes = {};

export default SMS;
