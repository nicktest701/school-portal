import { getAllCourseAssignedToTeacher } from "@/api/teacherAPI";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@mui/material";
import CustomTitle from "@/components/custom/CustomTitle";
import CustomizedMaterialTable from "@/components/tables/CustomizedMaterialTable";
import { TEACHER_ASSIGNED_COURSES_COLUMNS } from "@/mockup/columns/teacherColumn";

const TutorAssignedCourses = () => {
  //GET All Courses Assigned to Teacher
  const courses = useQuery({
    queryKey: ["teacher/courses"],
    queryFn: getAllCourseAssignedToTeacher,
    enabled: true,
    refetchOnMount: false,
  });

  return (
    <Container maxWidth="lg">
      <CustomTitle
        title="Assigned Courses Portal"
        subtitle="View all courses assigned to you as a facilitator."
        // img={teacher_icon}
        color="primary.main"
      />

      <CustomizedMaterialTable
        title="Assigned Courses"
        // icon={teacher_icon}
        isPending={courses.isPending || courses.isLoading}
        columns={TEACHER_ASSIGNED_COURSES_COLUMNS}
        data={courses.data}
        actions={[]}
        options={{
          search: true,
        }}
        handleRefresh={courses?.refetch}
      />
    </Container>
  );
};

export default TutorAssignedCourses;
