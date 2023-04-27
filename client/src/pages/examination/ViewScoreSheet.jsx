import { Dialog, DialogContent } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import CustomDialogTitle from '../../components/dialog/CustomDialogTitle';
import CustomizedMaterialTable from '../../components/tables/CustomizedMaterialTable';
import { StudentContext } from '../../context/providers/StudentProvider';
import score_icon from '../../assets/images/header/score_ico.svg';
import _ from 'lodash';
import { getColumns, getResults } from '../../config/generateScoreSheet';

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

  return (
    <Dialog open={open} maxWidth='lg' fullScreen>
      <CustomDialogTitle title='Score Sheet' onClose={() => setOpen(false)} />
      <DialogContent>
        <CustomizedMaterialTable
          icon={score_icon}
          title='Exams Score Sheet'
          exportFileName='Score Sheet'
          columns={columns}
          data={data}
          actions={[]}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ViewScoreSheet;
