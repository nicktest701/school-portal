import React, { useContext } from "react";

import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import student_icon from "../../assets/images/header/student_ico.svg";
import Back from "../../components/Back";
import { Box, Button, Typography } from "@mui/material";
import CustomTitle from "../../components/custom/CustomTitle";
import CustomizedMaterialTable from "../../components/tables/CustomizedMaterialTable";
import { STUDENT_RESULT_COLUMNS } from "../../mockup/columns/studentColumns";
import { useQuery } from "@tanstack/react-query";
import { getSubjectScore } from "../../api/ExaminationAPI";
import useLevelById from "../../components/hooks/useLevelById";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import AddStudentRecord from "./AddStudentRecord";

function AssignedCoursesResults() {
  const { schoolSessionDispatch } = useContext(SchoolSessionContext);
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { level, levelId } = useParams();

  const { gradeSystem } = useLevelById(levelId);

  const scores = useQuery({
    queryKey: ["subject-score", levelId, searchParams.get("sub")],
    queryFn: () =>
      getSubjectScore({
        id: levelId,
        subject: searchParams.get("sub"),
      }),
    enabled: !!levelId && !!searchParams.get("sub"),
  });

  const handleImportResults = () => {
    navigate(
      `/examination/level/${levelId}/${level}/upload?sub=${searchParams.get(
        "sub"
      )}`,
      {
        state: {
          prevPath: `/course/assign/${levelId}/${level}?sub=${searchParams.get(
            "sub"
          )}`,
        },
      }
    );
  };

  const handleOpenAddResults = (rowData) => {
    schoolSessionDispatch({
      type: "addStudentResults",
      payload: {
        open: true,
        data: {
          _id: rowData?._id,
          indexnumber: rowData?.indexnumber,
          levelId: state?.id,
          ...rowData?.course,
        },
        grade: gradeSystem,
      },
    });
  };

  if (!levelId && !searchParams.get("sub")) {
    return <Navigate to="/course/assign" />;
  }

  const columns = [
    ...STUDENT_RESULT_COLUMNS,
    {
      field: null,
      title: "Action",
      render: (rowData) => (
        <Button
          variant="outlined"
          onClick={() => handleOpenAddResults(rowData)}
        >
          Add Record
        </Button>
      ),
    },
  ];

  return (
    <>
      <Back to="/course/assign" color="primary.main" />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "space-around", md: "space-between" },
          alignItems: "center",
          bgcolor: "#fff",
          mb: 4,
          p: 1,
          pr: 2,
        }}
      >
        <CustomTitle
          title="Manage Student Records"
          subtitle="Track,manage and control academic and class activities"
          icon={<SchoolIcon color="inherit" sx={{ width: 50, height: 50 }} />}
          color="primary.main"
        />
        <Typography
          // sx={{ display: { xs: "none", md: "inline-flex" } }}
          variant="h5"
          paragraph
          whiteSpace="nowrap"
        >
          {state?.type}
        </Typography>
      </Box>

      {/* <Divider /> */}

      <CustomizedMaterialTable
        search={true}
        isPending={scores.isPending}
        title={state?.type}
        subtitle={searchParams.get("sub")}
        exportFileName={`${level}-${searchParams.get("sub")}` || ""}
        columns={columns}
        data={scores.data}
        actions={
          [
            // {
            //   icon: () => <BookSharp color="warning" />,
            //   position: "toolbar",
            //   tooltip: "Import Results",
            //   onClick: handleOpenImportResult,
            //   isFreeAction: true,
            // },
          ]
        }
        icon={student_icon}
        handleRefresh={scores?.refetch}
        autoCompleteComponent={
          <Button variant="contained" onClick={handleImportResults}>
            Import Records
          </Button>
        }
      />

      <AddStudentRecord />
    </>
  );
}

export default AssignedCoursesResults;
