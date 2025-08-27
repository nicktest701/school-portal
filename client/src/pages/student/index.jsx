import React from "react";
import { Outlet } from "react-router-dom";
import StudentNav from "./layout/StudentNav";

function Student() {
  return (
    <>
      <StudentNav />
      <Outlet />
    </>
  );
}

export default Student;
