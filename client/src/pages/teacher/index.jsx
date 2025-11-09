import React from "react";
import { Outlet } from "react-router-dom";
import TeacherNav from "./layout/TeacherNav";
const Teacher = () => {
  return (
    <>
      <TeacherNav />
      <Outlet />
    </>
  );
};

export default Teacher;
