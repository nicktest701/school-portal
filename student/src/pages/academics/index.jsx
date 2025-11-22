import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import AcademicsNav from "./AcademicsNav";
import CustomTitle from "@/components/custom/CustomTitle";
import exams_ico from "../../assets/images/header/exams_ico.svg";
import AnimatedContainer from "@/components/animations/AnimatedContainer";

const Academics = () => {
  return (
    <Container sx={{ p: 0 }}>
      <CustomTitle
        title="Academics"
        subtitle="Manage your academic records, view results, and track progress."
        img={exams_ico}
        color="primary.main"
      />
      <AcademicsNav />
      <AnimatedContainer>
        <Outlet />
      </AnimatedContainer>
    </Container>
  );
};

export default Academics;
