import React from "react";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { Divider, IconButton, ListItem, ListItemText } from "@mui/material";

const LevelSubjectItem = ({ subject, removeSubject }) => {
  return (
    <>
      <ListItem
        sx={{ mt: 3 }}
        secondaryAction={
          <IconButton onClick={() => removeSubject(subject?._id)}>
            <DeleteOutline />
          </IconButton>
        }
      >
        <ListItemText
          secondary={subject?.name}
          slotProps={{
            secondary: {
              fontSize: 12,
              fontWeight: "bold",
            },
          }}
        />
      </ListItem>
      <Divider />
    </>
  );
};

export default LevelSubjectItem;
