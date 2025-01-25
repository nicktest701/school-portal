import React, { useContext, useMemo, useState } from "react";
import { Autocomplete, Box, Container, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { STUDENTS_COLUMN } from "../../mockup/columns/studentColumns";
import CustomizedMaterialTable from "../../components/tables/CustomizedMaterialTable";
import useLevel from "../../components/hooks/useLevel";
import student_icon from "../../assets/images/header/student_ico.svg";
import { EMPTY_IMAGES } from "../../config/images";
import CustomTitle from "../../components/custom/CustomTitle";
import { useQuery } from "@tanstack/react-query";
import { getAllStudentsBySession } from "../../api/levelAPI";
import { UserContext } from "../../context/providers/UserProvider";

const StudentView = () => {
  const {
    userState: { session },
  } = useContext(UserContext);

  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState({ _id: "", type: "" });

  //GET all current academic levels
  const { levelsOption } = useLevel();

  const all = useQuery({
    queryKey: ["all-students", session?.sessionId],
    queryFn: () => getAllStudentsBySession(session),
    enabled: !!session.sessionId,
    initialData: [],
  });

  const handleRowClick = (rowData) => {
    const id = rowData.levelId;
    const type = rowData.levelName;
    navigate(`/student/profile/${id}/${type}/${rowData._id}`, {
      state: {
        levelId: rowData.levelId,
        levelName: rowData.levelName,
      },
    });
  };
  // console.log(levelsOption)
  const handleRefresh = () => {
    setCurrentLevel({
      _id: "",
      type: "",
    });

    all.refetch();
  };

  const selectedStudents = useMemo(() => {
    if (currentLevel._id === "all") {
      return all.data;
    } else if (currentLevel?._id) {
      const modifiedStudents = all?.data?.filter(
        (student) => student?.levelId === currentLevel?._id
      );
      return modifiedStudents;
    } else {
      return all.data;
    }
  }, [all.data, currentLevel?._id]);

  return (
    <Container maxWidth='xl'>
      <CustomTitle
        title="Students Information"
        subtitle="  Track,manage and control academic and class activities"
        img={student_icon}
        color="primary.main"
      />

      <CustomizedMaterialTable
        isPending={all.isPending}
        title={`${currentLevel?.type || "Students"} (${
          selectedStudents?.length
        })`}
        icon={student_icon}
        search={true}
        columns={STUDENTS_COLUMN}
        actions={[]}
        data={selectedStudents}
        onRowClick={handleRowClick}
        addButtonImg={EMPTY_IMAGES.student}
        addButtonMessage="😑 No Students recently added !!!!"
        // showRowShadow={true}
        handleRefresh={handleRefresh}
        autoCompleteComponent={
          <Autocomplete
            disableClearable
            clearText=" "
            sx={{ width: 280 }}
            options={[
              {
                _id: "all",
                type: "All",
                level: {
                  name: "All",
                  type: "All",
                },
              },
              ...levelsOption,
            ]}
            isOptionEqualToValue={(option, value) =>
              value._id === undefined ||
              value._id === "" ||
              option._id === value._id
            }
            getOptionLabel={(option) => option?.type || ""}
            value={currentLevel}
            onChange={(e, value) => setCurrentLevel(value)}
            renderInput={(params) => (
              <TextField {...params} label="Select Class" size="small" />
            )}
          />
        }
      />
    </Container>
  );
};

StudentView.propTypes = {};

export default StudentView;
