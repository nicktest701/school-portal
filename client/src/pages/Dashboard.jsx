import React, { use, useState } from "react";
import Calendar from "react-calendar";
import { Box, Stack, Typography, Avatar, Divider } from "@mui/material";
import DashboardSwiper from "@/components/swiper/DashboardSwiper";
import Birthday from "@/components/items/Birthday";
import "react-calendar/dist/Calendar.css";
import "@/theme/Calendar.css";
import { UserContext } from "@/context/providers/UserProvider";
import DashboardCardsContainer from "@/components/cards/DashboardCardsContainer";
import CustomCard from "@/components/cards/CustomCard";
import { EMPTY_IMAGES } from "@/config/images";
import CustomEvent from "@/components/calendar/CustomEvent";
import CustomTitle from "@/components/custom/CustomTitle";
import Announcement from "@/components/calendar/Announcement";
import Event from "@/components/calendar/Event";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { user, session } = useAuth();

  const [value, onChange] = useState(new Date());

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          p: 2,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            px: { xs: 1, md: 4 },
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              pt: 2,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                textAlign="right"
                textTransform="capitalize"
              >
                Welcome,{user?.fullname?.split(" ")[0]}!
              </Typography>
              <Typography>Your current dashboard for today!</Typography>
            </Box>
            <Avatar
              alt="wave_hand"
              src={EMPTY_IMAGES.hand}
              style={{ width: "48px", height: "48px" }}
              variant="square"
            />
          </Box>

          <Divider />
          <Typography variant="h1" sx={{ color: "primary.main" }}>
            {session?.name}
          </Typography>
          <Typography variant="h6" sx={{ color: "primary.main" }}>
            {session?.academicYear} , {session?.term}
          </Typography>

          <CustomTitle
            title="Dashboard"
            subtitle=" Access key metrics, recent updates, and important notifications to stay informed about school activities at a glance."
            color="text.main"
            bgColor="transparent"
            backColor="#012e54"
            titleVariant="h2"
          />

          <DashboardCardsContainer />

          {/* <Divider /> */}
          <Box sx={{ pt: 4 }}>
            <div style={{ marginBottom: "24px" }}>
              <Typography variant="h4" paragraph>
                Recent News & Events
              </Typography>
              <DashboardSwiper />
            </div>
            <div style={{ paddingBlock: "24px" }}>
              <Typography variant="h4" paragraph>
                Events,Activities & Holidays
              </Typography>
              <CustomEvent />
            </div>
          </Box>
        </Box>

        <Box
          sx={{
            width: { xs: 0, sm: 270 },
            // minWidth: { xs: 0, md: 250 },
            display: { xs: "none", md: "block" },
            transition: "all 0.4s ease-in-out",
            position: "sticky",
            top: 0,
            // height:'200svh',
            minHeight: "100svh",
          }}
        >
          <Stack spacing={3} height="100%">
            <CustomCard title="Calendar">
              <Calendar onChange={onChange} value={value} />
            </CustomCard>
            <CustomCard title="Events">
              <Event />
            </CustomCard>
            <CustomCard title="Birthday">
              <Birthday />
            </CustomCard>
            <CustomCard title="Announcements">
              <Announcement />
            </CustomCard>
          </Stack>
        </Box>
      </Box>

      {/* <CustomParticle /> */}
    </>
  );
};

export default React.memo(Dashboard);
