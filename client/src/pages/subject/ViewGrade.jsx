import { Dialog, DialogContent } from "@mui/material";
import React, { useContext } from "react";
import CustomDialogTitle from "@/components/dialog/CustomDialogTitle";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import GradeTable from "@/components/tables/GradeTable";

function ViewGrade() {
  const {
    schoolSessionState: {
      viewGrades: { open, ratings },
    },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const handleCloseDialog = () => {
    schoolSessionDispatch({
      type: "viewGrade",
      payload: { open: false, data: [] },
    });
  };
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <CustomDialogTitle title="Grade" onClose={handleCloseDialog} />
      <DialogContent>
        <GradeTable data={ratings} />
      </DialogContent>
    </Dialog>
  );
}

export default ViewGrade;
