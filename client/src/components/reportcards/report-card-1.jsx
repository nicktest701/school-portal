/* eslint-disable react/prop-types */
import React, { use } from "react";
import { Stack, Typography, useTheme, Avatar, Box } from "@mui/material";
import ExamsItem from "@/components/list/ExamsItem";
import ReportItem from "@/components/list/ReportItem";
import ReportItemUnderline from "@/components/list/ReportItemUnderline";
import _ from "lodash";
import { SchoolRounded } from "@mui/icons-material";
import { UserContext } from "@/context/providers/UserProvider";

const TerminalReport1 = ({ student, classScore, examsScore, ratings }) => {
  const { school_info, session } = use(UserContext);
  const { palette } = useTheme();

  return (
    <>
      <style>
        {`
       .grades-key {
            padding: 5px;
          }

          .grades-key h3 {
            margin-bottom:8px;
            text-align: center;
          }

          .grades-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 5px;
          }

          .grade-item {
            display: flex;
            align-items: left;
          }
      
      `}
      </style>

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
            {school_info?.phonenumber} | {school_info?.email}
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
            <ReportItem title="Reopening Date" text={student?.reOpeningDate} />
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
                Class Score <br /> ({classScore}%)
              </th>
              <th>
                {" "}
                Exams Score
                <br /> ({examsScore}%)
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
      <Box sx={{ flex: 1, flexGrow: 1, position: "relative", mt: 1, gap: 2 }}>
        <Stack rowGap={1} pb={2}>
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
          <Stack gap={1}>
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
        </Stack>
        <hr />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "end",
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
                transform: "scale(2)",
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
          <hr />
        </div>

        {/* <Stack justifyContent="center" alignItems="center" zIndex={9999} pt={2}>
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
                <td style={{ paddingLeft: "5px", fontSize: "13px" }}>Others</td>
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
          </Stack> */}
      </Box>

      <div className="grades-key">
        <h3>KEY TO GRADES</h3>
        <div className="grades-grid">
          {ratings?.map((rating) => (
            <div
              key={rating.id}
              className={`grade-item grade-${rating.remarks}`}
            >
              {/* <span className="grade-box"></span> */}
              <span>
                {rating.grade} {rating.lowestMark} - {rating.highestMark}{" "}
                {rating.remarks}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* <Divider /> */}

      <Typography
        style={{
          fontSize: "10px",
          fontStyle: "italic",
          textAlign: "right",
        }}
      >
        Powered by{" "}
        <a
          href="https://nanaakwasi.dev"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "10px",
            fontStyle: "italic",
            textAlign: "right",
          }}
        >
          Frebby Tech Consult
        </a>{" "}
        (+233543772591). &copy; {new Date().getFullYear()} | All rights
        reserved.
      </Typography>

      <span
        style={{
          fontSize: "10px",
          fontStyle: "italic",
        }}
      >
        {student?._id}
      </span>

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
    </>
  );
};

export default TerminalReport1;
