import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';

function Examination() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default Examination;
