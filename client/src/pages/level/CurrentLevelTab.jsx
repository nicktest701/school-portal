import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { STUDENTS_COLUMN } from "../../mockup/columns/studentColumns";
import CustomizedMaterialTable from "../../components/tables/CustomizedMaterialTable";
import { EMPTY_IMAGES } from "../../config/images";
import EmptyDataContainer from "../../components/EmptyDataContainer";
import FileDialog from "../../components/modals/FileDialog";
import useLevelById from "../../components/hooks/useLevelById";
import student_icon from "../../assets/images/header/student_ico.svg";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import LoadingSpinner from "../../components/spinners/LoadingSpinner";

const CurrentLevelTab = () => {
  const { id, type } = useParams();
  const navigate = useNavigate();

  //Get Students in Current Level id
  const { students, rollNumber, levelLoading } = useLevelById(id);

  const handleGotoNewStudent = () => {
    navigate(`/student/new`);
  };
  const handleOpenAttendance = () => {
    navigate(`/level/attendance/${id}/${type}`);
  };

  if (levelLoading) {
    return <LoadingSpinner value="Loading Student Information" />;
  }

  return (
    <>
      {students?.length === 0 ? (
        <EmptyDataContainer
          img={EMPTY_IMAGES.student}
          message="😑 No Student available.Add your first student to this level"
          buttonText="New Student"
          onClick={handleGotoNewStudent}
          showAddButton={true}
        />
      ) : (
        <CustomizedMaterialTable
          search={true}
          isLoading={levelLoading}
          title={type}
          subtitle={`${rollNumber} Students`}
          exportFileName={type || ""}
          columns={STUDENTS_COLUMN}
          data={students}
          actions={[]}
          autoCompleteComponent={
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleOpenAttendance}
            >
              Make New Attendance
            </Button>
          }
          icon={student_icon}
        />
      )}

      <FileDialog />
    </>
  );
};

export default CurrentLevelTab;
