import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import { Add, AddToPhotos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AddSectionDropdown = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (path) => {
    setAnchorEl(null);
    if (path) {
      navigate(path);
    }
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Tooltip title="Add New">
          <AddToPhotos />
        </Tooltip>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 90,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
      >
        <MenuItem onClick={() => handleClose("/session")}>
          <ListItemIcon>
            <Add fontSize="small" />
          </ListItemIcon>
          Add Session
        </MenuItem>
        <MenuItem onClick={() => handleClose("/level")}>
          <ListItemIcon>
            <Add fontSize="small" />
          </ListItemIcon>
          Add Level
        </MenuItem>
        <MenuItem onClick={() => handleClose("/subject?_t=1")}>
          <ListItemIcon>
            <Add fontSize="small" />
          </ListItemIcon>
          Add Subject
        </MenuItem>
        <MenuItem onClick={() => handleClose("/subject?_t=2")}>
          <ListItemIcon>
            <Add fontSize="small" />
          </ListItemIcon>
          Add Grade
        </MenuItem>
        <MenuItem onClick={() => handleClose("/student/new")}>
          <ListItemIcon>
            <Add fontSize="small" />
          </ListItemIcon>
          Add Student
        </MenuItem>
        <MenuItem onClick={() => handleClose("/teacher")}>
          <ListItemIcon>
            <Add fontSize="small" />
          </ListItemIcon>
          Add Teacher
        </MenuItem>
        <MenuItem onClick={() => handleClose("/users/new")}>
          <ListItemIcon>
            <Add fontSize="small" />
          </ListItemIcon>
          Add User
        </MenuItem>
        <MenuItem onClick={() => handleClose("/messages/new")}>
          <ListItemIcon>
            <Add fontSize="small" />
          </ListItemIcon>
          Add Message
        </MenuItem>
        <MenuItem onClick={() => handleClose("/events/new")}>
          <ListItemIcon>
            <Add fontSize="small" />
          </ListItemIcon>
          Add Event
        </MenuItem>
        <MenuItem onClick={() => handleClose("/announcements")}>
          <ListItemIcon>
            <Add fontSize="small" />
          </ListItemIcon>
          Add Announcement
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AddSectionDropdown;
