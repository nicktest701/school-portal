import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
const Level = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};
export default Level;
