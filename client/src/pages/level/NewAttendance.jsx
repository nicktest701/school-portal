import React, { useContext, useEffect, useMemo, useState } from "react";
import moment from "moment";
import _ from "lodash";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  DialogActions,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import CustomDatePicker from "@/components/inputs/CustomDatePicker";
import CustomizedMaterialTable from "@/components/tables/CustomizedMaterialTable";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAttendance,
  postAttendance,
  postStudentAttendance,
} from "@/api/attendanceAPI";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { alertError, alertSuccess } from "@/context/actions/globalAlertActions";
// import student_icon from "@/assets/images/header/student_ico.svg";
import { SchoolRounded, SaveAsRounded } from "@mui/icons-material";
import SaveAltRounded from "@mui/icons-material/SaveAltRounded";
import Back from "@/components/Back";
import CustomTitle from "@/components/custom/CustomTitle";
import LoadingSpinner from "@/components/spinners/LoadingSpinner";
import { isWeekend } from "@/config/helper";
import { UserContext } from "@/context/providers/UserProvider";
import useLevelById from "@/components/hooks/useLevelById";

function NewAttendance({ to }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, session } = useContext(UserContext);
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const [date, setDate] = useState(moment());
  const [allstudents, setAllStudents] = useState([]);

  const { levelName } = useLevelById(id);

  //GET attendance by level id and date
  const attendance = useQuery({
    queryKey: ["attendance", id, date],
    queryFn: () =>
      getAttendance(id, {
        date: date,
        session: session?.sessionId,
        term: session?.termId,
      }),
    enabled: !!id && !!date,
    // enabled: !!id && !!date && !isWeekend(date),
  });

  useEffect(() => {
    if (!_.isEmpty(attendance?.data?.status)) {
      setAllStudents(attendance?.data?.status);
    }
  }, [attendance.data]);

  const completed = useMemo(() => {
    const markedStudents = _.filter(allstudents, ({ status }) =>
      ["Present", "Absent"].includes(status)
    )?.length;
    const percent = parseInt(
      Number(markedStudents / allstudents?.length) * 100
    );

    return {
      done: markedStudents,
      percent,
    };
  }, [allstudents]);

  const handleCheckAttendance = (value, rowData) => {
    rowData.status = value;

    const updatedStudents = _.values(
      _.merge(_.keyBy([...allstudents, rowData], "_id"))
    );
    setAllStudents(updatedStudents);
  };
  ///POST new Attendance
  const { mutateAsync: postAttendanceAsync, isPending: isPostingAttendance } =
    useMutation({
      mutationFn: postAttendance,
    });

  const handleSaveAttendance = () => {
    const newAttendance = {
      level: id,
      date: date,
      status: _.map(allstudents, ({ tableData, ...rest }) => {
        return {
          ...rest,
        };
      }),
      session: session?.sessionId,
      term: session?.termId,
    };

    postAttendanceAsync(newAttendance, {
      onSettled: () => {
        queryClient.invalidateQueries(["attendance-history"]);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  ///POST new Attendance
  const { mutateAsync: postStudentAttendanceAsync, isPending } = useMutation({
    mutationFn: postStudentAttendance,
  });

  const handleSaveStudentAttendance = (data) => {
    const newAttendance = {
      level: id,
      date: date,
      status: _.map(data, ({ tableData, ...rest }) => {
        return {
          ...rest,
        };
      }),
      session: session?.sessionId,
      term: session?.termId,
    };

    postStudentAttendanceAsync(newAttendance, {
      onSettled: () => {
        queryClient.invalidateQueries(["attendance-history"]);
      },
      onSuccess: (data) => {
        schoolSessionDispatch(alertSuccess(data));
      },
      onError: (error) => {
        schoolSessionDispatch(alertError(error));
      },
    });
  };

  const navigateToAttendanceHistory = () => {
    navigate(
      user?.role === "administrator"
        ? `/level/${id}/history`
        : `/${to}/${id}/history`
    );
  };

  return (
    <>
      {user?.role === "administrator" && (
        <Back to={`/level/${id}`} color="primary.main" />
      )}

      {user?.role === "teacher" && (
        <Back to={`/course/level`} color="primary.main" />
      )}

      <CustomTitle
        title="Track Attendance Records"
        subtitle=" Monitor and manage student and staff attendance to ensure accurate record-keeping and identify patterns or issues promptly."
        icon={<SchoolRounded color="inherit" sx={{ width: 50, height: 50 }} />}
        color="primary.main"
        right={
          <Button variant="outlined" onClick={navigateToAttendanceHistory}>
            View History
          </Button>
        }
      />

      <Box sx={{ bgcolor: "#fff", p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "center", pt: 3 }}>
          <CircularProgress
            variant="determinate"
            value={completed.percent}
            size={80}
            color={completed.percent ? "success" : "secondary"}
          />
          <Typography variant="h5" textAlign="center">
            {completed.done}/{allstudents?.length}
            <small style={{ marginLeft: "4px" }}>completed</small>
          </Typography>
          {/* <Typography>completed</Typography> */}
        </Box>
      </Box>
      <Divider textAlign="center" sx={{ py: 4 }}>
        <Chip label="Details" color="secondary" />
      </Divider>

      <CustomizedMaterialTable
        search={true}
        // isPending={attendance.isPending}
        // icon={student_icon}
        title={`Attendance for ${levelName}`}
        exportFileName={`Attendance for ${levelName} on ${date.format(
          "dddd,Do MMMM YYYY"
        )}`}
        columns={[
          {
            field: "_id",
            title: "ID",
            hidden: true,
          },
          {
            field: "fullName",
            title: "FullName",
            export: true,
          },
          {
            field: "gender",
            title: "Gender",
            export: true,
          },
          {
            field: "status",
            title: "Status",
            render: (rowData) => (
              <RadioGroup
                row
                aria-labelledby="attendance-status"
                name="status"
                value={rowData?.status}
                onChange={(e) => handleCheckAttendance(e.target.value, rowData)}
              >
                <FormControlLabel
                  value="Present"
                  control={<Radio size="small" />}
                  label="Present"
                />
                <FormControlLabel
                  value="Absent"
                  control={<Radio size="small" />}
                  label="Absent"
                />
              </RadioGroup>
            ),

            export: true,
          },
          {
            field: null,
            title: "Action",
            render: (rowData) => (
              <Button
                size="small"
                startIcon={<SaveAltRounded color="secondary" />}
                onClick={() => handleSaveStudentAttendance(rowData)}
                loading={isPending}
              >
                Save
              </Button>
            ),
          },
        ]}
        // data={[]}
        data={allstudents}
        actions={[]}
        autoCompleteComponent={
          <Box
            display="flex"
            flexDirection={{
              xs: "column",
              md: "row",
            }}
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box width={280}>
              <CustomDatePicker
                label="Date of Attendance"
                date={date}
                setDate={setDate}
                disableFuture={true}
                shouldDisableWeekends={true}
              />
            </Box>

            <DialogActions sx={{ padding: 2 }}>
              {!isWeekend(date) && (
                <Button
                  variant="contained"
                  startIcon={<SaveAsRounded />}
                  onClick={handleSaveAttendance}
                  loading={isPostingAttendance}
                >
                  {isPostingAttendance ? "Saving" : "Save Attendance"}
                </Button>
              )}

              <Button variant="outlined" onClick={navigateToAttendanceHistory}>
                View History
              </Button>
            </DialogActions>
          </Box>
        }
        options={{
          pageSize: 10,
          selection: false,
        }}
        handleRefresh={attendance.refetch}
      />
      {(isPending || isPostingAttendance) && (
        <LoadingSpinner value="Saving Attendance. Please Wait..." />
      )}
    </>
  );
}

export default NewAttendance;
