import { DeleteRounded, Label } from "@mui/icons-material";
import LocalLibraryRoundedIcon from "@mui/icons-material/LocalLibraryRounded";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import { Divider, IconButton, Stack, Typography, Tooltip } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import moment from "moment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getItem, saveItem } from "../../config/helper";
import { useQueryClient } from "@tanstack/react-query";

function CustomNotificationItem({
  _id,
  type,
  title,
  album,
  description,
  link,
  createdAt,
  closeDrawer,
  index,
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isRead = getItem("r_no");

  const handleItemClick = () => {
    closeDrawer(false);
    if (type === "Event") {
      navigate(`${link}?redirect_to=${pathname}`, {
        state: {
          prevPath: pathname,
        },
      });
    }
    handleMarkAsRead();
  };

  const handleMarkAsRead = () => {
    const readNotifications = getItem("r_no");
    const update = [...readNotifications, _id];
    saveItem("r_no", update);
    queryClient.invalidateQueries(["notifications"]);
  };

  const handleRemove = () => {
    const readNotifications = getItem("d_no");
    const update = [...readNotifications, _id];
    saveItem("d_no", update);
    queryClient.invalidateQueries(["notifications"]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="notification-item"
      style={{
        padding: "0 16px 0 16px",
        cursor: "pointer",
        backgroundColor: isRead?.includes(_id) ? "#fff" : "rgba(1, 46, 84,0.1)",
      }}
    >
      <div onClick={handleItemClick}>
        <Stack direction="row" justifyContent="space-between" py={1}>
          <Typography variant="body2" fontWeight="bold">
            {title}
          </Typography>
          {!isRead?.includes(_id) && <Label htmlColor="green" />}
        </Stack>
        {album && (
          <img
            src={album}
            style={{ width: "100%", height: "120px", objectFit: "cover" }}
            onClick={handleItemClick}
          />
        )}

        <Typography
          variant="body2"
          sx={
            {
              // fontSize: 12,
              // textOverflow: `ellipsis`,
              // whiteSpace: "nowrap",
              // overflow: "hidden",
            }
          }
        >
          {description}
        </Typography>
        {["Event", "Announcement"].includes(type) && (
          <Link
            to={link}
            style={{
              display: "block",
              width: "100%",
              textAlign: "right",
              fontSize: "12px",
            }}
          >
            Read More
          </Link>
        )}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "center",
          paddingTop: "4px",
        }}
      >
        <Stack direction="row" >
          {isRead?.includes(_id) ? (
            <Tooltip title="Mark as read">
              <IconButton>
                <LocalLibraryOutlinedIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Mark as unread">
              <IconButton onClick={handleMarkAsRead}>
                <LocalLibraryRoundedIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Remove">
            <IconButton onClick={handleRemove}>
              <DeleteRounded />
            </IconButton>
          </Tooltip>
        </Stack>
        <Typography
          variant="caption"
          fontStyle="italic"
          color="primary"
          fontWeight="bold"
        >
          {moment(new Date(createdAt)).format("LLL")}
        </Typography>
      </div>
      <Divider />
    </motion.div>
  );
}

export default CustomNotificationItem;
