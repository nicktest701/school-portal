import { ListItemText } from "@mui/material";
import React from "react";

function StudentViewItem({ primary, secondary }) {
  return (
    <ListItemText
      primary={primary}
      secondary={secondary}
      slotProps={{
        primary: { fontSize: 12, color: "primary", fontWeight: "700" },
        secondary: { fontSize: 10 },
      }}
    />
  );
}

export default StudentViewItem;
