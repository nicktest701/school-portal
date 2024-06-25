import { Dialog, DialogContent } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CustomDialogTitle from "../../components/dialog/CustomDialogTitle";
import CustomizedMaterialTable from "../../components/tables/CustomizedMaterialTable";
import { StudentContext } from "../../context/providers/StudentProvider";
import score_icon from "../../assets/images/header/score_ico.svg";
import { getColumns, getResults } from "../../config/generateScoreSheet";
import CustomTitle from "../../components/custom/CustomTitle";

const ViewScoreSheet = ({ open, setOpen }) => {
  const {
    studentState: { studentReportDetails },
  } = useContext(StudentContext);

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    //Get dynamic table colums from subjects
    if (studentReportDetails?.subjects) {
      const columns = getColumns(studentReportDetails.subjects);

      setColumns(columns);
    }

    //Generate score sheet
    if (studentReportDetails?.results) {
      const scoreSheet = getResults(
        studentReportDetails?.results,
        studentReportDetails?.subjects
      );

      setData(scoreSheet);
    }
  }, [studentReportDetails]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} maxWidth="lg" fullScreen>
      <CustomTitle
        title="Score Sheet"
        subtitle="Show details of student performance"
        color="primary.main"
      />

      <DialogContent>
        <CustomizedMaterialTable
          icon={score_icon}
          title="Exams Score Sheet"
          exportFileName="Score Sheet"
          columns={columns}
          data={data}
          actions={[]}
          options={{
            pageSize: 10,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ViewScoreSheet;
