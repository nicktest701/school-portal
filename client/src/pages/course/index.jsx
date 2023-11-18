import React from 'react';
import { Outlet } from 'react-router-dom';
import CourseNav from './CourseNav';

function Course() {
  return (
    <>
    <CourseNav/>
    <Outlet />
    </>
  );
}

export default Course;
