import React, { useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import { Button, DialogActions, DialogContent } from '@mui/material';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
function FeeReceipt() {
  const {
    schoolSessionState: { feeReceiptData },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const handleClose = () =>
    schoolSessionDispatch({
      type: 'setFeesReceiptData',
      payload: { open: false, data: {} },
    });

  return (
    <Dialog open={feeReceiptData.open}>
      <CustomDialogTitle title='Fee Receipt' onClose={handleClose} />
      <DialogActions>
        <Button variant='contained'>Print Receipt</Button>
      </DialogActions>
      <DialogContent></DialogContent>
    </Dialog>
  );
}

export default FeeReceipt;
