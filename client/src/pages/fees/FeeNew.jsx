import React, { useContext, useState } from 'react';
import { Container } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { deleteFee, getAllFees } from '../../api/feeAPI';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import { SCHOOL_FEES_COLUMNS } from '../../mockup/columns/sessionColumns';
import AddFee from './AddFee';
import EditFee from './EditFee';
import { EMPTY_IMAGES } from '../../config/images';
import ViewLevelFeeInfo from './ViewLevelFeeInfo';
import fee_icon from '../../assets/images/header/fee_ico.svg';
import { UserContext } from '../../context/providers/UserProvider';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';
import CustomTitle from '../../components/custom/CustomTitle';

const FeeNew = () => {
  const {
    userState: { session },
  } = useContext(UserContext);

  const queryClient = useQueryClient();

  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const [openAddFee, setOpenAddFee] = useState(false);

  const fees = useQuery({
    queryKey: ['fees'],
    queryFn: () => getAllFees(session),
    enabled: !!session?.sessionId,
  });

  const { mutateAsync } = useMutation(deleteFee);

  const handleDeleteFee = (id) => {
    Swal.fire({
      title: 'Removing',
      text: 'Do you want to remove Fee?',
      showCancelButton: true,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutateAsync(id, {
          onSettled: () => {
            queryClient.invalidateQueries(['fees']);
          },
          onSuccess: () => {
            schoolSessionDispatch(
              alertSuccess('Fee has been removed successfully!!!')
            );
          },
          onError: () => {
            schoolSessionDispatch(alertError('Error removing Fee!!!'));
          },
        });
      }
    });
  };

  const handleEdit = (rowData) => {
    schoolSessionDispatch({
      type: 'setFeeEditData',
      payload: {
        open: true,
        data: rowData,
      },
    });
  };

  const handleView = ({ levelId, level, fee, noOfStudents, amount }) => {
    schoolSessionDispatch({
      type: 'viewLevelFeeInfo',
      payload: {
        open: true,
        data: {
          noOfStudents,
          fee,
          level: levelId,
          levelName: level,
          term: session.termId,
          amount,
        },
      },
    });
  };

  return (
    <>
      <>
        <CustomTitle
          title='New Fee'
          subtitle='Add new TERM/SEMESTER fees for a particular level'
          img={fee_icon}
          color='primary.main'
        />

        <CustomizedMaterialTable
          title='School Fees'
          icon={fee_icon}
          columns={SCHOOL_FEES_COLUMNS(handleView, handleEdit, handleDeleteFee)}
          data={fees.data ? fees.data : []}
          isLoading={fees.isLoading}
          actions={[]}
          search={true}
          // onRowClick={handleGetLevelFeeInfo}
          showAddButton={true}
          addButtonText='New Fee'
          addButtonImg={EMPTY_IMAGES.sms}
          addButtonMessage='😑 No School Fees available!.Create a new one'
          onAddButtonClicked={() => setOpenAddFee(true)}
        />
      </>
      <AddFee open={openAddFee} setOpen={setOpenAddFee} />
      <EditFee />
      <ViewLevelFeeInfo />
    </>
  );
};

export default FeeNew;
