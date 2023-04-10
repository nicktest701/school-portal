import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { useTheme } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SCHOOL_SESSION_COLUMN } from '../../mockup/columns/sessionColumns';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import { deleteTerm, getAllTerms } from '../../api/termAPI';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';

import EditSession from './EditSession';
import { EMPTY_IMAGES } from '../../config/images';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';
import session_icon from '../../assets/images/header/session_ico.svg';

const SessionHome = () => {
  const { palette } = useTheme();

  //School Session
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  //Query CLient
  const queryClient = useQueryClient();

  const [openEditSession, setOpenEditSession] = useState(false);

  const sessions = useQuery(['terms'], getAllTerms);

  ///Delete session by id
  const { mutateAsync } = useMutation(deleteTerm);

  const handleDeleteSession = (id) => {
    Swal.fire({
      title: 'Removing Session',
      text: 'Removing session will delete all of its related content.Do you want to remove?',
      confirmButtonColor: palette.primary.main,
      showCancelButton: true,
      backdrop: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutateAsync(id, {
          onSettled: () => {
            queryClient.invalidateQueries(['terms']);
          },
          onSuccess: (data) => {
            schoolSessionDispatch(alertSuccess(data));
          },
          onError: (error) => {
            schoolSessionDispatch(alertError(error));
          },
        });
      }
    });
  };

  //Edit session
  const handlEditSession = (rowData) => {
    // //console.log(rowData);
    schoolSessionDispatch({
      type: 'setSessionEditData',
      payload: rowData,
    });
    setOpenEditSession(true);
  };

  const handleOpenSession = () => {
    schoolSessionDispatch({ type: 'displayAddSession', payload: true });
  };

  return (
    <>
      <CustomizedMaterialTable
        title='Sessions'
        icon={session_icon}
        isLoading={sessions.isFetching}
        columns={SCHOOL_SESSION_COLUMN(handlEditSession, handleDeleteSession)}
        data={sessions.data ? sessions.data : []}
        actions={[]}
        showRowShadow={false}
        handleEdit={handlEditSession}
        handleDelete={handleDeleteSession}
        showAddButton={true}
        addButtonImg={EMPTY_IMAGES.session}
        addButtonMessage='😑 No School Session available!.Create a new one!'
        addButtonText='New Session'
        onAddButtonClicked={handleOpenSession}
        handleRefresh={sessions.refetch}
      />

      <EditSession open={openEditSession} setOpen={setOpenEditSession} />
    </>
  );
};

export default SessionHome;
