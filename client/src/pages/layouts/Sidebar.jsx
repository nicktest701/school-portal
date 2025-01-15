import React, { useContext, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import Person2Rounded from "@mui/icons-material/Person2Rounded";
import LocalLibraryRounded from "@mui/icons-material/LocalLibraryRounded";
import PaymentsRounded from "@mui/icons-material/PaymentsRounded";
import SmsRounded from "@mui/icons-material/SmsRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import BedroomBabyRoundedIcon from "@mui/icons-material/BedroomBabyRounded";
import DataThresholdingRoundedIcon from "@mui/icons-material/DataThresholdingRounded";
import DrawerItem from "../../components/DrawerItem";
import {
  BookRounded,
  ExitToAppSharp,
  NotificationsSharp,
  NumbersSharp,
  SchoolRounded,
  Event,
  ImportExportRounded,
  ArrowBackIos,
  ArrowForwardIos,
  AnnouncementRounded,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import { UserContext } from "../../context/providers/UserProvider";

const Sidebar = () => {
  const school_info = JSON.parse(localStorage.getItem("@school_info"));
  const [toggleWidth, setToggleWidth] = useState(false);
  const { user, logOutUser } = useContext(UserContext);

  const handleClose = () => {
    setToggleWidth(!toggleWidth);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        pt: 2,
        height: "100dvh",
        display: { xs: "none", sm: "inline-flex" },
        transition: "all 0.4s ease-in-out",
        bgcolor: "primary.main",
      }}
    >
      <Box sx={{ width: toggleWidth ? 80 : { xs: 0, sm: 80, md: 240 } }}>
        <Stack alignItems={{ xs: "left", sm: "center" }} pb={2} spacing={2}>
          <IconButton
            edge="end"
            sx={{
              alignSelf: toggleWidth ? "center" : "flex-end",
            }}
            onClick={handleClose}
          >
            {toggleWidth ? <ArrowForwardIos /> : <ArrowBackIos />}
          </IconButton>
          {school_info?.badge ? (
            <Avatar
              alt="school logo"
              loading="lazy"
              srcSet={`${import.meta.env.VITE_BASE_URL}/images/users/${
                school_info?.badge
              }`}
              sx={{
                width: 40,
                height: 40,
              }}
            />
          ) : (
            <SchoolRounded sx={{ width: 40, height: 40 }} />
          )}

          <Typography
            textAlign="center"
            variant="body2"
            display={{ xs: "none", md: "block" }}
            color="white"
            textTransform="uppercase"
          >
            {!toggleWidth && school_info?.name}
          </Typography>
        </Stack>
        <Divider />
        <Stack
          className="sidebar"
          padding={1}
          flex={1}
          sx={{
            height: "100%",
            overflowY: "scroll",
            pb: 20,
          }}
        >
          {user?.role === "administrator" ? (
            <>
              <DrawerItem
                title={toggleWidth ? "" : "Dashboard"}
                icon={<GridViewRoundedIcon />}
                to="/"
              />
              <DrawerItem
                title={toggleWidth ? "" : "Sessions"}
                icon={<ArticleRoundedIcon />}
                to="/session"
              />

              <DrawerItem
                title={toggleWidth ? "" : "Levels "}
                icon={<BedroomBabyRoundedIcon />}
                to="/level"
              />
              <DrawerItem
                title={toggleWidth ? "" : "Subjects & Grades"}
                icon={<NumbersSharp />}
                to="/subject"
              />
              <DrawerItem
                title={toggleWidth ? "" : "Students"}
                icon={<LocalLibraryRounded />}
                to="/student"
              />
              <DrawerItem
                title={toggleWidth ? "" : "Teachers"}
                icon={<Person2Rounded />}
                to="/teacher"
              />
              <DrawerItem
                title={toggleWidth ? "" : "School Fees"}
                icon={<PaymentsRounded />}
                to="/fee"
              />
              <DrawerItem
                title={toggleWidth ? "" : "Exams Portal"}
                icon={<DataThresholdingRoundedIcon />}
                to="/examination"
              />

              <DrawerItem
                title={toggleWidth ? "" : "Messages"}
                icon={<SmsRounded />}
                to="/sms"
              />
              <DrawerItem
                title={toggleWidth ? "" : "Data Uploads"}
                icon={<ImportExportRounded />}
                to="/uploads"
              />

              <>
                <DrawerItem
                  title={toggleWidth ? "" : "Users"}
                  icon={<PeopleAltRoundedIcon />}
                  to="/users"
                />
              </>
              <DrawerItem
                title={toggleWidth ? "" : "Settings"}
                icon={<SettingsRoundedIcon />}
                to="/settings"
              />
            </>
          ) : (
            <>
              {/* <DrawerItem
              title='Perfomance Index'
              icon={<StarsSharp />}
              to='/course';
            /> */}
              <DrawerItem
                title={toggleWidth ? "" : "Levels & Courses"}
                icon={<BookRounded />}
                to="/course"
              />
            </>
          )}
          <DrawerItem
            title={toggleWidth ? "" : "Profile"}
            icon={<PeopleAltRoundedIcon />}
            to="/profile"
          />

          <DrawerItem
            title={toggleWidth ? "" : "Events"}
            icon={<Event />}
            to="/events"
          />
          <DrawerItem
            title={toggleWidth ? "" : "Announcements"}
            icon={<AnnouncementRounded />}
            to="/announcements"
          />

          <DrawerItem
            title={toggleWidth ? "" : "Notifications & Activites"}
            icon={<NotificationsSharp />}
            to="/notifications"
          />

          <DrawerItem
            title={toggleWidth ? "" : "About"}
            icon={<InfoRoundedIcon />}
            to="/about"
          />

          <Button
            variant="text"
            color="secondary"
            startIcon={<ExitToAppSharp />}
            sx={{ display: { xs: "none", md: "flex" }, pl: 2 }}
            onClick={logOutUser}
          >
            {toggleWidth ? "" : " Log out"}
          </Button>
          <IconButton
            sx={{ display: { xs: "inline-flex", md: "none" }, pl: "12px" }}
            onClick={logOutUser}
          >
            <ExitToAppSharp />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

Sidebar.propTypes = {
  onLogOut: PropTypes.func,
};

export default Sidebar;
