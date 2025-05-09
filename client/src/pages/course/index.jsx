import React from 'react';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import CourseNav from './CourseNav';

function Course() {
  return (
    <>
      <CourseNav />
      <Container maxWidth='lg'>
        <Outlet />
      </Container>
    </>
  );
}

export default Course;
