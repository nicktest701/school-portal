import React from "react";

import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

function BirthdayItem({ profile, fullname, dob }) {
  return (
    <ListItemButton>
      <ListItemAvatar>
        <Avatar src={profile} sx={{ width: 40, height: 40 }} />
      </ListItemAvatar>
      <ListItemText
        primary={fullname}
        secondary={`${
          new Date().getFullYear() - new Date(dob).getUTCFullYear()
        } years old`}
        primaryTypographyProps={{
          fontSize: 13,
          color: "#012e54",
          fontWeight: "bold",
        }}
        secondaryTypographyProps={{
          fontSize: 13,
        }}
      />
    </ListItemButton>
  );
}

export default BirthdayItem;
