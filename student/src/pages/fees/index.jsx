import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import FeesNav from "./FeesNav";
import CustomTitle from "@/components/custom/CustomTitle";
import AnimatedContainer from "@/components/animations/AnimatedContainer";
import fee_ico from "@/assets/header/fee_ico.svg";

const Fees = () => {
  return (
    <Container fullWidth>
      <CustomTitle
        title="Fees"
        subtitle="Manage and view your fees information"
        img={fee_ico}
      />
      <FeesNav />
      <AnimatedContainer>
        <Outlet />
      </AnimatedContainer>
    </Container>
  );
};

export default Fees;
