import Title from "@/components/custom/Title";
import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import FeesNav from "./FeesNav";

const Fees = () => {
  return (
    <Container fullWidth>
      <Title title="Fees" subtitle="Edit your profile information" />
      <FeesNav />
      <Outlet />
    </Container>
  );
};

export default Fees;
