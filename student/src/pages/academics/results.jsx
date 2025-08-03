import { getStudent } from "@/api/studentAPI";
import StudentAcademics from "@/components/tabs/student/StudentAcademics";
import { useAuth } from "@/context/AuthProvider";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Results = () => {
  const { user } = useAuth();

  const {
    data: student,
    isPending,
    isLoading,
  } = useQuery({
    queryKey: ["student-profile", user?._id],
    queryFn: () => getStudent(user?._id),
    enabled: !!user?._id,
    initialData: {
      profile: user,
    },
  });

  return (
    <Box>
      <StudentAcademics data={student?.exams} />
    </Box>
  );
};

export default Results;
