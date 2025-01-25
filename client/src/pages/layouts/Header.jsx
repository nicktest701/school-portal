import React, { useContext, useState } from "react";
import { Alert, AppBar, Badge, Box, IconButton } from "@mui/material";
import { Menu, NotificationsSharp } from "@mui/icons-material";
import GlobalAlert from "@/components/alerts/GlobalAlert";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import QuickMessage from "@/components/modals/QuickMessage";
import HorizontalSidebar from "./HorizontalSidebar";
import NotificationDrawer from "@/components/dropdowns/NotificationDrawer";
import { UserContext } from "@/context/providers/UserProvider";
import AccountDropdown from "@/components/dropdowns/AccountDropdown";

function Header() {
  const { notifications } = useContext(UserContext);
  const [openMiniBar, setOpenMiniBar] = useState(false);
  const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false);
  const {
    schoolSessionState: { generalAlert },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const handleOpenBar = () => setOpenMiniBar(true);
  const handleOpenNotificationDrawer = () => setOpenNotificationDrawer(true);

  const closeGeneralAlert = () => {
    schoolSessionDispatch({
      type: "openGeneralAlert",
      payload: {
        message: "",
        severity: "",
      },
    });
  };

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

      <HorizontalSidebar open={openMiniBar} setOpen={setOpenMiniBar} />

      <NotificationDrawer
        open={openNotificationDrawer}
        setOpen={setOpenNotificationDrawer}
      />
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
            <IconButton onClick={handleOpenNotificationDrawer}>
              <Badge badgeContent={notifications?.length} color="error">
                <NotificationsSharp />
              </Badge>
            </IconButton>
          </div>

          <AccountDropdown />
        </Box>
      </AppBar>
    </>
  );
}

export default Header;
