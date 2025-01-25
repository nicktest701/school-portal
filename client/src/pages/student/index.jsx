import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { getAllStudentsBySession } from "@/api/levelAPI";
import { StudentContext } from "@/context/providers/StudentProvider";
import StudentNav from "./layout/StudentNav";
import { UserContext } from "@/context/providers/UserProvider";

function Student() {
  const {
    userState: { session },
  } = useContext(UserContext);
  const { studentDispatch } = useContext(StudentContext);
  //  console.log(students)

  useQuery({
    queryKey: ["all-students", session],
    queryFn: () => getAllStudentsBySession(session),
    enabled: !!session.sessionId,
    onSuccess: (students) => {
      studentDispatch({ type: "getAllStudents", payload: students });
    },
  });

  return (
    <>
      <StudentNav />  
        <Outlet />
    
    </>
  );
}

export default Student;

// <Container maxWidth="lg">
// </Container>
