import Title from "@/components/custom/Title";
import {  Container,  } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import AcademicsNav from "./AcademicsNav";
import CustomTitle from "@/components/custom/CustomTitle";

const Academics = () => {
  return (
    <Container>
      <CustomTitle
        title="Academics"
        subtitle=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic, autem!"
      />
      <AcademicsNav />
      <Outlet />
    </Container>
  );
};

export default Academics;
