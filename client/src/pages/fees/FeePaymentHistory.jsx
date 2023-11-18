import React, { useContext, useState } from 'react';
import { Box, Dialog, DialogContent, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import { getAllCurrentFeesPaymentHistoryByDate } from '../../api/currentFeeAPI';
import CustomDatePicker from '../../components/inputs/CustomDatePicker';
import moment from 'moment';
import _ from 'lodash';
import { currencyFormatter } from '../../config/currencyFormatter';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import Transition from '../../components/animations/Transition';
import { UserContext } from '../../context/providers/UserProvider';
import fee_icon from '../../assets/images/header/fee_ico.svg';

function FeePaymentHistory({ open, setOpen }) {
  const {
    userState: { session },
  } = useContext(UserContext);

  //
  const [date, setDate] = useState(moment());
  const [totalAmount, setTotalAmount] = useState(0);

  //
  const fees = useQuery({
    queryKey: ['fees-for-day', date],
    queryFn: () =>
      getAllCurrentFeesPaymentHistoryByDate({
        session: session?.sessionId,
        term: session?.termId,
        date,
      }),
    enabled: !!session?.sessionId && !!session?.termId && !!date,
    onSuccess: (fees) => {
      setTotalAmount(_.sumBy(_.flatMap(fees, 'payment'), 'paid'));
    },
  });

  const handleClose = () => setOpen(false);

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <CustomDialogTitle title='Fee Payment History' onClose={handleClose} />
      <DialogContent>
        <Box width={300} paddingY={1}>
          <CustomDatePicker
            label='Date Of Payment'
            date={date}
            setDate={setDate}
          />
        </Box>
        <Stack>
          <Typography textAlign='right'>Total Amount</Typography>
          <Typography textAlign='right' variant='h5'>
            {currencyFormatter(totalAmount)}
          </Typography>
        </Stack>

        <CustomizedMaterialTable
          isLoading={fees.isLoading}
          icon={fee_icon}
          title={`Fee Payment on ${date.format('LL')}`}
          addButtonImg={fee_icon}
          addButtonMessage='Payment not available'
          handleRefresh={fees.refetch}
          columns={[
            {
              title: 'Student',
              field: 'student',
            },
            {
              title: 'Level',
              field: 'level',
            },
            {
              title: 'Amount Paid',
              field: 'payment',
              render: ({ payment }) => {
                return (
                  <>
                    {payment.map((fee) => (
                      <Stack direction='row' columnGap={1} key={fee.date}>
                        <Typography variant='caption'>
                          {currencyFormatter(fee.paid)}
                        </Typography>
                      </Stack>
                    ))}
                  </>
                );
              },
            },
          ]}
          data={fees.data}
          actions={[]}
        />
      </DialogContent>
    </Dialog>
  );
}

FeePaymentHistory.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default FeePaymentHistory;
