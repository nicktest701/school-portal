import React, { use, useRef, useState } from "react";
import {
  Stack,
  Typography,
  useTheme,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import ExamsItem from "@/components/list/ExamsItem";
import ReportItem from "@/components/list/ReportItem";
import ReportItemUnderline from "@/components/list/ReportItemUnderline";
import AddRemarks from "@/components/modals/AddRemarks";
import _ from "lodash";
import { PrintRounded, SchoolRounded } from "@mui/icons-material";
import { UserContext } from "@/context/providers/UserProvider";
import { useReactToPrint } from "react-to-print";

function ReportCard({ student, style }) {
  const componentRef = useRef();
  const { school_info, session } = use(UserContext);
  const { palette } = useTheme();
  const [openRemarks, setOpenRemarks] = useState(false);

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
          maxWidth: "8.5in",
          minHeight: "11in",
          // height: "11.69in",
          margin: "auto",
          padding: "16px",
          border: "1px solid lightgray",
          position: "relative",
          background: ` linear-gradient(
            rgba(255, 255, 255, 0.96),
            rgba(255, 255, 255, 0.96)
          ),
          url("${school_info?.badge}")`,
          mb: 1,
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
            zIndex: 999999999,
          }}
          onClick={() => reactToPrintFn()}
        >
          Print
        </Button>
        {/* school details */}
        <Stack direction="row" justifyContent="center" alignItems="center">
          {school_info?.badge ? (
            <Avatar
              alt="school logo"
              loading="lazy"
              src={school_info?.badge}
              sx={{
                width: 70,
                height: 70,
                bgcolor:
                  school_info?.badge === null ? "var(--primary)" : "whitesmoke",
              }}
            >
              {school_info?.name[0]}
            </Avatar>
          ) : (
            <SchoolRounded sx={{ width: 50, height: 50 }} />
          )}
          <Stack justifyContent="center" alignItems="center" flexGrow={1}>
            <Typography variant="h4" color="primary">
              {_.upperCase(school_info?.name)}
            </Typography>
            <Typography variant="caption">{school_info?.address}</Typography>
            <Typography variant="caption">{school_info?.location}</Typography>
            <Typography variant="caption" fontStyle="italic">
              {school_info?.motto}
            </Typography>
            <Typography variant="caption" fontStyle="italic">
              {school_info?.phonenumber}
            </Typography>
          </Stack>
        </Stack>
        <Typography
          sx={{
            textAlign: "center",
            // textDecoration: "underline",
            borderTop: `solid 2px ${palette.secondary.main}`,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            width: "100%",
            padding: "4px",
          }}
          variant="body2"
        >
          Report Card
        </Typography>

        {/* avatar */}
        <Stack justifyContent="center" alignItems="center">
          <Avatar
            src={student?.profile}
            sx={{ width: 60, height: 60, alignSelf: "center" }}
          />
        </Stack>

        {/* name section */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Stack>
              <ReportItem title="ID" text={_.toUpper(student?.indexnumber)} />
              <ReportItem title="Full Name" text={student?.fullName} />
              <ReportItem title="Class" text={`${student?.level}`} />
              <ReportItem title="No. On Roll" text={student?.rollNumber} />
              <ReportItem title="Grade" text={student?.grade} />
              <ReportItem title="Promoted" text="" />
            </Stack>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <p>Position</p>
            <Typography variant="h5" color="error">
              {student?.position}
            </Typography>
          </Box>
          <Box>
            <Stack>
              <ReportItem title="Academic Year" text={student?.academicYear} />
              <ReportItem title="Term/Semester" text={student?.term} />
              <ReportItem title="Vacation Date" text={student?.vacationDate} />
              <ReportItem
                title="Reopening Date"
                text={student?.reOpeningDate}
              />
            </Stack>
          </Box>
        </Box>

        {/* results section */}
        <Stack>
          <table
            style={{ textAlign: "center", borderCollapse: "collapse" }}
            border="1"
          >
            <thead>
              <tr style={{ fontSize: "14px" }}>
                <th>Subject</th>
                <th>
                  {" "}
                  Class Score <br /> ({classScorePreference}%)
                </th>
                <th>
                  {" "}
                  Exams Score
                  <br /> ({examsScorePreference}%)
                </th>
                <th>Total Score (100%)</th>
                {/* <th>Position</th> */}
                <th>Grade</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
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
            <tfoot
              style={{
                textAlign: "center",
                textDecoration: "underline",
                borderTop: `solid 2px ${palette.primary.main}`,
                width: "100%",
                padding: 1,
              }}
            >
              <tr>
                <th
                  style={{
                    textAlign: "left",
                    paddingLeft: "2px",
                    fontSize: "12px",
                    fontWeight: "bolder",
                  }}
                >
                  OVERALL SCORE
                </th>
                <th></th>
                <th></th>
                <th>{student?.overallScore}</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </Stack>

        {/* conduct */}
        <Box sx={{ flex: 1 }}>
          <Stack rowGap={1}>
            <Stack
              direction="row"
              justifyContent="flex-end"
              columnGap={6}
              spacing={6}
              pt={1}
              pr={8}
            >
              <ReportItem title="Attendance  " text="    " />
              <ReportItem
                title="Out Of           "
                text="       "
                // text={student?.totalLevelAttendance}
              />
            </Stack>
            <Stack>
              <ReportItemUnderline
                title="Conduct & Attitude"
                text={student?.comments?.conduct}
              />

              <ReportItemUnderline
                title="Interest"
                text={student?.comments?.interest}
              />

              <ReportItemUnderline
                title="Class Teacher's Remarks"
                text={student?.comments?.teachersComments}
              />

              <ReportItemUnderline
                title="Headmaster's Remarks"
                text={student?.comments?.headteachersComments}
              />
            </Stack>
            <Button
              variant="text"
              className="add-remarks-btn"
              onClick={() => setOpenRemarks(true)}
              sx={{
                alignSelf: "flex-start",
                cursor: "pointer",
                zIndex: "99999999",
                textDecoration: "underline",
              }}
            >
              Add Remarks
            </Button>
          </Stack>
          <Stack justifyContent="center" alignItems="center" zIndex={9999} pt={2}>
            <Typography>Bill</Typography>
            <table
              width="60%"
              border="1"
              style={{ borderCollapse: "collapse", zIndex: 9999 }}
            >
              <thead>
                <tr>
                  <th>Item</th>
                  <th>GHS</th>
                  <th>GHP</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ paddingLeft: "5px", fontSize: "13px" }}>
                    Tuition Fee
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "5px", fontSize: "13px" }}>
                    Others
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: "5px", fontSize: "13px" }}>
                    Arrears
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>Total</th>
                  <th></th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </Stack>
        </Box>
        {/* <Divider /> */}

        <Typography
          style={{
            fontSize: "10px",
            fontStyle: "italic",
            textAlign: "right",
          }}
        >
          Powered by FrebbyTech Consults (+233543772591)
        </Typography>

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
          }}
        >
          <img
            className="report-logo"
            // src={"/images/logo.PNG"}
            src={school_info?.badge}
            alt="school logo"
            style={{
              opacity: 0.03,
              width: "6in",
              height: "5.5in",
            }}
          />
        </div>
        {/* <Link
              className="add-remarks-btn"
              onClick={() => setOpenRemarks(true)}
              sx={{ cursor: "pointer" ,zIndex:'99999999'}}
            >
              Add Remarks
            </Link> */}
        <div
          style={{
            position: "absolute",
            bottom: "2%",
            left: "4%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {session?.headmaster?.signature && (
            <img
              src={session?.headmaster?.signature}
              alt="headmaster signature"
              style={{
                maxWidth: "100%",
                aspectRatio: "16/9",
                // marginLeft: "12px",
                width: "100px",
                height: "60px",
                objectFit: "contain",
                transform: "scale(1.8)",
              }}
            />
          )}
          <span
            style={{
              borderTop: "1px #333 dashed",
              fontSize: "13px",
            }}
          >
            {session?.headmaster?.name || ""} (Headmaster)
          </span>
        </div>
      </Stack>
      <AddRemarks
        open={openRemarks}
        setOpen={setOpenRemarks}
        id={student?._id}
        remark={student?.comments}
      />
    </>
  );
}

export default ReportCard;
