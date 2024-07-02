import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
function User() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default User;
