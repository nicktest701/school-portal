import { Container } from '@mui/material';
import UserTab from './UserTab';
import CustomTitle from '@/components/custom/CustomTitle';
import users_icon from '@/assets/images/header/users_ico.svg';

function UserHome() {
  return (
    <Container>
      <CustomTitle
        title='Administrators & Users'
        subtitle='Manage user accounts, roles, and permissions to ensure secure and appropriate access to the system.'
        img={users_icon}
        color='text.main'
      />
      <UserTab />
    </Container>
  );
}

export default UserHome;
