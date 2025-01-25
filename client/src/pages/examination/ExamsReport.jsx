import React, { useContext, useRef, useState } from "react";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";

import Transition from "@/components/animations/Transition";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import CustomDialogTitle from "@/components/dialog/CustomDialogTitle";
import _ from "lodash";
import { useMutation } from "@tanstack/react-query";
import { UserContext } from "@/context/providers/UserProvider";
import { publishStudentReport } from "@/api/ExaminationAPI";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import ReportCard from "./ReportCard";

const ExamsReport = ({ student }) => {
  const {
    userState: { session },
  } = useContext(UserContext);
  const { schoolSessionState, schoolSessionDispatch } =
    useContext(SchoolSessionContext);
  const componentRef = useRef();

  const open = schoolSessionState.viewReport.open;


  //close dialog
  const handleClose = () => {
    schoolSessionDispatch({
      type: "closeViewReport",
    });
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: publishStudentReport,
  });
  const handlePublishReports = () => {
    Swal.fire({
      title: "Publishing Reports",
      text: `You are about to publish the report of ${
        student?.fullName || "student"
      }.Do you wish to continue?`,
      showCancelButton: true,
      backdrop: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        schoolSessionDispatch({
          type: "openGeneralAlert",
          payload: {
            message:
              "Publishing reports.This might take a while please wait....",
            severity: "info",
          },
        });
        const reportInfo = {
          sessionId: session.sessionId,
          termId: session.termId,
          student: student?._id,
          level: student?.levelId,
        };

        mutateAsync(reportInfo, {
          onSuccess: () => {
            schoolSessionDispatch(
              alertSuccess("Results have been published Successfully!!!")
            );
          },
          onError: () => {
            schoolSessionDispatch(
              alertError(
                "An error has occured.Couldnt Generate Reports.Try again later"
              )
            );
          },
        });
      }
    });
  };

  const reactToPrintFn = useReactToPrint({
    documentTitle: student?.fullName,
    contentRef: componentRef,
  });
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
        <DialogActions>
          <Button loading={isPending} onClick={handlePublishReports}>
            {isPending ? "Please Wait...." : "Publish Report"}
          </Button>
          <Button variant="contained" onClick={() => reactToPrintFn()}>
            Print Report
          </Button>
        </DialogActions>
        <DialogContent>
          <ReportCard student={student} ref={componentRef} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default React.memo(ExamsReport);
