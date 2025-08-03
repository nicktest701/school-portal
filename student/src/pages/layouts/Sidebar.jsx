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

import PaymentsRounded from "@mui/icons-material/PaymentsRounded";
import SmsRounded from "@mui/icons-material/SmsRounded";

import DataThresholdingRoundedIcon from "@mui/icons-material/DataThresholdingRounded";
import DrawerItem from "@/components/DrawerItem";
import {
  ExitToAppSharp,
  SchoolRounded,
  Event,
  ArrowBackIos,
  ArrowForwardIos,
  AnnouncementRounded,
  DescriptionRounded,
  ListAltSharp,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

const Sidebar = () => {
  const [toggleWidth, setToggleWidth] = useState(false);
  const { logout, school_info } = useAuth();
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
        display: { xs: "none", md: "inline-flex" },
        bgcolor: "primary.main",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: toggleWidth ? 70 : { xs: 0, md: 220 },
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
                  bgcolor: "var(--secondary)",
                }}
              >
                {school_info?.name[0]}
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
          <>
            <DrawerItem
              title={toggleWidth ? "" : "Dashboard"}
              icon={<GridViewRoundedIcon />}
              to="/"
            />

            <DrawerItem
              title={toggleWidth ? "" : "Personal Info"}
              icon={<ListAltSharp />}
              to="/profile"
            />
            <DrawerItem
              title={toggleWidth ? "" : "Academics"}
              icon={<DataThresholdingRoundedIcon />}
              to="/academics"
            />

            {/* <NavLinkItemCollapse
                icon={<LocalLibraryRounded htmlColor="" />}
                title={toggleWidth ? "" : "Students"}
                toggleWidth={toggleWidth}
              >
                <DrawerItem
                  title={toggleWidth ? "" : "Home"}
                  icon={<BedroomBabyRoundedIcon />}
                  to="/"
                />
                <DrawerItem
                  title={toggleWidth ? "" : "View Students"}
                  icon={<ListAltSharp />}
                  to="/student/view"
                />
                <DrawerItem
                  title={toggleWidth ? "" : "New Student"}
                  icon={<BookRounded />}
                  to="/student/new"
                />
              </NavLinkItemCollapse> */}

            <DrawerItem
              title={toggleWidth ? "" : "School Fees"}
              icon={<PaymentsRounded />}
              to="/fees"
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
{/* 
            <DrawerItem
              title={toggleWidth ? "" : "Notes Board"}
              icon={<DescriptionRounded />}
              to="/notes"
            /> */}
            <DrawerItem
              title={toggleWidth ? "" : "Settings"}
              icon={<SettingsRoundedIcon />}
              to="/settings"
            />
          </>

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
            onClick={logout}
          >
            {toggleWidth ? "" : " Log out"}
          </Button>
          <IconButton
            sx={{ display: { xs: "inline-flex", md: "none" }, pl: "12px" }}
            onClick={logout}
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
