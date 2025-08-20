import React from "react";

import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

function BirthdayItem({ profile, fullname, dob }) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={profile} sx={{ width: 40, height: 40 }} />
      </ListItemAvatar>
      <ListItemText
        primary={fullname}
        secondary={`${
          new Date().getFullYear() - new Date(dob).getUTCFullYear()
        } years old`}
        slotProps={{
          primary: {
            fontSize: 12,
            color: "#012e54",
            fontWeight: "bold",
          },
          secondary: {
            fontSize: 12,
          },
        }}
      />
    </ListItem>
  );
}

export default BirthdayItem;
