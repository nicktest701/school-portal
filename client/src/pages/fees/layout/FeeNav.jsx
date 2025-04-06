import React from "react";
import { AppBar, Container, Toolbar } from "@mui/material";
import NavLinkItem from "@/components/list/NavLinkItem";

const FeeNav = () => {
  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "white" }} elevation={0}>
        <Toolbar>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 2,
              paddingY: 1,
            }}
          >
            <NavLinkItem to="/fee" text="Home" />
            <NavLinkItem to="/fee/new" text="New Fees" />
            <NavLinkItem to="/fee/payment" text="Make Payment" />
            <NavLinkItem to="/fee/history" text="Fee History " />
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default FeeNav;
