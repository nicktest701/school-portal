import React, { useRef, useState } from "react";
import { Stack, Button } from "@mui/material";
import _ from "lodash";
import { PrintRounded } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";
import { useAuth } from "@/context/AuthProvider";
import useLevelById from "@/components/hooks/useLevelById";
import TerminalReport2 from "@/components/reportcards/report-card-2";
import TerminalReport1 from "@/components/reportcards/report-card-1";

function ReportCard({ student, style }) {
  const componentRef = useRef();
  const { school_info, session } = useAuth();
  const { gradeSystem } = useLevelById(student?.levelId);

  const scorePreference = session?.exams?.scorePreference?.split("/");
  const classScorePreference = !_.isUndefined(scorePreference)
    ? scorePreference[0]
    : 50;
  const examsScorePreference = !_.isUndefined(scorePreference)
    ? scorePreference[1]
    : 50;

  const reactToPrintFn = useReactToPrint({
    documentTitle: `${student?.fullName}-${student?.level}`,
    contentRef: componentRef,
  });
  return (
    <>
      <Stack
        className="report-card"
        ref={componentRef}
        spacing={1}
        sx={{
          ...style,
          width: "8.3in",
          height: "11.7in",
          margin: "0 auto",
          overflow: "hidden",
          padding: "16px",
          border: "1px solid lightgray",
          position: "relative",
          background: ` linear-gradient(
            rgba(255, 255, 255, 0.96),
            rgba(255, 255, 255, 0.96)
          ),
          url("${school_info?.badge}")`,
          mb: 1,
          overflowX: "auto",
          fontSize: "12px",
        }}
        // style={style}
      >
        <Button
          className="print-btn"
          variant="text"
          startIcon={<PrintRounded />}
          sx={{
            position: "absolute",
            top: 3,
            right: 3,
            zIndex: 999,
          }}
          onClick={() => reactToPrintFn()}
        >
          Print
        </Button>
        {session?.report?.template === "template2" ? (
          <TerminalReport2
            student={student}
            classScore={classScorePreference}
            examsScore={examsScorePreference}
            ratings={gradeSystem.ratings}
          />
        ) : (
          <TerminalReport1
            student={student}
            classScore={classScorePreference}
            examsScore={examsScorePreference}
            ratings={gradeSystem.ratings}
          />
        )}
      </Stack>
    </>
  );
}

export default ReportCard;
