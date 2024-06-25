import { Container } from '@mui/material';
import UserTab from './UserTab';
import CustomTitle from '../../components/custom/CustomTitle';
import users_icon from '../../assets/images/header/users_ico.svg';

function UserHome() {
  return (
    <Container>
      <CustomTitle
        title='Administrators & Users'
        subtitle='Manage information and details of users'
        img={users_icon}
        color='text.main'
      />
      <UserTab />
    </Container>
  );
}

export default UserHome;
