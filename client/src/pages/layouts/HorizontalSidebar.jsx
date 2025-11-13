import React from "react";
import { Avatar, Divider, Drawer, IconButton, Stack } from "@mui/material";
import {
  AddCircleRounded,
  AnnouncementRounded,
  ArticleRounded,
  BarChartRounded,
  BookRounded,
  Close,
  DataThresholdingRounded,
  DescriptionRounded,
  Event,
  Groups3,
  HistoryRounded,
  HouseRounded,
  ImportExportRounded,
  InfoRounded,
  List,
  ListAltSharp,
  LocalLibraryRounded,
  NumbersSharp,
  PaymentsRounded,

  SchoolRounded,
  SettingsRounded,
  SmsRounded,
} from "@mui/icons-material";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import PropTypes from "prop-types";
import MiniDrawerItem from "@/components/MiniDrawerItem";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const HorizontalSidebar = ({ open, setOpen }) => {
  const { user, logOutUser, school_info } = useAuth();

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
                  bgcolor: "#fff",
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

        {user?.role === "administrator" && (
          <>
            <MiniDrawerItem
              title="Dashboard"
              to="/"
              handleClose={handleClose}
              icon={<GridViewRoundedIcon />}
            />
            <Divider />
            <MiniDrawerItem
              title="Sessions"
              to="/session"
              icon={<ArticleRounded />}
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title="Departments & Houses"
              to="/departments-houses"
              icon={<HouseRounded />}
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title="Levels"
              to="/level"
              icon={<ListAltSharp />}
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title="Subjects & Grades"
              to="/subject"
              icon={<NumbersSharp />}
              handleClose={handleClose}
            />
            <Divider />
            <MiniDrawerItem
              title="Students"
              to="/student"
              icon={<LocalLibraryRounded />}
              handleClose={handleClose}
              data={[
                {
                  title: "Dashboard",
                  to: "/student",
                  icon: <BarChartRounded />,
                },
                {
                  title: "All Students",
                  to: "/student/view",
                  icon: <ListAltSharp />,
                },
                {
                  title: "New Student",
                  to: "/student/new",
                  icon: <AddCircleRounded />,
                },
              ]}
            />
            <MiniDrawerItem
              title="Teachers"
              to="/teacher"
              icon={<Groups3 />}
              handleClose={handleClose}
              data={[
                {
                  title: "All Teachers",
                  to: "/teacher",
                  icon: <List />,
                },
                {
                  title: "Assigned Levels",
                  to: "/teacher/levels",
                  icon: <ListAltSharp />,
                },
                {
                  title: "Assigned Courses",
                  to: "/teacher/courses",
                  icon: <BookRounded />,
                },
              ]}
            />
            <MiniDrawerItem
              title="School Fees"
              to="/fee"
              icon={<PaymentsRounded />}
              handleClose={handleClose}
              data={[
                {
                  title: "Dashboard",
                  to: "/fee",
                  icon: <BarChartRounded />,
                },
                {
                  title: "New Fees",
                  to: "/fee/new",
                  icon: <AddCircleRounded />,
                },
                {
                  title: "Make Payments",
                  to: "/fee/payment",
                  icon: <BookRounded />,
                },
                {
                  title: "Fees History",
                  to: "/fee/history",
                  icon: <HistoryRounded />,
                },
              ]}
            />
            <MiniDrawerItem
              title="Examination Portal"
              to="/examination"
              icon={<DataThresholdingRounded />}
              handleClose={handleClose}
            />
            <Divider />
            <MiniDrawerItem
              title="Data Uploads"
              to="/uploads"
              icon={<ImportExportRounded />}
              handleClose={handleClose}
            />

            <MiniDrawerItem
              title="Messages"
              to="/messages"
              icon={<SmsRounded />}
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title="Events"
              icon={<Event />}
              to="/events"
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title="Announcements"
              icon={<AnnouncementRounded />}
              to="/announcements"
              handleClose={handleClose}
            />
            <Divider />

            <MiniDrawerItem
              title="Profile"
              icon={<PeopleAltRoundedIcon />}
              to="/profile"
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title="Users"
              to="/users"
              icon={<PeopleAltRoundedIcon />}
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title="Settings"
              to="/settings"
              icon={<SettingsRounded />}
              handleClose={handleClose}
            />
          </>
        )}

        {user?.role === "teacher" && (
          <>
            <MiniDrawerItem
              title={"Dashboard"}
              icon={<GridViewRoundedIcon />}
              to="/"
              handleClose={handleClose}
            />

            <MiniDrawerItem
              title={"Manage Students"}
              to="/course"
              icon={<LocalLibraryRounded />}
              handleClose={handleClose}
              data={[
                {
                  title: "Overview",
                  to: "/course",
                  icon: <BarChartRounded />,
                },
                {
                  title: "Levels",
                  to: "/course/level",
                  icon: <ListAltSharp />,
                },
                {
                  title: "Courses",
                  to: "/course/assign",
                  icon: <BookRounded />,
                },
              ]}
            />

            <MiniDrawerItem
              title={"Events"}
              icon={<Event />}
              to="/events"
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title={"Announcements"}
              icon={<AnnouncementRounded />}
              to="/announcements"
              handleClose={handleClose}
            />
            <MiniDrawerItem
              title={"Profile"}
              icon={<PeopleAltRoundedIcon />}
              to="/profile"
              handleClose={handleClose}
            />
          </>
        )}

        <MiniDrawerItem
          title={"Notes Board"}
          icon={<DescriptionRounded />}
          to="/notes"
          handleClose={handleClose}
        />
        <Divider />
        <MiniDrawerItem
          title="About"
          to="/about"
          icon={<InfoRounded />}
          handleClose={handleClose}
        />
        <p
          className="mini-drawer-link"
          style={{ cursor: "pointer" }}
          onClick={logOutUser}
        >
          Log Out
        </p>
        <small style={{ alignSelf: "center" }}>Frebby Tech Consults</small>
      </Stack>
    </Drawer>
  );
};

HorizontalSidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  onLogOut: PropTypes.func,
};

export default HorizontalSidebar;
