import { Close } from "@mui/icons-material";

import {
  Button,
  FormLabel,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  Stack,
} from "@mui/material";
import React from "react";
import { gradeColor } from "../../config/gradeColor";

function GradeItem({
  id,
  highestMark,
  lowestMark,
  grade,
  remarks,
  removeGrade,
}) {
  return (
    <ListItem divider >
      <Stack direction="row" spacing={4} width="80%">
        <FormLabel sx={{ width: "15%" }}>{highestMark}</FormLabel>
        <FormLabel sx={{ width: "15%" }}>-</FormLabel>
        <FormLabel sx={{ width: "15%" }}>{lowestMark}</FormLabel>
        <FormLabel sx={{ width: "15%" }}>{grade}</FormLabel>
        <ListItemSecondaryAction>
          <Button
            size="small"
            sx={{
              px: 2,
              mr: 4,
              bgcolor: gradeColor(highestMark).bg,
              color: gradeColor(highestMark).color,
            }}
          >
            {remarks}
          </Button>
          {removeGrade && (
            <IconButton onClick={() => removeGrade(id)}>
              <Close />
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </Stack>
    </ListItem>
  );
}

export default GradeItem;
