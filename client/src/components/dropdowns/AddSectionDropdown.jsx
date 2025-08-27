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

const menuItems = [
  { label: "Add Session", path: "/session/new" },
  { label: "Add Level", path: "/level" },
  { label: "Add Subject", path: "/subject?_t=1" },
  { label: "Add Grade", path: "/subject?_t=2" },
  { label: "Add Student", path: "/student/new" },
  { label: "Add Teacher", path: "/teacher" },
  { label: "Add Fee", path: "/fee/new" },
  { label: "Add User", path: "/users/new" },
  { label: "Add Message", path: "/messages/new" },
  { label: "Add Event", path: "/events/new" },
  { label: "Add Announcement", path: "/announcements" },
];

const AddSectionDropdown = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (path) => {
    setAnchorEl(null);
    if (path) navigate(path);
  };

  return (
    <>
      <Tooltip title="Add New">
        <IconButton onClick={handleClick}>
          <AddToPhotos />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
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
        {menuItems.map(({ label, path }) => (
          <MenuItem
            key={path}
            onClick={() => handleClose(path)}
            sx={{
              fontSize: 14,
            }}
          >
            <ListItemIcon>
              <Add fontSize="small" />
            </ListItemIcon>
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default AddSectionDropdown;
