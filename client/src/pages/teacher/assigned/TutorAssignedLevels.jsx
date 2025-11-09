import React from "react";
import { Container } from "@mui/material";
import CustomTitle from "@/components/custom/CustomTitle";
import useLevel from "@/components/hooks/useLevel";
import CustomizedMaterialTable from "@/components/tables/CustomizedMaterialTable";
import { TEACHER_ASSIGNED_LEVELS_COLUMNS } from "@/mockup/columns/teacherColumn";
import _ from "lodash";
const TutorAssignedLevels = () => {
  //GET All Courses Assigned to Teacher
  const { levelsOption, levelLoading, levelRefetch } = useLevel();

  const levels = levelsOption?.map((level) => {
    if (_.isEmpty(level?.teacher)) return;
    return {
      _id: level?._id,
      level: level?.type,
      teacher: level?.teacher,
      noOfSubjects: level?.noOfSubjects,
      noOfStudents: level?.noOfStudents,
    };
  });
  const assignedLevels = _.compact(levels);

  return (
    <Container maxWidth="lg">
      <CustomTitle
        title="Assigned Levels Portal"
        subtitle="Explore Our Faculty: Meet the Dedicated Educators Shaping Tomorrow's Leaders"
        // img={teacher_icon}
        color="primary.main"
      />

      <CustomizedMaterialTable
        title="Assigned Levels"
        // icon={teacher_icon}
        isPending={levelLoading}
        columns={TEACHER_ASSIGNED_LEVELS_COLUMNS}
        data={assignedLevels}
        actions={[]}
        options={{
          search: true,
        }}
        handleRefresh={levelRefetch}
      />
    </Container>
  );
};

export default TutorAssignedLevels;
