import React from "react";
import { Dialog, DialogContent } from "@mui/material";
import Transition from "@/components/animations/Transition";
import CustomDialogTitle from "@/components/dialog/CustomDialogTitle";
import ReportCard from "./ReportCard";

const ExamsReport = ({ open, setOpen, student }) => {
  //close dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        TransitionComponent={Transition}
      >
        <CustomDialogTitle title="Report Card" onClose={handleClose} />

        <DialogContent>
          <ReportCard student={student} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default React.memo(ExamsReport);
