import React, { useState } from "react";
import {
  Stack,
  Typography,
  Divider,
  useTheme,
  Avatar,
  Box,
  Link,
} from "@mui/material";
import ExamsItem from "@/components/list/ExamsItem";
import ReportItem from "@/components/list/ReportItem";
import ReportItemUnderline from "@/components/list/ReportItemUnderline";
import AddRemarks from "@/components/modals/AddRemarks";
import moment from "moment";
import _ from "lodash";
import { SchoolRounded } from "@mui/icons-material";

function ReportCard({ student, style, ref }) {
  const school_info = JSON.parse(localStorage.getItem("@school_info"));
  const { palette } = useTheme();
  const [openRemarks, setOpenRemarks] = useState(false);
  return (
    <>
      <Stack
        ref={ref}
        spacing={1}
        sx={{
          ...style,
          maxWidth: "8.5in",
          minHeight: "11in",
          margin: "auto",
          padding: "16px",
          border: "1px solid lightgray",
        }}
        // style={style}
      >
        {/* school details */}
        <Stack direction="row" justifyContent="center" alignItems="center">
          {school_info?.badge ? (
            <Avatar
              alt="school logo"
              loading="lazy"
              srcSet={`${import.meta.env.VITE_BASE_URL}/images/users/${
                school_info?.badge
              }`}
              sx={{
                width: 70,
                height: 70,
              }}
            />
          ) : (
            <SchoolRounded sx={{ width: 50, height: 50 }} />
          )}
          <Stack justifyContent="center" alignItems="center" flexGrow={1}>
            <Typography variant="h4" color="primary">
              {_.startCase(school_info?.name)}
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
          {school_info?.badge ? (
            <Avatar
              alt="school logo"
              loading="lazy"
              srcSet={`${import.meta.env.VITE_BASE_URL}/images/users/${
                school_info?.badge
              }`}
              sx={{
                width: 70,
                height: 70,
              }}
            />
          ) : (
            <SchoolRounded sx={{ width: 50, height: 50 }} />
          )}
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
            src={
              student?.profile === "" ||
              student?.profile === undefined ||
              student?.profile === null
                ? null
                : student?.profile
              // : `${import.meta.env.VITE_BASE_URL}/images/students/${
              //     student?.profile
              //   }`
            }
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
              <ReportItem title="ID" text={student?.indexnumber} />
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
              <ReportItem
                title="Vacation Date"
                text={moment(student?.vacationDate).format("Do MMMM,YYYY")}
              />
              <ReportItem
                title="Reopening Date"
                text={moment(student?.reOpeningDate).format("Do MMMM,YYYY")}
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
              <tr>
                <th>Subject</th>
                <th> Class Score (50%)</th>
                <th> Exams Score (50%)</th>
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
                borderTop: `solid 5px ${palette.secondary.main}`,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                width: "100%",
                padding: 1,
              }}
            >
              <tr>
                <th>Overall Score</th>
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
                text={student?.comments?.conduct || "Hardworking"}
              />

              <ReportItemUnderline
                title="Interest"
                text={student?.comments?.interest || "Hardworking"}
              />

              <ReportItemUnderline
                title="Class Teacher's Remarks"
                text={
                  student?.comments?.teachersComments ||
                  "Excellent Performance Keep it up!"
                }
              />

              <ReportItemUnderline
                title="Headmaster's Remarks"
                text={
                  student?.comments?.headteachersComments || "Good job done!"
                }
              />
            </Stack>
            <Link
              className="add-remarks-btn"
              onClick={() => setOpenRemarks(true)}
              sx={{ cursor: "pointer" }}
            >
              Add Remarks
            </Link>
          </Stack>
        </Box>
        <Divider />
        <Stack justifyContent="center" alignItems="center">
          <Typography>Bill</Typography>
          <table width="60%" border="1" style={{ borderCollapse: "collapse" }}>
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
        </Stack>
        <Typography
          style={{
            fontSize: "10px",
            fontStyle: "italic",
          }}
        >
          Powered by FrebbyTech Consults (0543772591)
        </Typography>
      </Stack>
      <AddRemarks
        open={openRemarks}
        setOpen={setOpenRemarks}
        id={student?._id}
      />
    </>
  );
}

export default ReportCard;
