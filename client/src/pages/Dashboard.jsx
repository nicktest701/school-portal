import React, { useContext, useState } from "react";
import Calendar from "react-calendar";
import { Box, Stack, Typography, Avatar, Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { generateNewCurrentLevelDetailsFromLevels } from "../api/levelAPI";
import DashboardSwiper from "../components/swiper/DashboardSwiper";
import CustomParticle from "../components/animations/CustomParticle";
import Birthday from "../components/items/Birthday";
import "react-calendar/dist/Calendar.css";
import "../theme/Calendar.css";
import { UserContext } from "../context/providers/UserProvider";
import DashboardCardsContainer from "../components/cards/DashboardCardsContainer";
import CustomCard from "../components/cards/CustomCard";
import { EMPTY_IMAGES } from "../config/images";
import CustomEvent from "../components/calendar/CustomEvent";
import CustomTitle from "../components/custom/CustomTitle";

const Dashboard = () => {
  const {
    user,
    userState: { session },
  } = useContext(UserContext);

  const [value, onChange] = useState(new Date());

  //check if current level details exists
  useQuery({
    queryKey: [
      "generate-current-level-details",
      session?.sessionId,
      session?.termId,
    ],
    queryFn: () =>
      generateNewCurrentLevelDetailsFromLevels({
        sessionId: session?.sessionId,
        termId: session?.termId,
      }),
    enabled: !!session?.sessionId && !!session?.termId,
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          overscrollBehaviorInline: "contain",
          gap: 4,
          px: 2,
        }}
      >
        <Container>
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
              <Typography variant="h4" textAlign="right">
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

          <CustomTitle
            title="Dashboard"
            subtitle=" Access key metrics, recent updates, and important notifications to stay informed about school activities at a glance."
            color="text.main"
            bgColor="transparent"
            backColor="#012e54"
            titleVariant="h2"
          />

          {/* <Typography variant="h2" paragraph>
            Dashboard
          </Typography> */}
          <DashboardCardsContainer />

          <Typography
            variant="h6"
            sx={{ textAlign: "right", color: "primary.main" }}
          >
            {session?.academicYear}-{session?.term}
          </Typography>

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
                Event Calendar
              </Typography>
              <CustomEvent />
            </div>
          </Box>
        </Container>

        <Box
          sx={{
            width: { xs: 0, sm: 250 },
            display: { xs: "none", md: "block" },
            transition: "all 0.4s ease-in-out",
            position: "sticky",
            top: 0,
            height: "100svh",
          }}
        >
          <Stack spacing={3} height="100%">
            <CustomCard title="Calendar">
              <Calendar onChange={onChange} value={value} />
            </CustomCard>
            <CustomCard title="Birthday">
              <Birthday />
            </CustomCard>
          </Stack>
        </Box>
      </Box>

      <CustomParticle />
    </>
  );
};

Dashboard.propTypes = {};

export default React.memo(Dashboard);
