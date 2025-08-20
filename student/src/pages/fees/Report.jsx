import React, { useRef } from "react";
import { Box, Button, Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { getStudentFeeHistory } from "@/api/currentFeeAPI";
import CustomizedMaterialTable from "@/components/tables/CustomizedMaterialTable";
import { useReactToPrint } from "react-to-print";
import { PrintRounded } from "@mui/icons-material";
import history_icon from "@/assets/images/header/history_ico.svg";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";
import PaymentTable from "@/components/tables/PaymentTable";
import DataSkeleton from "@/components/skeleton/DataSkeleton";
import FeeReportTemplate from "@/components/fees/FeeReportTemplate";
import { STUDENT_FEES_HISTORY } from "@/columns";
import { useAuth } from "@/context/AuthProvider";
import Back from "@/components/Back";

const Report = () => {
  const { user: student } = useAuth();
  const { state } = useLocation();
  const { id } = useParams();
  const componentRef = useRef();

  const studentFee = useQuery({
    queryKey: ["student-fee-history", id],
    queryFn: () => getStudentFeeHistory(id),
    enabled: !!id,
  });

  const reactToPrintFn = useReactToPrint({
    documentTitle: student?.fullName,
    contentRef: componentRef,
  });

  if (studentFee.isPending) {
    return <DataSkeleton />;
  }
console.log("Student Fee Data: ", studentFee?.data);
  return (
    <Container>
      <Back to={state?.prevPath} color="primary.main" />

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
            exportFileName={student?.fullName}
            columns={STUDENT_FEES_HISTORY}
            data={studentFee?.data}
            actions={[]}
            handleRefresh={studentFee.refetch}
            otherButtons={
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
            detailPanel={({ rowData }) => {
              return <PaymentTable payments={rowData?.payment} />;
            }}
          />
        </>
      </Box>
      <div ref={componentRef} className="print-container">
        {/* <FeeReport student={studentFee?.data} /> */}
        {studentFee?.data?.map((data, index) => {
          return (
            <FeeReportTemplate
              key={index}
              feeData={data}
              student={student?.fullName}
            />
          );
        })}
      </div>
      {studentFee.isPending && (
        <LoadingSpinner value="Loading Fee History..." />
      )}
    </Container>
  );
};

export default Report;
