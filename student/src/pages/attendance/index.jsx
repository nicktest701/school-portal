import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import CustomTitle from "@/components/custom/CustomTitle";
import AnimatedContainer from "@/components/animations/AnimatedContainer";
import AttendanceNav from "./attendance-nav";

const Attendance = () => {
  return (
    <Container fullWidth>
      <CustomTitle
        title="Attendance History"
        subtitle="View and manage your attendance records"
      />
      <AttendanceNav />
      <AnimatedContainer>
        <Outlet />
      </AnimatedContainer>
    </Container>
  );
};

export default Attendance;
