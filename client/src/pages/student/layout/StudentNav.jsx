import React from "react";
import { AppBar, Container, Toolbar } from "@mui/material";
import NavLinkItem from "@/components/list/NavLinkItem";

const StudentNav = () => {
  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "white" }} elevation={0}>
        <Toolbar>
          <Container
            // direction='row'
            sx={{
              width: { xs: 300, sm: "100%" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 2,
              paddingY: 1,
              bgcolor: "white",
            }}
          >
            <NavLinkItem to="/student" color="#012e54" text="Home" />
            <NavLinkItem
              to="/student/view"
              color="#012e54"
              text="View Students"
            />
            <NavLinkItem to="/student/new" color="#012e54" text="New Student" />
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default StudentNav;
