import React from "react";
// import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
// import { getAllStudentsBySession } from "@/api/levelAPI";
// import { StudentContext } from "@/context/providers/StudentProvider";
import StudentNav from "./layout/StudentNav";
// import { useAuth } from "@/hooks/useAuth";

function Student() {
  // const { session } = useAuth();
  // const { studentDispatch } = useContext(StudentContext);
  //  console.log(students)

  // useQuery({
  //   queryKey: ["all-students", session],
  //   queryFn: () => getAllStudentsBySession(session),
  //   enabled: !!session.sessionId,
  //   onSuccess: (students) => {
  //     studentDispatch({ type: "getAllStudents", payload: students });
  //   },
  // });

  return (
    <>
      <StudentNav />
      <Outlet />
    </>
  );
}

export default Student;
