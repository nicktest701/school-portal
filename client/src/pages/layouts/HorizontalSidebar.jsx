import React, { useContext } from "react";
import { Drawer, IconButton, Stack } from "@mui/material";
import {
  AnnouncementRounded,
  BookRounded,
  Close,
  Event,
  NotificationsSharp,
} from "@mui/icons-material";

import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import Person2Rounded from "@mui/icons-material/Person2Rounded";
import LocalLibraryRounded from "@mui/icons-material/LocalLibraryRounded";
import PaymentsRounded from "@mui/icons-material/PaymentsRounded";
import SmsRounded from "@mui/icons-material/SmsRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import BedroomBabyRoundedIcon from "@mui/icons-material/BedroomBabyRounded";
import DataThresholdingRoundedIcon from "@mui/icons-material/DataThresholdingRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import PropTypes from "prop-types";
import MiniDrawerItem from "../../components/MiniDrawerItem";
import { UserContext } from "../../context/providers/UserProvider";

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

        {user?.role === "administrator" ? (
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
              title="Notifications & Activites"
              icon={<NotificationsSharp />}
              to="/notifications"
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
            <MiniDrawerItem
              title={"Dashboard"}
              icon={<GridViewRoundedIcon />}
              to="/"
              handleClose={handleClose}
            />

            <MiniDrawerItem
              title={"Summary"}
              icon={<BookRounded />}
              to="/course"
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title={"Levels"}
              icon={<BedroomBabyRoundedIcon />}
              to="/course/level"
            />
            <MiniDrawerItem
              title={"Courses"}
              icon={<BookRounded />}
              to="/course/assign"
              handleClose={handleClose}
            />
          </>
        )}
        <MiniDrawerItem
          title="Profile"
          icon={<PeopleAltRoundedIcon />}
          to="/profile"
          handleClose={handleClose}
        />

        <MiniDrawerItem title="Events" icon={<Event />} to="/events" />
        <MiniDrawerItem
          title="Announcements"
          icon={<AnnouncementRounded />}
          to="/announcements"
          handleClose={handleClose}
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
