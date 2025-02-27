import * as React from "react";
import Popover from "@mui/material/Popover";
import { CheckBoxRounded, HelpOutlineRounded } from "@mui/icons-material";
import { List, ListItem, ListItemText } from "@mui/material";

export default function GradePopover({ grades = [] }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <HelpOutlineRounded
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List>
          <ListItem>
            <ListItemText
              primary="Grading System"
              slotProps={{
                primary: {
                  fontSize: "12px",
                },
              }}
            />
          </ListItem>
          {grades?.map((value, unique) => (
            <ListItem
              secondaryAction={value?.isCore ? <CheckBoxRounded /> : null}
              key={unique}
            >
              <ListItemText
                primary={`${value?.lowestMark} - ${value?.highestMark} - ${value?.grade}  - ${value?.remarks}`}
                slotProps={{
                  primary: {
                    fontSize: "12px",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
}
