import { Button, Typography } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

function DashboardSwiperContent({ id, title, content, img }) {
  const navigate = useNavigate();

  const handleViewEvent = () => {
    navigate(`/events/${id}`);
  };

  return (
    <SwiperSlide className="swiper-slide">
      <div className="swiper-content">
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
            variant="contained"
            color="secondary"
            onClick={handleViewEvent}
          >
            Read More...
          </Button>
        )}
      </div>
      <img src={img} alt="swiper-img" />
    </SwiperSlide>
  );
}
export default DashboardSwiperContent;
