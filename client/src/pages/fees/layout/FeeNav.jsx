import React from "react";
import { AppBar, Container,  Toolbar } from "@mui/material";
import Back from "../../../components/Back";
import NavLinkItem from "../../../components/list/NavLinkItem";

const FeeNav = () => {
  return (
    <>
      <AppBar position="sticky">
        <Back />
        <Toolbar>
          <Container
            // display={{ xs: "none", md: "flex" }}
            // direction="row"
            // width="100%"
            // justifyContent="center"
         
            sx={{
              width: { xs: 400, sm: '100%' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              columnGap: 1,

              overflowX: 'scroll',
              overscrollBehaviorInline: 'contain',
              '&::-webkit-scrollbar': {
                width: '10px',
              },
              paddingY: 1,
            }}
          >
            <NavLinkItem to="" color="secondary" text="Home" />
            <NavLinkItem to="new" color="secondary" text="New Fees" />
            <NavLinkItem to="payment" color="secondary" text="Make Payment" />
            <NavLinkItem to="history" color="secondary" text="Fees History" />
            {/* <NavLinkItem to="settings" color="secondary" text="Settings" /> */}
          </Container>
          {/* <IconButton
            color="inherit"
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <Menu />
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default FeeNav;
