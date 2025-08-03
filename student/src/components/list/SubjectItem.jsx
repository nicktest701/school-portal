import DeleteOutline from "@mui/icons-material/DeleteOutline";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useState } from "react";


const SubjectItem = ({
  name,
  code,
  isCore,
  removeSubject,
  appendCode,
  handleIsCore,
}) => {
  const [value, setValue] = useState(code );

  return (
    <>
      <ListItem>
        <TextField
          placeholder="code "
          size="small"
          sx={{ width: 100, mr: 2 }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() =>
            appendCode({ name, isCore, code: value  })
          }
        />
        <ListItemText
          secondary={name}
          secondaryTypographyProps={{ fontSize: 12, fontStyle: "italic" }}
        />
        <ListItemSecondaryAction
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <FormControlLabel
            label="Core"
            control={
              <Checkbox
                title="Core"
                checked={isCore}
                value={isCore}
                onChange={() => handleIsCore(name, !isCore)}
              />
            }
          />

          <IconButton onClick={() => removeSubject(name)}>
            <DeleteOutline />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

export default SubjectItem;
