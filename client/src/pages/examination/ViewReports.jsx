import React, { useContext, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import ReactToPrint from "react-to-print";
import Transition from "../../components/animations/Transition";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Report from "./Report";
import CustomDialogTitle from "../../components/dialog/CustomDialogTitle";
import { useQuery } from "@tanstack/react-query";
import { generateReports } from "../../api/ExaminationAPI";
import { UserContext } from "../../context/providers/userProvider";
const ViewReports = ({ open, setOpen }) => {
 
  const {
    userState: { session },
  } = useContext(UserContext);

  const { levelId } = useParams();
  const componentRef = useRef();

  //close dialog
  const handleClose = () => {
    setOpen(false);
  };

  const reports = useQuery({
    queryKey: ["exams-reports"],
    queryFn: () =>
      generateReports({
        sessionId: session.sessionId,
        termId: session.termId,
        levelId,
      }),
    enabled: !!levelId,
  });

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        fullScreen
        TransitionComponent={Transition}
      >
        <CustomDialogTitle title="Report Card" onClose={handleClose} />
        <DialogActions>
          <ReactToPrint
            // pageStyle={
            //   'width:8.5in";min-height:11in"; margin:auto",padding:4px;'
            // }
            trigger={() => <Button variant="contained">Print Report</Button>}
            content={() => componentRef.current}
            documentTitle={"Report"}
          />
        </DialogActions>
        <DialogContent ref={componentRef}>
          <Divider />
          {reports.isError && (
            <Typography>Error loading report info.....</Typography>
          )}
          {reports.isLoading && <Typography>Loading.....</Typography>}
          {reports.data && reports.data?.length === 0 && (
            <Typography>No Report Available.....</Typography>
          )}
          {reports.data &&
            reports.data?.map((report) => (
              <Report key={report?._id} student={report} />
            ))}
        </DialogContent>
      </Dialog>
    </>
  );
};
ViewReports.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default React.memo(ViewReports);
