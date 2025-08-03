import React from "react";
import { Avatar, Drawer, IconButton, Stack } from "@mui/material";
import {
  AnnouncementRounded,
  Close,
  DescriptionRounded,
  Event,
  SchoolRounded,
} from "@mui/icons-material";

import PropTypes from "prop-types";
import MiniDrawerItem from "@/components/MiniDrawerItem";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

const HorizontalSidebar = ({ open, setOpen }) => {
  const { logout, school_info } = useAuth();

  const handleClose = () => setOpen(false);

  return (
    <Drawer open={open} onClose={handleClose} sx={{ zIndex: 9999 }}>
      <Stack
        sx={{
          minHeight: "100vh",
          width: "100%",
          minWidth: 300,
          px: 1,
        }}
        bgcolor="#fff"
        spacing={1}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={1}
        >
          <Link to="/" onClick={handleClose}>
            {school_info?.badge ? (
              <Avatar
                alt="school logo"
                loading="lazy"
                srcSet={school_info?.badge}
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "var(--secondary)",
                }}
              >
                {school_info?.name[0]}
              </Avatar>
            ) : (
              <SchoolRounded sx={{ width: 64, height: 64 }} />
            )}
          </Link>
          <IconButton sx={{ alignSelf: "flex-end" }} onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>

        <MiniDrawerItem title="Dashboard" to="/" handleClose={handleClose} />

        <MiniDrawerItem
          title="Personal Info"
          to="/profile"
          handleClose={handleClose}
        />
        <MiniDrawerItem
          title="Academics"
          to="/academics"
          handleClose={handleClose}
        />
        <MiniDrawerItem
          title="Fees History"
          to="/fees"
          handleClose={handleClose}
        />

        <MiniDrawerItem
          title="Messages"
          to="/messages"
          handleClose={handleClose}
        />
        <MiniDrawerItem title="Events" icon={<Event />} to="/events" />
        <MiniDrawerItem
          title="Announcements"
          icon={<AnnouncementRounded />}
          to="/announcements"
          handleClose={handleClose}
        />

        {/* <MiniDrawerItem
          title={"Notes Board"}
          icon={<DescriptionRounded />}
          to="/notes"
          handleClose={handleClose}
        /> */}
        <MiniDrawerItem
          title="Settings"
          to="/settings"
          handleClose={handleClose}
        />

        <MiniDrawerItem title="About" to="/about" handleClose={handleClose} />
        <p
          className="mini-drawer-link"
          style={{ cursor: "pointer" }}
          onClick={logout}
        >
          Log Out
        </p>
        <small style={{ alignSelf: "center" }}>Frebby Tech Consults</small>
      </Stack>
    </Drawer>
  );
};

HorizontalSidebar.propTypes = {
  onLogOut: PropTypes.func,
};

export default HorizontalSidebar;
