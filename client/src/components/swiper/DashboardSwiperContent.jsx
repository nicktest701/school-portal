import React from "react";
import { Button, Typography } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";

function DashboardSwiperContent({ id, title, img }) {
  const navigate = useNavigate();

  const handleViewEvent = () => {
    navigate(`/events/${id}`);
  };

  return (
    <SwiperSlide className="swiper-slide">
      <div
        className="swiper-content"
        style={{
          pointerEvents: "none",
        }}
      >
        <Typography
          paddingBottom={2}
          variant="h4"
          // sx={{ fontSize: { xs: 36, md: 48, lg: 60 } }}
        >
          {title}
        </Typography>
        {/* <Typography variant="body2" paddingBottom={2} width="10ch">
          {content}
        </Typography> */}
        {id && (
          <Button
            variant="text"
            color="#fff"
            onClick={handleViewEvent}
            endIcon={<ArrowForward />}
            sx={{ textDecoration: "underline" }}
          >
            Read More
          </Button>
        )}
      </div>
      <img
        src={img || "/images/event.jpg"}
        alt="swiper-img"
        onClick={id ? handleViewEvent : null}
        style={{
          cursor: "pointer",
        }}
      />
    </SwiperSlide>
  );
}
export default DashboardSwiperContent;
