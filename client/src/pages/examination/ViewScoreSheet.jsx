import { Dialog, DialogContent, IconButton } from "@mui/material";
import React, { useMemo } from "react";
import CustomizedMaterialTable from "@/components/tables/CustomizedMaterialTable";
import score_icon from "@/assets/images/header/score_ico.svg";
import { getColumns, getResults } from "@/config/generateScoreSheet";
import CustomTitle from "@/components/custom/CustomTitle";
import { Close } from "@mui/icons-material";

const ViewScoreSheet = ({ open, setOpen, reportDetails }) => {
  const details = useMemo(() => {
    //Get dynamic table colums from subjects

    const columns = getColumns(reportDetails?.subjects || []);
    const data = getResults(
      reportDetails?.results,
      reportDetails?.subjects || []
    );

    return {
      columns,
      data,
    };
  }, [reportDetails]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} maxWidth="lg" fullScreen>
      <CustomTitle
        title="Score Sheet"
        subtitle="Show details of student performance"
        color="primary.main"
        right={
          <IconButton size="large" onClick={handleClose}>
            <Close sx={{ width: 36, height: 36 }} />
          </IconButton>
        }
      />

      <DialogContent>
        <CustomizedMaterialTable
          icon={score_icon}
          exportFileName="Score Sheet"
          columns={details?.columns}
          data={details?.data}
          actions={[]}
          search={true}
          options={{
            pageSize: details?.data?.length || 30,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ViewScoreSheet;
