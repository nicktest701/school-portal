import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { getAllUsers } from '../../api/userAPI';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import { USERS_COLUMNS } from '../../mockup/columns/sessionColumns';
import UserAdd from './UserAdd';
import UserEdit from './UserEdit';
import UserView from './UserView';
import users_icon from '../../assets/images/header/users_ico.svg';
import { EMPTY_IMAGES } from '../../config/images';
function UserTab() {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const [openAddUser, setOpenAddUser] = useState(false);

  const handleOpenViewUser = (rowData) => {
    schoolSessionDispatch({
      type: 'viewUser',
      payload: { open: true, data: rowData },
    });
  };

  const users = useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers(),
  });


  return (
    <>
      <CustomizedMaterialTable
        isLoading={users.isLoading}
        title='Users'
        icon={users_icon}
        search={true}
        columns={USERS_COLUMNS}
        data={users.data}
        actions={[]}
        showAddButton={true}
        addButtonText='New User'
        addButtonImg={EMPTY_IMAGES.sms}
        addButtonMessage='No Users available !'
        onAddButtonClicked={() => setOpenAddUser(true)}
        onRowClick={handleOpenViewUser}
        showRowShadow={true}
        handleRefresh={users?.refetch}
      />
      <UserView />
      <UserAdd open={openAddUser} setOpen={setOpenAddUser} />
      <UserEdit />
    </>
  );
}

export default UserTab;
