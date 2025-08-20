import React, { useState } from "react";
import _ from "lodash";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import PaymentsRounded from "@mui/icons-material/PaymentsRounded";
import DataThresholdingRoundedIcon from "@mui/icons-material/DataThresholdingRounded";
import {
  ExitToAppSharp,
  SchoolRounded,
  Event,
  ArrowBackIos,
  ArrowForwardIos,
  AnnouncementRounded,
  ListAltSharp,
  NoteAdd,
} from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { styled } from "@mui/material/styles";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.secondary,
  fontWeight: 500,
  borderRadius: 12,
  transition: "all 0.3s ease",
  "&.active": {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    color: theme.palette.primary.main,
    fontWeight: 600,
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.main,
    },
  },
  "&:hover": {
    backgroundColor: "rgba(59, 130, 246, 0.05)",
  },
}));

const DrawerItem = ({ title, icon, to, isSmall }) => {
  return (
    <Tooltip title={isSmall ? title : ""} placement="right" arrow>
      <StyledNavLink to={to}>
        <Stack
          direction="row"
          justifyContent={isSmall ? "center" : "flex-start"}
          alignItems="center"
          sx={{
            py: 1.5,
            px: isSmall ? 1 : 2,
            cursor: "pointer",
          }}
          spacing={isSmall ? 0 : 2}
        >
          {icon}
          {!isSmall && (
            <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
              {title}
            </Typography>
          )}
        </Stack>
      </StyledNavLink>
    </Tooltip>
  );
};

const Sidebar = () => {
  const [toggleWidth, setToggleWidth] = useState(false);
  const { logout, school_info } = useAuth();

  const handleClose = () => {
    setToggleWidth(!toggleWidth);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        pt: 2,
        height: "100dvh",
        display: { xs: "none", md: "inline-flex" },
        bgcolor: "#ffffff",
        overflow: "hidden",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.08)",
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          width: toggleWidth ? 70 : 250,
          transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Stack alignItems="center" pb={2} spacing={2} sx={{ px: 2 }}>
          <IconButton
            edge="end"
            onClick={handleClose}
            sx={{
              alignSelf: "flex-end",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              "&:hover": {
                backgroundColor: "rgba(59, 130, 246, 0.2)",
              },
            }}
          >
            {toggleWidth ? (
              <ArrowForwardIos sx={{ fontSize: 14 }} />
            ) : (
              <ArrowBackIos sx={{ fontSize: 14 }} />
            )}
          </IconButton>

          <Link to="/">
            {!_.isEmpty(school_info?.badge) ? (
              <Avatar
                alt="school logo"
                loading="lazy"
                src={school_info?.badge}
                sx={{
                  width: 48,
                  height: 48,
                  border: "2px solid #3B82F6",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)",
                }}
              />
            ) : (
              <SchoolRounded
                sx={{
                  width: 48,
                  height: 48,
                  color: "#3B82F6",
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  borderRadius: "50%",
                  p: 1,
                  border: "2px solid #3B82F6",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)",
                }}
              />
            )}
          </Link>

          {!toggleWidth && (
            <Typography
              textAlign="center"
              variant="subtitle1"
              color="text.primary"
              fontWeight={600}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
            >
              {school_info?.name || "School Portal"}
            </Typography>
          )}
        </Stack>

        <Divider sx={{ my: 1 }} />

        {/* Navigation Items */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            pb: 2,
            px: 1,
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "rgba(0,0,0,0.05)",
              borderRadius: 10,
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(0,0,0,0.1)",
              borderRadius: 10,
            },
          }}
        >
          <Stack spacing={0.5} sx={{ mt: 1 }}>
            <DrawerItem
              title="Dashboard"
              icon={<GridViewRoundedIcon />}
              to="/"
              isSmall={toggleWidth}
            />

            <DrawerItem
              title="Personal Info"
              icon={<ListAltSharp />}
              to="/profile"
              isSmall={toggleWidth}
            />

            <DrawerItem
              title="Academics"
              icon={<DataThresholdingRoundedIcon />}
              to="/academics"
              isSmall={toggleWidth}
            />

            <DrawerItem
              title="School Fees"
              icon={<PaymentsRounded />}
              to="/fees"
              isSmall={toggleWidth}
            />

            <DrawerItem
              title="Events"
              icon={<Event />}
              to="/events"
              isSmall={toggleWidth}
            />

            <DrawerItem
              title="Announcements"
              icon={<AnnouncementRounded />}
              to="/announcements"
              isSmall={toggleWidth}
            />
            <DrawerItem
              title="Notes"
              icon={<NoteAdd />}
              to="/notes"
              isSmall={toggleWidth}
            />
          </Stack>
        </Box>

        {/* Footer Section */}
        <Box sx={{ px: 1, pb: 2 }}>
          <Stack spacing={0.5} sx={{ mb: 2 }}>
            <DrawerItem
              title="Settings"
              icon={<SettingsRoundedIcon />}
              to="/settings"
              isSmall={toggleWidth}
            />

            <DrawerItem
              title="About"
              icon={<InfoRoundedIcon />}
              to="/about"
              isSmall={toggleWidth}
            />
          </Stack>

          <Divider sx={{ my: 1 }} />

          <Tooltip title="Log out" placement="right" arrow>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              startIcon={<ExitToAppSharp />}
              onClick={logout}
              sx={{
                justifyContent: toggleWidth ? "center" : "flex-start",
                pl: toggleWidth ? 1 : 2,
                pr: toggleWidth ? 1 : "auto",
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                "& .MuiButton-startIcon": {
                  marginRight: toggleWidth ? 0 : 1,
                  marginLeft: 0,
                },
                "& span": {
                  display: toggleWidth ? "none" : "inline-block",
                },
                "&:hover": {
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  borderColor: "rgba(239, 68, 68, 0.5)",
                  color: "#EF4444",
                },
              }}
            >
              Log out
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
