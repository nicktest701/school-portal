import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import { Navigation, Pagination, Autoplay, A11y, Scrollbar } from "swiper";
import { EffectCards } from "swiper";
import { getAllEvents } from "../../api/eventAPI";
import { useQuery } from "@tanstack/react-query";

import DashboardSwiperContent from "./DashboardSwiperContent";

// Styles must use direct files imports
import "swiper/css/bundle";
import "swiper/css"; // core Swiper
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

import student3 from "../../assets/images/students/student3.jpg";
import student4 from "../../assets/images/students/student4.jpg";

function DashboardSwiper() {
  const school_info = JSON.parse(localStorage.getItem("@school_info"));
 
  const events = useQuery({
    queryKey: ["events"],
    queryFn: () => getAllEvents(),
    initialData: [],
  });

 
  return (
    <Swiper
      className="swiper"
      effect="cards"
      modules={[Autoplay, Pagination, Navigation, A11y, Scrollbar, EffectCards]}
      speed={2000}
      spaceBetween={30}
      centeredSlides={true}
      loop
      autoplay={{
        delay: 5000,
        // disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      // navigation={true}
    >
      <SwiperSlide className="swiper-slide">
        <DashboardSwiperContent
          img={student4}
          title={school_info?.name}
          content={school_info?.motto}
        />
      </SwiperSlide>
      {events?.data?.map((event) => {
        return (
          <SwiperSlide className="swiper-slide" key={event?._id}>
            <DashboardSwiperContent
              img={event?.album}
              title={event?.title}
              content={event?.description}
              id={event?._id}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default React.memo(DashboardSwiper);
