import React, { useContext, useRef } from "react";
import { Avatar, Box, Button, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getStudentFeeHistory } from "@/api/currentFeeAPI";
import CustomizedMaterialTable from "@/components/tables/CustomizedMaterialTable";
import { useReactToPrint } from "react-to-print";
import { STUDENT_FEES_HISTORY_COLUMNS } from "@/mockup/columns/sessionColumns";
import PropTypes from "prop-types";
import { UserContext } from "@/context/providers/UserProvider";
import { PrintRounded } from "@mui/icons-material";
import history_icon from "@/assets/images/header/history_ico.svg";
import FeeReport from "./FeeReport";
import CustomTitle from "@/components/custom/CustomTitle";
import { useSearchParams } from "react-router-dom";
import Back from "@/components/Back";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";

const StudentFeesHistory = () => {
  const {
    session
  } = useContext(UserContext);
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const componentRef = useRef();

  const studentFee = useQuery({
    queryKey: [
      "student-fee-history",
      searchParams.get("_id"),
      searchParams.get("level_id"),
    ],
    queryFn: () =>
      getStudentFeeHistory({
        sessionId: session.sessionId,
        termId: session?.termId,
        studentId: searchParams.get("_id"),
        levelId: searchParams.get("level_id"),
        feeId: searchParams.get("fid"),
      }),
    enabled: !!searchParams.get("_id") && !!searchParams.get("level_id"),
  });

  const reactToPrintFn = useReactToPrint({
    documentTitle: studentFee?.data?.fullName,
    contentRef: componentRef,
  });

  return (
    <>
      <Back to={state?.prevPath} color="primary.main" />
      <CustomTitle
        title={studentFee?.data?.fullName || ""}
        subtitle={studentFee?.data?.levelType}
        color="primary.main"
        icon={
          <Avatar
            srcSet={studentFee?.data?.profile}
            sx={{ width: 60, height: 60 }}
          />
        }
      />

      <Box>
        <>
          <CustomizedMaterialTable
            title="Fees History"
            subtitle="Showing details of student fees transactions"
            search
            icon={history_icon}
            addButtonImg={history_icon}
            addButtonMessage="No Fees History Found"
            isPending={studentFee.isPending}
            exportFileName={studentFee?.data?.fullName}
            columns={STUDENT_FEES_HISTORY_COLUMNS}
            data={studentFee?.data?.payment}
            actions={[]}
            handleRefresh={studentFee.refetch}
            autoCompleteComponent={
              <Button
                startIcon={<PrintRounded />}
                variant="contained"
                onClick={() => reactToPrintFn()}
              >
                Print Report
              </Button>
            }
            options={{
              paging: false,
              selection: false,
              columnsButton: false,
            }}
            style={{
              border: "none",
            }}
          />
        </>
      </Box>
      <div ref={componentRef} className="print-container">
        <FeeReport student={studentFee?.data} />
      </div>
      {studentFee.isPending && (
        <LoadingSpinner value="Loading Fee History..." />
      )}
    </>
  );
};

StudentFeesHistory.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
export default StudentFeesHistory;
