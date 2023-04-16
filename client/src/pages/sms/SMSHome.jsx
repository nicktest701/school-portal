import { useContext } from 'react';
import { Container, Divider, Stack } from '@mui/material';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import { useNavigate } from 'react-router-dom';
import { MESSAGE_COLUMNS } from '../../mockup/columns/sessionColumns';
import { useQuery } from '@tanstack/react-query';
import { getAllMessages } from '../../api/messageAPI';
import { EMPTY_IMAGES } from '../../config/images';
import CustomTitle from '../../components/custom/CustomTitle';
import sms_icon from '../../assets/images/header/sms_ico.svg';
import { Delete, Edit } from '@mui/icons-material';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import SMSView from './layout/SMSView';
const SMSHome = () => {
  const messages = useQuery({
    queryKey: ['messages'],
    queryFn: () => getAllMessages(),
  });
  const navigate = useNavigate();
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const handleView = (data) => {
    schoolSessionDispatch({
      type: 'viewMessage',
      payload: {
        data,
        open: true,
      },
    });
  };
  const handleDelete = (data) => {
    console.log(data);
  };

  // const columns = [
  //   ...MESSAGE_COLUMNS,
  //   {
  //     title: '',
  //     field: null,
  //     render: (rowData) => {
  //       return (
  //         <Stack direction='row' spacing={3}>
  //           <Edit
  //             className='ico'
  //             onClick={() => handleView(rowData)}
  //             title='Edit'
  //             titleAccess='Edit'
  //           />
  //           <Delete
  //             className='ico'
  //             onClick={() => handleDelete(rowData)}
  //             title='Delete'
  //             titleAccess='Delete'
  //           />
  //         </Stack>
  //       );
  //     },
  //   },
  // ];

  return (
    <Container>
      <CustomTitle
        title='SMS & Notifications'
        subtitle=' Send single and bulk SMS to students and parents'
        img={sms_icon}
        color='text.main'
        backColor='#012e54'
      />

      <>
        {/* <Container
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
            placeItems: 'center',
            gap: 1,
            paddingY: 3,
          }}
        >
          <SMSCards />
          <SMSCards />
          <SMSCards />
        </Container> */}
        <Divider />

        <CustomizedMaterialTable
          title='Recent Messages'
          icon={sms_icon}
          isLoading={messages.isLoading}
          columns={MESSAGE_COLUMNS}
          // data={ []}
          data={messages.data ? messages.data : []}
          actions={[]}
          showAddButton={true}
          addButtonImg={EMPTY_IMAGES.sms}
          addButtonText='New Message'
          addButtonMessage='😑 Send your first SMS with just a button click !!!!'
          onAddButtonClicked={() => navigate('new')}
          onRowClick={handleView}
        />

        <SMSView />
      </>
    </Container>
  );
};

export default SMSHome;
