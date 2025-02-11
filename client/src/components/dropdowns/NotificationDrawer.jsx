import React, { useContext } from "react";
import {
  Button,
  Drawer,
  IconButton,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";
import _ from "lodash";
import { AnimatePresence } from "framer-motion";
import {
  Close,
  Notifications,
  NotificationsRounded,
  Refresh,
} from "@mui/icons-material";
import CustomNotificationItem from "../custom/CustomNotificationItem";
import { saveItem } from "@/config/helper";
import { UserContext } from "@/context/providers/UserProvider";

const NotificationDrawer = ({ open, setOpen }) => {
  const { notifications } = useContext(UserContext);

  const handleClose = () => setOpen(false);

  const handleMarkAllAsRead = () => {
    const update = _.map(notifications, "_id");

    saveItem("r_no", update);
  };

  const handleRemoveAll = () => {
    const update = _.map(notifications, "_id");
    saveItem("d_no", update);
  };

  // console.log(notifications)

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      sx={{ zIndex: 9999 }}
      anchor="right"
    >
      <Stack
        sx={{
          minHeight: "100vh",
          width: { xs: 280, md: 500 },
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          pb: 1,
        }}
        // bgcolor="secondary.main"
        spacing={1}
      >
        <Stack
          // bgcolor="secondary.main"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={1}
        >
          <Notifications htmlColor="#fff" />
          <Typography
            sx={{  flexGrow: 1, display: "flex", alignItems: "center" }}
          >
            <NotificationsRounded />
            <span> Notifications</span>
          </Typography>

          <Tooltip title="Refresh Notifications">
            <IconButton>
              <Refresh />
            </IconButton>
          </Tooltip>
          <Tooltip title="Close">
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Tooltip>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          pr={2}
          spacing={2}
        >
          <Tooltip title="">
            <Button size="small" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
          </Tooltip>

          <Tooltip title="">
            <Button size="small" onClick={handleRemoveAll}>
              Clear All
            </Button>
          </Tooltip>
        </Stack>

        {notifications?.length === 0 ? (
          <Stack
            spacing={2}
            height="80svh"
            justifyContent="center"
            alignItems="center"
            overflow="auto"
          >
            <Typography>No new Notifications</Typography>
          </Stack>
        ) : (
          <AnimatePresence>
            <Stack spacing={1} height="90svh" overflow="auto">
              {notifications?.map((notification, index) => {
                return (
                  <CustomNotificationItem
                    key={notification?._id}
                    {...notification}
                    closeDrawer={setOpen}
                    index={index}
                  />
                );
              })}
            </Stack>
          </AnimatePresence>
        )}

        <Typography variant="caption" textAlign="center">
          Frebby Tech Consults &copy; {new Date().getFullYear()}
        </Typography>
      </Stack>
    </Drawer>
  );
};

export default NotificationDrawer;
