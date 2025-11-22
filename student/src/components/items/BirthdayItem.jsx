import React from "react";

import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

function BirthdayItem({ profile, fullname, dob }) {
  return (
    <ListItem disablePadding>
      <ListItemAvatar>
        <Avatar src={profile} sx={{ width: 40, height: 40 }} />
      </ListItemAvatar>
      <ListItemText
        primary={fullname}
        secondary={`${
          new Date().getFullYear() - new Date(dob).getUTCFullYear()
        } years old`}
        primaryTypographyProps={{
          fontSize: 12,
          color: "#012e54",
          fontWeight: "bold",
        }}
        secondaryTypographyProps={{
          fontSize: 12,
        }}
      />
    </ListItem>
  );
}

export default BirthdayItem;
