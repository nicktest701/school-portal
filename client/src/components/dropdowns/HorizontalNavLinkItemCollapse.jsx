import React from "react";
import {
  Collapse,
  List,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

function HorizontalNavLinkItemCollapse({ title, children }) {

  const [open, setOpen] = React.useState(false);

  const handleCollapse = () => {
    setOpen(!open);
  };

  return (
    <>
      <Tooltip title={title} placement="right">
        <NavLink className="mini-drawer-link" end>
          <Stack
            onClick={handleCollapse}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
          >
            <Typography
              variant="body"
              sx={{
                whiteSpace: "noWrap",
                color: "secondary",
                transition: "all 300ms ease-in-out",
                width: "100%",
              }}
            >
              {title}
            </Typography>

            {open ? <ExpandLess /> : <ExpandMore />}
          </Stack>
        </NavLink>
      </Tooltip>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          disablePadding
          sx={{ display: "flex", flexDirection: "column", paddingLeft: 3 }}
        >
          {children}
        </List>
      </Collapse>
    </>
  );
}

export default HorizontalNavLinkItemCollapse;
