import React from "react";
import { Avatar, Drawer, IconButton, Stack } from "@mui/material";
import {
  AnnouncementRounded,
  BookRounded,
  Close,
  DescriptionRounded,
  Event,
  ListAltSharp,
  Person,
  SchoolRounded,
} from "@mui/icons-material";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import PropTypes from "prop-types";
import MiniDrawerItem from "@/components/MiniDrawerItem";
import HorizontalNavLinkItemCollapse from "@/components/dropdowns/HorizontalNavLinkItemCollapse";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const HorizontalSidebar = ({ open, setOpen }) => {
  const { user, logOutUser, school_info } = useAuth();

  const handleClose = () => setOpen(false);

  return (
    <Drawer open={open} onClose={handleClose} sx={{ zIndex: 9999 }}>
      <Stack
        sx={{
          minHeight: "100vh",
          width: "100%",
          minWidth: 300,
          px: 1,
        }}
        bgcolor="#fff"
        spacing={1}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={1}
        >
          <Link to="/" onClick={handleClose}>
            {school_info?.badge ? (
              <Avatar
                alt="school logo"
                loading="lazy"
                srcSet={school_info?.badge}
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "var(--secondary)",
                }}
              >
                {school_info?.name[0]}
              </Avatar>
            ) : (
              <SchoolRounded sx={{ width: 64, height: 64 }} />
            )}
          </Link>
          <IconButton sx={{ alignSelf: "flex-end" }} onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>

        {user?.role === "administrator" && (
          <>
            <MiniDrawerItem
              title="Dashboard"
              to="/"
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title="Sessions"
              to="/session"
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title="Departments & Houses"
              to="/departments-houses"
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title="Levels"
              to="/level"
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title="Subjects & Grades"
              to="/subject"
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title="Students"
              to="/student"
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title="Teachers"
              to="/teacher"
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title="School Fees"
              to="/fee"
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title="Exams Portal"
              to="/examination"
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title="Data Uploads"
              to="/uploads"
              handleClose={handleClose}
            />

            <MiniDrawerItem
              title="Messages"
              to="/messages"
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title="Events"
              icon={<Event />}
              to="/events"
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title="Announcements"
              icon={<AnnouncementRounded />}
              to="/announcements"
              handleClose={handleClose}
            />

            <MiniDrawerItem
              title="Profile"
              icon={<PeopleAltRoundedIcon />}
              to="/profile"
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title="Users"
              to="/users"
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title="Settings"
              to="/settings"
              handleClose={handleClose}
            />
          </>
        )}

        {user?.role === "teacher" && (
          <>
            <MiniDrawerItem
              title={"Dashboard"}
              icon={<GridViewRoundedIcon />}
              to="/"
              handleClose={handleClose}
            />

            <HorizontalNavLinkItemCollapse
              icon={<Person htmlColor="" />}
              title={"Manage Students"}
              to="/course"
              mini={true}
            >
              <MiniDrawerItem
                title={"Home"}
                icon={<BookRounded />}
                to="/course"
                handleClose={handleClose}
              />
              <MiniDrawerItem
                title={"Levels"}
                icon={<ListAltSharp />}
                to="/course/level"
                handleClose={handleClose}
              />
              <MiniDrawerItem
                title={"Courses"}
                icon={<BookRounded />}
                to="/course/assign"
                handleClose={handleClose}
              />
            </HorizontalNavLinkItemCollapse>
            <MiniDrawerItem
              title={"Events"}
              icon={<Event />}
              to="/events"
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title={"Announcements"}
              icon={<AnnouncementRounded />}
              to="/announcements"
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title={"Profile"}
              icon={<PeopleAltRoundedIcon />}
              to="/profile"
              handleClose={handleClose}
            />
          </>
        )}

        <MiniDrawerItem
          title={"Notes Board"}
          icon={<DescriptionRounded />}
          to="/notes"
          handleClose={handleClose}
        />

        <MiniDrawerItem title="About" to="/about" handleClose={handleClose} />
        <p
          className="mini-drawer-link"
          style={{ cursor: "pointer" }}
          onClick={logOutUser}
        >
          Log Out
        </p>
        <small style={{ alignSelf: "center" }}>Frebby Tech Consults</small>
      </Stack>
    </Drawer>
  );
};

HorizontalSidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onLogOut: PropTypes.func,
};

export default HorizontalSidebar;
