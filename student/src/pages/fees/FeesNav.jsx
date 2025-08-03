import React from "react";
import { AppBar, Container, Toolbar } from "@mui/material";
import NavLinkItem from "@/components/list/NavLinkItem";

const FeesNav = () => {
  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "whitesmoke" }} elevation={0}>
        <Toolbar>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 2,
              // paddingY: 1,
            }}
          >
            <NavLinkItem to="/fees" text="Dashboard" />
            <NavLinkItem to="/fees/payment" text="Payments" />
     
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default FeesNav;
