import React from 'react';
import UserTab from './UserTab';
import CustomTitle from '@/components/custom/CustomTitle';
import users_icon from '@/assets/images/header/users_ico.svg';

function UserHome() {
  return (
    <>
      <CustomTitle
        title='Administrators & Users'
        subtitle='Manage user accounts, roles, and permissions to ensure secure and appropriate access to the system.'
        img={users_icon}
        color='text.main'
      />
      <UserTab />
    </>
  );
}

export default UserHome;
