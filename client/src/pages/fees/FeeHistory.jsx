import React, { useId, useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { useQuery } from "@tanstack/react-query";
import feeEmptyImg from "../../assets/images/empty/fees-empty2.png";
import { getStudentAllFeeHistory } from "../../api/currentFeeAPI";
import StudentFeeReportListItem from "../../components/list/StudentFeeReportListItem";
import { getAllStudentsBySession } from "../../api/levelAPI";
import Scrollbars from "react-custom-scrollbars";
import { UserContext } from "../../context/providers/UserProvider";
import CustomTitle from "../../components/custom/CustomTitle";
import { EMPTY_IMAGES } from "../../config/images";
import { useSearchParams } from "react-router-dom";
const FeeHistory = () => {
  const uniqueID = useId();
  const {
    userState: { session },
  } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [studentInfo, setStudentInfo] = useState({
    _id: "",
    profile: "",
    fullName: "",
  });

  const allStudents = useQuery(
    ["all-students", session],
    () => getAllStudentsBySession(session),
    {
      enabled: !!session.sessionId,
    }
  );

  const studentFeesHistory = useQuery(
    ["all-fees-history", studentInfo?._id],
    () => getStudentAllFeeHistory(studentInfo?._id),
    {
      enabled: !!studentInfo?._id,
      onSettled: () => {
        setSearchParams((params) => {
          params.set("_id", studentInfo?._id);
          return params;
        });
      },
    }
  );

  return (
    <>
      <CustomTitle
        title="Fees History"
        subtitle="Manage Student fee payment history"
        img={EMPTY_IMAGES.assessment}
        color="primary.main"
      />

      <Stack paddingY={4}>
        {/* search */}
        <Autocomplete
          fullWidth
          disableClearable
          clearText=" "
          options={allStudents?.data ?? []}
          loading={allStudents.isLoading}
          loadingText="Loading Students.Please Wait..."
          noOptionsText="No Student found"
          isOptionEqualToValue={(option, value) =>
            value?._id === undefined ||
            value?._id === "" ||
            option.id === value?._id
          }
          getOptionLabel={(option) => option?.fullName || ""}
          value={studentInfo}
          onChange={(e, value) => {
            setStudentInfo(value);
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder="Search for student" />
          )}
        />
      </Stack>

      {/* {studentFeesHistory?.isLoading ? (
        <Typography>Please Wait...</Typography>
      ) : studentFeesHistory?.error ? (
        <Typography>An error has occurred!</Typography>
      ) : */}
      {studentFeesHistory?.data ? (
        <>
          <Stack
            justifyContent="center"
            paddingY={2}
            spacing={1}
            alignItems="center"
          >
            <>
              <Avatar
                src={studentInfo?.profile}
                sx={{ width: 80, height: 80 }}
              />
              <Typography sx={{ textTransform: "capitalize" }}>
                {studentInfo?.fullName}
              </Typography>
            </>
          </Stack>

          <Scrollbars style={{ width: "100%", minHeight: "300px" }} autoHide>
            {studentFeesHistory?.data?.fees?.map((session) => (
              <StudentFeeReportListItem
                key={uniqueID}
                item={session}
                studentId={studentFeesHistory?.data?.studentId}
              />
            ))}
          </Scrollbars>
        </>
      ) : (
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Avatar src={feeEmptyImg} sx={{ width: 200, height: 200 }} />
          <Typography variant="body2">No Records available</Typography>
        </Stack>
      )}
    </>
  );
};

export default FeeHistory;
