import React from "react";
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
import { Close, Notifications, Refresh } from "@mui/icons-material";
import PropTypes from "prop-types";
import CustomNotificationItem from "../custom/CustomNotificationItem";
import { getAllNotifications } from "../../api/notificationAPI";
import { useQuery } from "@tanstack/react-query";
import { getItem, saveItem } from "../../config/helper";

const NotificationDrawer = ({ open, setOpen }) => {
  const notifications = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getAllNotifications(),
    initialData: [],
    select: (notifications) => {
      const removedNotifications = getItem("d_no");
      return notifications?.filter((notification) => {
        return !removedNotifications?.includes(notification?._id);
      });
    },
  });

  const handleClose = () => setOpen(false);

  const handleMarkAllAsRead = () => {
    const update = _.map(notifications?.data, "_id");
    saveItem("r_no", update);
    notifications.refetch();
  };

  const handleRemoveAll = () => {
    const update = _.map(notifications?.data, "_id");
    saveItem("d_no", update);
    notifications.refetch();
  };

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
        bgcolor="#fff"
        spacing={1}
      >
        <Stack
          bgcolor="primary.main"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={1}
        >
          <Notifications htmlColor="#fff" />
          <Typography color="white" sx={{ pl: 1, flexGrow: 1 }}>
            Notifications
          </Typography>

          <Tooltip title="Refresh Notifications">
            <IconButton onClick={notifications?.refetch()}>
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

        {notifications.isLoading ? (
          <Typography>Please Wait...</Typography>
        ) : notifications?.isError ? (
          <Typography>An error has occurred..</Typography>
        ) : (
          <>
            {notifications?.data?.length === 0 ? (
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
                  {notifications?.data?.map((notification) => {
                    return (
                      <CustomNotificationItem
                        key={notification?._id}
                        {...notification}
                        closeDrawer={setOpen}
                      />
                    );
                  })}
                </Stack>
              </AnimatePresence>
            )}
          </>
        )}

        <Typography variant="caption" textAlign="center">
          Frebby Tech Consults &copy; {new Date().getFullYear()}
        </Typography>
      </Stack>
    </Drawer>
  );
};



export default NotificationDrawer;
