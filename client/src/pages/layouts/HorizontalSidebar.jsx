import React, { useContext } from "react";
import { Drawer, IconButton, Stack } from "@mui/material";
import { AnnouncementRounded, Close, Event, NotificationsSharp } from "@mui/icons-material";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import PropTypes from "prop-types";
import MiniDrawerItem from "../../components/MiniDrawerItem";
import { UserContext } from "../../context/providers/UserProvider";
import DrawerItem from "../../components/DrawerItem";

const HorizontalSidebar = ({ open, setOpen }) => {
  const { user, logOutUser } = useContext(UserContext);

  const handleClose = () => setOpen(false);

  return (
    <Drawer open={open} onClose={handleClose} sx={{ zIndex: 9999 }}>
      <Stack
        sx={{
          minHeight: "100vh",
          width: "100%",
          minWidth: 280,
        }}
        bgcolor="#fff"
        spacing={1}
      >
        <IconButton sx={{ alignSelf: "flex-end" }} onClick={handleClose}>
          <Close />
        </IconButton>

        <MiniDrawerItem title="Dashboard" to="/" handleClose={handleClose} />

        {user?.role === "administrator" ? (
          <>
            <MiniDrawerItem
              title="Sessions"
              to="/session"
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
              title="Messages"
              to="/sms"
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title="Data Uploads"
              to="/uploads"
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
        ) : (
          <>
            {/* <MiniDrawerItem
              title='Performance Index'
              to='/course'
              handleClose={handleClose}
            /> */}
            <MiniDrawerItem
              title="Levels & Courses"
              to="/course"
              handleClose={handleClose}
            />
          </>
        )}
        <MiniDrawerItem
          title="Profile"
          icon={<PeopleAltRoundedIcon />}
          to="/profile"
        />

        <MiniDrawerItem title="Events" icon={<Event />} to="/events" />
        <MiniDrawerItem title="Announcements" icon={<AnnouncementRounded />} to="/announcements" />

        <MiniDrawerItem
          title="Notifications & Activites"
          icon={<NotificationsSharp />}
          to="/notifications"
        />
        <MiniDrawerItem title="About" to="/about" handleClose={handleClose} />
        <a className="mini-drawer-link" onClick={logOutUser}>
          Log Out
        </a>
        <small style={{ alignSelf: "center" }}>Frebby Tech Consults</small>
      </Stack>
    </Drawer>
  );
};

HorizontalSidebar.propTypes = {
  onLogOut: PropTypes.func,
};

export default HorizontalSidebar;
