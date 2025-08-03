import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CustomDialogTitle from "@/components/dialog/CustomDialogTitle";

const ViewPreviousReport = ({ report, open, setOpen }) => {
  //CLOSE view User Info
  const handleClose = () => setOpen(false);

  return (
    <>
      <Dialog open={open} maxWidth="md" fullWidth onClose={handleClose}>
        <CustomDialogTitle
          title="Previous School Report"
          onClose={handleClose}
        />
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <iframe
            style={{ width: "100%", height: "5in" }}
            src={report}
          ></iframe>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default React.memo(ViewPreviousReport);
