import React, { useContext } from "react";
import CustomTitle from "@/components/custom/CustomTitle";
import CustomizedMaterialTable from "@/components/tables/CustomizedMaterialTable";
import { Button } from "@mui/material";
import { EMPTY_IMAGES } from "@/config/images";
import { SchoolRounded } from "@mui/icons-material";
import { ASSIGNED_COURSE_COLUMNS } from "@/mockup/columns/sessionColumns";
import { UserContext } from "@/context/providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCourseByTeacher } from "@/api/courseAPI";

function AssignCourses() {
  const navigate = useNavigate();
  const {
    user,
    session
  } = useContext(UserContext);

  const courses = useQuery({
    queryKey: ["courses", user?.id],
    queryFn: () =>
      getCourseByTeacher({
        teacher: user?.id,
        session: session?.sessionId,
        term: session?.termId,
      }),
  });

  const viewStudents = ({ _id, levelId, subject, level }) =>
    navigate(`/course/assign/${levelId}?_id=${subject?._id}`, {
      state: {
        id: _id,
        subject,
        type: level,
        levelId,
      },
    });
  // console.log(courses.data);

  const columns = [
    ...ASSIGNED_COURSE_COLUMNS,
    {
      field: null,
      title: "Action",
      render: (rowData) => (
        <Button
          variant="outlined"
          color="info"
          onClick={() => viewStudents(rowData)}
        >
          Manage Results
        </Button>
      ),
    },
  ];
  return (
    <>
      <CustomTitle
        title="Assigned Courses"
        subtitle="Track,manage and control courses assigned to you"
        icon={<SchoolRounded color="primary" />}
        color="primary.main"
      />

      <CustomizedMaterialTable
        title="Courses"
        isPending={courses.isPending}
        columns={columns}
        data={courses.data}
        actions={[]}
        showRowShadow={false}
        addButtonImg={EMPTY_IMAGES.session}
        addButtonMessage="😑 No course has been assign!"
        handleRefresh={courses.refetch}
        options={{
          selection: false,
        }}
      />
    </>
  );
}

export default AssignCourses;
