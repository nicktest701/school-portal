import React, { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useReactToPrint } from "react-to-print";
import PropTypes from "prop-types";
import CustomDialogTitle from "@/components/dialog/CustomDialogTitle";
import { useQuery } from "@tanstack/react-query";
import { getExams } from "@/api/ExaminationAPI";
import ReportCard from "./ReportCard";
import { useSearchParams } from "react-router-dom";
import { gradeColor } from "@/config/gradeColor";

const ExamsItem = ({ item }) => (
  <TableRow>
    <TableCell sx={{ fontSize: 12 }}>{item.subject}</TableCell>
    <TableCell sx={{ fontSize: 12 }}>{item.classScore}</TableCell>
    <TableCell sx={{ fontSize: 12 }}>{item.examsScore}</TableCell>
    <TableCell sx={{ color: "#b72338", fontSize: "12px", fontWeight: "bold" }}>
      {item.totalScore}
    </TableCell>
    <TableCell sx={{ fontSize: 12, color: gradeColor(item.totalScore).color }}>
      {item.grade}
    </TableCell>
    <TableCell sx={{ fontSize: 12 }}>{item.remarks}</TableCell>
  </TableRow>
);
const ViewExamsRecord = () => {
  const componentRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: student } = useQuery({
    queryKey: ["student-exams-records", searchParams.get("report")],
    queryFn: () => getExams(searchParams.get("report")),
    enabled: !!searchParams.get("report"),
  });

  //close dialog
  const handleClose = () => {
    setSearchParams((params) => {
      params.delete("report");
      return params;
    });
  };

  const reactToPrintFn = useReactToPrint({
    documentTitle: "Student Report",
    contentRef: componentRef,
  });

  return (
    <>
      <Dialog
        open={searchParams.get("report") !== null}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <CustomDialogTitle
          title={`${student?.level}-${student?.term}`}
          onClose={handleClose}
        />
        <DialogActions>
          <Button variant="contained" onClick={() => reactToPrintFn()}>
            Print Report
          </Button>
        </DialogActions>
        <DialogContent>
          <Stack>
            <Typography variant="h5">
              TOTAL SCORE - {student?.overallScore}
            </Typography>
            {/* <table style={{ textAlign: "left", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ fontSize: "12px" }}>
                  <th>SUBJECT</th>
                  <th> CLASS SCORE (50%)</th>
                  <th> EXAMS SCORE(50%)</th>
                  <th>TOTAL SCORE (100%)</th>

                  <th>GRADE</th>
                  <th>REMARKS</th>
                </tr>
              </thead>
              <tbody style={{ width: "100%" }}>
                {student?.scores !== undefined ? (
                  student?.scores.length !== 0 &&
                  student?.scores.map((item) => (
                    <ExamsItem key={item.subject} item={item} />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      style={{ padding: "3px 1px", fontSize: "20px" }}
                    >
                      No Student Record Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table> */}
          </Stack>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="student scores table">
              <TableHead>
                <TableRow>
                  <TableCell>SUBJECT</TableCell>
                  <TableCell>CLASS SCORE (50%)</TableCell>
                  <TableCell>EXAMS SCORE (50%)</TableCell>
                  <TableCell>TOTAL SCORE (100%)</TableCell>
                  <TableCell>GRADE</TableCell>
                  <TableCell>REMARKS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {student?.scores !== undefined ? (
                  student.scores.length !== 0 ? (
                    student.scores.map((item) => (
                      <ExamsItem key={item.subject} item={item} />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <Typography variant="body1">
                          No Student Record Available
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="body1">
                        No Student Record Available
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
      <div className="print-container" ref={componentRef}>
        <ReportCard student={student} />
      </div>
    </>
  );
};
ViewExamsRecord.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default React.memo(ViewExamsRecord);
