import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import FeesNav from "./FeesNav";
import CustomTitle from "@/components/custom/CustomTitle";
import AnimatedContainer from "@/components/animations/AnimatedContainer";

const Fees = () => {
  return (
    <Container fullWidth>
      <CustomTitle
        title="Fees"
        subtitle="Manage and view your fees information"
      />
      <FeesNav />
      <AnimatedContainer>
        <Outlet />
      </AnimatedContainer>
    </Container>
  );
};

export default Fees;
