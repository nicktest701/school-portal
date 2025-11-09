import React from "react";
import { AppBar, Container, Toolbar } from "@mui/material";
import NavLinkItem from "@/components/list/NavLinkItem";

const TeacherNav = () => {
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
            <NavLinkItem to="/teacher" color="#012e54" text="Teachers" />
            <NavLinkItem
              to="/teacher/levels"
              color="#012e54"
              text="Levels"
            />
            <NavLinkItem to="/teacher/courses" color="#012e54" text="Courses" />
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default TeacherNav;
