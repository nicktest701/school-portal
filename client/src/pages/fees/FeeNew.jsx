import React, { useContext, useState } from 'react';
import { Container, Divider, Typography, useTheme } from '@mui/material';
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
import { UserContext } from '../../context/providers/userProvider';
import {
  alertError,
  alertSuccess,
} from '../../context/actions/globalAlertActions';

const FeeNew = () => {
  const {
    userState: { session },
  } = useContext(UserContext);

  const { palette } = useTheme();
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
      confirmButtonColor: palette.primary.main,
      showCancelButton: true,
      backdrop: false,
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
    // //console.log(rowData);
    schoolSessionDispatch({
      type: 'setFeeEditData',
      payload: {
        open: true,
        data: rowData,
      },
    });
  };

  const handleView = ({ levelId, level, fee, noOfStudents, amount }) => {
    // //console.log(levelId);
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
      <Container maxWidth='lg' sx={{ paddingY: 5 }}>
        <Typography variant='h4'>New Fee</Typography>
        <Typography>
          Add new <b>TERM/SEMESTER</b> fees for a particular level
        </Typography>
        <Divider />
        <CustomizedMaterialTable
          title='School Fees'
          icon={fee_icon}
          columns={SCHOOL_FEES_COLUMNS(handleView, handleEdit, handleDeleteFee)}
          data={fees.data ? fees.data : []}
          isLoading={fees.isFetching}
          actions={[]}
          search={true}
          // onRowClick={handleGetLevelFeeInfo}
          showAddButton={true}
          addButtonText='New Fee'
          addButtonImg={EMPTY_IMAGES.sms}
          addButtonMessage='😑 No School Fees available!.Create a new one'
          onAddButtonClicked={() => setOpenAddFee(true)}
        />
      </Container>
      <AddFee open={openAddFee} setOpen={setOpenAddFee} />
      <EditFee />
      <ViewLevelFeeInfo />
    </>
  );
};

export default FeeNew;
