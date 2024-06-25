import React, { useContext, useState } from "react";
import { UserContext } from "../context/providers/UserProvider";
import _ from "lodash";
import { Outlet, Navigate, Link } from "react-router-dom";
import GlobalAlert from "../components/alerts/GlobalAlert";
import QuickMessage from "../components/modals/QuickMessage";
import Footer from "./layouts/Footer";
import {
  Alert,
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { SchoolSessionContext } from "../context/providers/SchoolSessionProvider";
import Sidebar from "./layouts/Sidebar";
import { ArrowDropDown, Menu, NotificationsSharp } from "@mui/icons-material";
import HorizontalSidebar from "./layouts/HorizontalSidebar";
import ViewUserProfile from "../components/dialog/ViewUserProfile";
import Content from "./layouts/Content";
import NotificationDropdown from "../components/dropdowns/NotificationDropdown";
import CustomDropdown from "../components/dropdowns/CustomDropdown";

const Shell = () => {
  const [openMiniBar, setOpenMiniBar] = useState(false);
  const [openUserProfile, setOpenUserProfile] = useState(false);
  const { user, logOutUser, session } = useContext(UserContext);
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);

  const {
    schoolSessionState: { generalAlert },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const closeGeneralAlert = () => {
    schoolSessionDispatch({
      type: "openGeneralAlert",
      payload: {
        message: "",
        severity: "",
      },
    });
  };

  const handleOpenBar = () => setOpenMiniBar(true);

  //OPEN user profile
  const handleOpenUserProfile = () => setOpenUserProfile(true);

  const toggleNotification = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  if (_.isEmpty(session?.sessionId) || _.isEmpty(user?.id)) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <GlobalAlert />
      {generalAlert?.message && (
        <Alert
          severity={generalAlert?.severity}
          onClose={closeGeneralAlert}
          sx={{
            zIndex: 999999,
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          {generalAlert?.message}
        </Alert>
      )}
      <QuickMessage />

      <HorizontalSidebar
        open={openMiniBar}
        setOpen={setOpenMiniBar}
        onLogOut={logOutUser}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "start",
        }}
      >
        <Sidebar onLogOut={logOutUser} />

        <div style={{ overflowX: "clip", flex: 1, width: "100%" }}>
          <AppBar
            position="sticky"
            sx={{
              bgcolor: "white",
              width: "100%",
              p: 1,
              borderBottom: "2px solid var(--secondary)",
            }}
            elevation={1}
          >
            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: { xs: "flex-start", sm: "flex-end" },
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: { xs: "inline-flex", sm: "none" },
                  justifySelf: "flex-start",
                  flexGrow: 1,
                  px: 1,
                }}
              >
                <IconButton onClick={handleOpenBar}>
                  <Menu />
                </IconButton>
              </Box>

              <div style={{ position: "relative" }}>
                <IconButton onClick={toggleNotification}>
                  <Badge badgeContent={2} color="error">
                    <NotificationsSharp />
                  </Badge>
                  <NotificationDropdown
                    display={showNotificationDropdown}
                    setClose={setShowNotificationDropdown}
                  />
                </IconButton>
              </div>
              {/* <Button
                size="small"
                startIcon={
                  <Avatar
                    src={`${import.meta.env.VITE_BASE_URL}/images/users/${
                      user?.profile
                    }`}
                    sx={{ width: 30, height: 30, cursor: "pointer" }}
                  />
                }
                endIcon={<ArrowDropDown />}
                onClick={handleOpenUserProfile}
              >
                {_.startCase(user?.fullname)}
              </Button> */}
              <CustomDropdown
                titleContent={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar
                      src={`${import.meta.env.VITE_BASE_URL}/images/users/${
                        user?.profile
                      }`}
                      sx={{ width: 30, height: 30, cursor: "pointer" }}
                    />
                    <Typography> {_.startCase(user?.fullname)}</Typography>
                    <ArrowDropDown />
                  </Stack>
                }
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                <Link to="/profile">Log Out</Link>
                </li>
              </CustomDropdown>
            </Box>
          </AppBar>

          <Content>
            <Outlet />
          </Content>
          <Footer bgcolor="transparent" color="#333" />
        </div>
      </Box>

      <ViewUserProfile open={openUserProfile} setOpen={setOpenUserProfile} />
    </>
  );
};

export default Shell;
