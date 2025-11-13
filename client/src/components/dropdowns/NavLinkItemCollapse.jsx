import React from "react";
import {
  Collapse,
  List,
  useTheme,
  Stack,
  Typography,
  Tooltip,
  useMediaQuery,
} from "@mui/material";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";

function NavLinkItemCollapse({ to, title, children, icon, toggleWidth }) {
  const { palette, breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down("md"));
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(false);

  const handleCollapse = () => {
    setOpen(!open);
  };

  const myLinkStyles = ({ isActive }) => {
    return {
      textDecoration: "none",
      color: pathname.match(to) ? `${palette.secondary.main}` : "#fff",
      backgroundColor: pathname.match(to) ? "rgba(255,255,255,0.3)" : null,
      fontWeight: pathname.match(to) ? "bold" : "400",
      whiteSpace: "nowrap",
      borderRadius: 4,
    };
  };

  return (
    <List>
      <Tooltip title={title} placement="right">
        <NavLink style={myLinkStyles} end>
          <Stack
            onClick={handleCollapse}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{
              py: { xs: 1, sm: "12px" },
              px: { xs: 1, sm: "16px" },
              cursor: "pointer",
              // width: { xs: "inherit", md: 150 },
              backgroundColor: pathname.match(to)
                ? "rgba(255,255,255,0.3)"
                : null,
              borderRadius: 4,

              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "4px",
                width: "100%",
              },
            }}
            spacing={1}
          >
            <Tooltip
              title={to?.split("/")[1]}
              placement="right"
              slotProps={{
                tooltip: {
                  sx: {
                    textTransform: "capitalize",
                  },
                },
              }}
            >
              {icon}
            </Tooltip>
            <Typography
              variant="caption"
              sx={{
                display: { xs: "none", sm: "none", md: "block" },
                whiteSpace: "noWrap",
                color: pathname.match(to) ? "var(--secondary)" : "white",

                transition: "all 300ms ease-in-out",
                width: "100%",
              }}
            >
              {title}
            </Typography>
            {toggleWidth || matches ? null : (
              <> {open ? <ExpandLess /> : <ExpandMore />}</>
            )}
          </Stack>
        </NavLink>
      </Tooltip>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          disablePadding
          sx={{ paddingLeft: toggleWidth || matches ? 0 : 3 }}
        >
          {children}
        </List>
      </Collapse>
    </List>
  );
}

export default NavLinkItemCollapse;
