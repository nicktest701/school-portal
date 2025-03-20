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
            <NavLinkItem to="/" text="Home" />
            <NavLinkItem to="new" text="New Fees" />
            <NavLinkItem to="payment" text="Make Payment" />
            <NavLinkItem to="history" text="Quick Search " />
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default FeeNav;
