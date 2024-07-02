import { Delete } from "@mui/icons-material";
import {
  Button,
  IconButton,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import React from "react";
import { gradeColor } from "../../config/gradeColor";

const ExamsScoreItem = ({ item, removeSubject, title }) => {
  return (
    <ListItemButton divider>
      <ListItemText sx={{ width: 120 }} secondary={item?.subject} secondaryTypographyProps={{
        color:'primary'
      }} />
      <ListItemText secondary={item?.classScore} />
      <ListItemText secondary={item?.examsScore} />
      <ListItemText secondary={item?.totalScore} />
      <ListItemText secondary={item?.grade} />
  
      <Button
        size="small"
        sx={{
          color: title ? "text.main" : gradeColor(item?.totalScore).color,
          bgcolor: title ? "transparent" : gradeColor(item?.totalScore).bg,
          mx: 2,
        }}
      >
        {item?.remarks}
      </Button>
    <ListItemSecondaryAction sx={{ml:2,pl:2
    }}>
        {!title && (
          <IconButton
            className="ico"
            onClick={() => removeSubject(item.subject)}
           
          >
            <Delete />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItemButton>
  );
};

export default ExamsScoreItem;
