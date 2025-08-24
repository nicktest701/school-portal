import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import CustomTitle from "@/components/custom/CustomTitle";
import AnimatedContainer from "@/components/animations/AnimatedContainer";
import AttendanceNav from "./attendance-nav";
import attendance_ico from "@/assets/header/attendance.svg";

const Attendance = () => {
  return (
    <Container fullWidth>
      <CustomTitle
        title="Attendance History"
        subtitle="View and manage your attendance records"
        img={attendance_ico}
      />
      <AttendanceNav />
      <AnimatedContainer>
        <Outlet />
      </AnimatedContainer>
    </Container>
  );
};

export default Attendance;
