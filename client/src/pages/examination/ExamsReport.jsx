import React, { use, useState } from "react";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import Swal from "sweetalert2";

import Transition from "@/components/animations/Transition";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import CustomDialogTitle from "@/components/dialog/CustomDialogTitle";
import { useMutation } from "@tanstack/react-query";
import { publishReport } from "@/api/ExaminationAPI";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
import ReportCard from "./ReportCard";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";

const ExamsReport = ({ student }) => {
  const [searchParams] = useSearchParams();
  const [uploadProgress, setUploadProgress] = useState(0);
  const { schoolSessionState, schoolSessionDispatch } =
    use(SchoolSessionContext);

  const open = schoolSessionState.viewReport.open;

  //close dialog
  const handleClose = () => {
    schoolSessionDispatch({
      type: "closeViewReport",
    });
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: publishReport,
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
            message: `Publishing report.This might take a while please wait....${uploadProgress}%`,
            severity: "info",
          },
        });

        mutateAsync(
          {
            id: searchParams.get("eid"),
            onProgress: setUploadProgress,
          },

          {
            onSettled: () => {
              schoolSessionDispatch({
                type: "closeGeneralAlert",
              });
            },
            onSuccess: () => {
              setUploadProgress(0);

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
          }
        );
      }
    });
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
        <DialogActions>
          <Button loading={isPending} onClick={handlePublishReports}>
            {isPending ? "Please Wait...." : "Publish Report"}
          </Button>
        </DialogActions>
        <DialogContent>
          <ReportCard student={student} />
        </DialogContent>
      </Dialog>

      {isPending && (
        <LoadingSpinner
          value={isPending ? `Publishing..${uploadProgress}%` : "Please Wait.."}
        />
      )}
    </>
  );
};

export default React.memo(ExamsReport);
