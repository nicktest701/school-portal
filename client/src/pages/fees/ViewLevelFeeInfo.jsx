import {
  Dialog,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { getAllCurrentFeesByLevel } from "../../api/currentFeeAPI";
import CustomDialogTitle from "../../components/dialog/CustomDialogTitle";
import { currencyFormatter } from "../../config/currencyFormatter";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import ViewLevelFeeInfoItem from "./ViewLevelFeeInfoItem";

function ViewLevelFeeInfo() {
  const {
    schoolSessionState: { levelFeeInfo },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const levelFeeSummary = useQuery({
    queryKey: ["level-fee", levelFeeInfo.data],
    queryFn: () => getAllCurrentFeesByLevel(levelFeeInfo?.data),
    enabled: !!levelFeeInfo?.data?.term && !!levelFeeInfo?.data?.level,
    onSuccess: (info) => {},
  });

  const handleClose = () => {
    schoolSessionDispatch({
      type: "viewLevelFeeInfo",
      payload: { open: false, data: {} },
    });
  };

  return (
    <Dialog open={levelFeeInfo.open} fullWidth maxWidth="xs" onClose={handleClose}>
      <CustomDialogTitle title="School Fees Details" onClose={handleClose} />
      <DialogContent>
        {levelFeeSummary?.isLoading && <Typography>Loading.....</Typography>}
        {levelFeeSummary?.data !== undefined && (
          <Stack rowGap={2}>
            <ViewLevelFeeInfoItem
              title="Level"
              value={levelFeeInfo?.data?.levelName}
            />
            <ViewLevelFeeInfoItem
              title="Number of Students"
              value={levelFeeInfo?.data?.noOfStudents}
            />
            <ViewLevelFeeInfoItem
              title="Total Expected Amount of Fees"
              value={currencyFormatter(
                levelFeeInfo?.data?.fee * levelFeeInfo?.data?.noOfStudents
              )}
            />
            <ViewLevelFeeInfoItem
              title="Total Amount of Fees Paid"
              value={currencyFormatter(levelFeeSummary?.data)}
            />

            <ViewLevelFeeInfoItem
              title="Total OutStanding Fees"
              value={currencyFormatter(
                Number(
                  levelFeeInfo?.data?.fee * levelFeeInfo?.data?.noOfStudents
                ) - Number(levelFeeSummary?.data)
              )}
            />
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ViewLevelFeeInfo;
