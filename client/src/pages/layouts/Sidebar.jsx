import React, { useContext } from "react";

import {
  Avatar,
  Box,
  Button,
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
  Event
} from "@mui/icons-material";
import PropTypes from "prop-types";
import { UserContext } from "../../context/providers/UserProvider";

const Sidebar = ({ onLogOut }) => {
  const school_info = JSON.parse(localStorage.getItem("@school_info"));

  const { user } = useContext(UserContext);

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        pt: 2,
        width: { xs: 0, sm: 80, md: 220 },
        height: "100dvh",
        display: { xs: "none", sm: "block" },
        transition: "all 0.4s ease-in-out",
        bgcolor: "primary.main",
      }}
    >
      <Stack alignItems={{ xs: "left", sm: "center" }} pb={4} spacing={2}>
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
          variant="caption"
          display={{ xs: "none", md: "block" }}
          color="white"
        >
          {school_info?.name}
        </Typography>
      </Stack>
      {/* <Divider /> */}
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
              title="Dashboard"
              icon={<GridViewRoundedIcon />}
              to="/"
            />
            <DrawerItem
              title="Sessions"
              icon={<ArticleRoundedIcon />}
              to="/session"
            />

            <DrawerItem
              title="Levels "
              icon={<BedroomBabyRoundedIcon />}
              to="/level"
            />
            <DrawerItem
              title="Subjects & Grades"
              icon={<NumbersSharp />}
              to="/subject"
            />
            <DrawerItem
              title="Students"
              icon={<LocalLibraryRounded />}
              to="/student"
            />
            <DrawerItem
              title="Teachers"
              icon={<Person2Rounded />}
              to="/teacher"
            />
            <DrawerItem
              title="School Fees"
              icon={<PaymentsRounded />}
              to="/fee"
            />
            <DrawerItem
              title="Exams Portal"
              icon={<DataThresholdingRoundedIcon />}
              to="/examination"
            />

            <DrawerItem title="Messages" icon={<SmsRounded />} to="/sms" />

            <>
              <DrawerItem
                title="Users"
                icon={<PeopleAltRoundedIcon />}
                to="/users"
              />
            </>
            <DrawerItem
              title="Settings"
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
              title="Levels & Courses"
              icon={<BookRounded />}
              to="/course"
            />
          </>
        )}
        <DrawerItem
         title="Profile"
          icon={<PeopleAltRoundedIcon />}
        to="/profile"
         />


        <DrawerItem
          title="Events"
          icon={<Event />}
          to="/events"
        />

        <DrawerItem
          title="Notifications & Activites"
          icon={<NotificationsSharp />}
          to="/notifications"
        />
        <DrawerItem title="About" icon={<InfoRoundedIcon />} to="/about" />

        <Button
          variant="text"
          color="secondary"
          startIcon={<ExitToAppSharp />}
          sx={{ display: { xs: "none", md: "flex" }, pl: 2 }}
          onClick={onLogOut}
        >
          Log out
        </Button>
        <IconButton
          sx={{ display: { xs: "inline-flex", md: "none" }, pl: "12px" }}
          onClick={onLogOut}
        >
          <ExitToAppSharp />
        </IconButton>
      </Stack>
    </Box>
  );
};

Sidebar.propTypes = {
  onLogOut: PropTypes.func,
};

export default Sidebar;
