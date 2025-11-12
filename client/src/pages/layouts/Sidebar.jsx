import React, { useState } from "react";
import _ from "lodash";
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
import LocalLibraryRounded from "@mui/icons-material/LocalLibraryRounded";
import PaymentsRounded from "@mui/icons-material/PaymentsRounded";
import SmsRounded from "@mui/icons-material/SmsRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import BedroomBabyRoundedIcon from "@mui/icons-material/BedroomBabyRounded";
import DataThresholdingRoundedIcon from "@mui/icons-material/DataThresholdingRounded";
import DrawerItem from "@/components/DrawerItem";
import {
  BookRounded,
  ExitToAppSharp,
  NumbersSharp,
  SchoolRounded,
  Event,
  ImportExportRounded,
  ArrowBackIos,
  ArrowForwardIos,
  AnnouncementRounded,
  DescriptionRounded,
  ListAltSharp,
  Person3Rounded,
  BarChartRounded,
  AddCircleRounded,
  HistoryRounded,
  Groups3,
  HouseRounded,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import NavLinkItemCollapse from "@/components/dropdowns/NavLinkItemCollapse";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { getLevelInitials } from "@/config/helper";

const Sidebar = () => {
  const [toggleWidth, setToggleWidth] = useState(false);
  const { user, logOutUser, school_info } = useAuth();
  const handleClose = () => {
    setToggleWidth(!toggleWidth);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        pt: 2,
        height: "100svh",
        display: { xs: "none", md: "inline-flex" },
        bgcolor: "primary.main",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: toggleWidth ? 70 : { xs: 0, md: 250 },
          transition: "width 300ms ease-in-out",
        }}
      >
        <Stack alignItems={{ xs: "left", md: "center" }} pb={2} spacing={2}>
          <IconButton
            edge="end"
            sx={{
              alignSelf: toggleWidth ? "center" : "flex-end",
            }}
            onClick={handleClose}
          >
            {toggleWidth ? <ArrowForwardIos /> : <ArrowBackIos />}
          </IconButton>
          <Link to="/">
            {!_.isEmpty(school_info?.badge) ? (
              <Avatar
                alt="school logo"
                loading="lazy"
                srcSet={school_info?.badge}
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: "#fff",
                  color: "var(--primary-color)",
                }}
              >
                {getLevelInitials(school_info?.name)}
              </Avatar>
            ) : (
              <SchoolRounded sx={{ width: 64, height: 64 }} />
            )}
          </Link>

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
            pb: 36,
          }}
        >
          {user?.role === "administrator" && (
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
                title={toggleWidth ? "" : "Departments & Houses"}
                icon={<HouseRounded />}
                to="/departments-houses"
              />

              <DrawerItem
                title={toggleWidth ? "" : "Levels "}
                icon={<ListAltSharp />}
                to="/level"
              />
              <DrawerItem
                title={toggleWidth ? "" : "Subjects & Grades"}
                icon={<NumbersSharp />}
                to="/subject"
              />
              <Divider />

              <NavLinkItemCollapse
                icon={<LocalLibraryRounded htmlColor="" />}
                title={toggleWidth ? "" : "Students"}
                to="/student"
                toggleWidth={toggleWidth}
              >
                <DrawerItem
                  title={toggleWidth ? "" : "Dashboard"}
                  icon={<BarChartRounded />}
                  to="/student"
                />
                <DrawerItem
                  title={toggleWidth ? "" : "All Students"}
                  icon={<ListAltSharp />}
                  to="/student/view"
                />
                <DrawerItem
                  title={toggleWidth ? "" : "New Student"}
                  icon={<AddCircleRounded />}
                  to="/student/new"
                />
              </NavLinkItemCollapse>

              <NavLinkItemCollapse
                icon={<Groups3 htmlColor="" />}
                title={toggleWidth ? "" : "Teachers"}
                to="/teacher"
                toggleWidth={toggleWidth}
              >
                <DrawerItem
                  title={toggleWidth ? "" : "All Teachers"}
                  icon={<BedroomBabyRoundedIcon />}
                  to="/teacher"
                />
                <DrawerItem
                  title={toggleWidth ? "" : "Assigned Levels"}
                  icon={<ListAltSharp />}
                  to="/teacher/levels"
                />
                <DrawerItem
                  title={toggleWidth ? "" : "Assigned Courses"}
                  icon={<BookRounded />}
                  to="/teacher/courses"
                />
              </NavLinkItemCollapse>

              <NavLinkItemCollapse
                icon={<PaymentsRounded htmlColor="" />}
                title={toggleWidth ? "" : "School Fees"}
                to="/fee"
                toggleWidth={toggleWidth}
              >
                <DrawerItem
                  title={toggleWidth ? "" : "Dashboard"}
                  icon={<BarChartRounded />}
                  to="/fee"
                />
                <DrawerItem
                  title={toggleWidth ? "" : "New Fees"}
                  icon={<AddCircleRounded />}
                  to="/fee/new"
                />
                <DrawerItem
                  title={toggleWidth ? "" : "Make Payments"}
                  icon={<BookRounded />}
                  to="/fee/payment"
                />
                <DrawerItem
                  title={toggleWidth ? "" : "Fees History"}
                  icon={<HistoryRounded />}
                  to="/fee/history"
                />
              </NavLinkItemCollapse>

              <DrawerItem
                title={toggleWidth ? "" : "Exams Portal"}
                icon={<DataThresholdingRoundedIcon />}
                to="/examination"
              />
              <Divider />

              <DrawerItem
                title={toggleWidth ? "" : "Data Uploads"}
                icon={<ImportExportRounded />}
                to="/uploads"
              />

              <DrawerItem
                title={toggleWidth ? "" : "Messages"}
                icon={<SmsRounded />}
                to="/messages"
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
              <Divider />
              <DrawerItem
                title={toggleWidth ? "" : "Users"}
                icon={<PeopleAltRoundedIcon />}
                to="/users"
              />
              <DrawerItem
                title={toggleWidth ? "" : "Profile"}
                icon={<Person3Rounded />}
                to="/profile"
              />
              <DrawerItem
                title={toggleWidth ? "" : "Settings"}
                icon={<SettingsRoundedIcon />}
                to="/settings"
              />
            </>
          )}

          {user?.role === "teacher" && (
            <>
              <DrawerItem
                title={toggleWidth ? "" : "Dashboard"}
                icon={<GridViewRoundedIcon />}
                to="/"
              />

              <NavLinkItemCollapse
                icon={<LocalLibraryRounded htmlColor="" />}
                title={toggleWidth ? "" : "Manage Students"}
                to="/course"
                toggleWidth={toggleWidth}
              >
                <DrawerItem
                  title={toggleWidth ? "" : "Overview"}
                  icon={<BarChartRounded />}
                  to="/course"
                />
                <DrawerItem
                  title={toggleWidth ? "" : "Levels"}
                  icon={<ListAltSharp />}
                  to="/course/level"
                />
                <DrawerItem
                  title={toggleWidth ? "" : "Courses"}
                  icon={<BookRounded />}
                  to="/course/assign"
                />
              </NavLinkItemCollapse>

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
                title={toggleWidth ? "" : "Profile"}
                icon={<PeopleAltRoundedIcon />}
                to="/profile"
              />
            </>
          )}

          <DrawerItem
            title={toggleWidth ? "" : "Notes Board"}
            icon={<DescriptionRounded />}
            to="/notes"
          />
          <Divider />
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
