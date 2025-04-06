import React from "react";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import FeeNav from "./layout/FeeNav";

const Fees = () => {
  return (
    <>
      <FeeNav />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </>
  );
};

Fees.propTypes = {};

export default Fees;
