import { Button, Typography } from '@mui/material';
import { SwiperSlide } from 'swiper/react';

function DashboardSwiperContent({ title, content, img }) {
  return (
    <SwiperSlide className='swiper-slide'>
      <div className='swiper-content'>
        <Typography
          paddingBottom={2}
          variant='h4'
          // sx={{ fontSize: { xs: 36, md: 48, lg: 60 } }}
        >
          {title}
        </Typography>
        <Typography variant='body2' paddingBottom={2}>
          {content}
        </Typography>
        <Button
          variant='contained'
          color='secondary'
          
          sx={{ paddingX: 5 }}
        >
          Learn More
        </Button>
      </div>
      <img src={img} alt='swiper-img' />
    </SwiperSlide>
  );
}
export default DashboardSwiperContent;
