import { Container, Divider, Stack, Typography } from '@mui/material';
import React from 'react';

import PropTypes from 'prop-types';
function CustomTitle({ title, subtitle, img, color, backColor }) {
  CustomTitle.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    color: PropTypes.string,
    backColor: PropTypes.string,
    img: PropTypes.string,
  };

  return (
    <>
      {/* <Back color={backColor} /> */}
      <Container
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          justifyContent: { xs: 'center', md: 'flex-start' },
          alignItems: 'center',
          py: 3,
        }}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          justifyContent='center'
          alignItems='center'
          gap={2}
        >
          <img
            src={img}
            style={{
              width: '40px',
              height: '40px',
            }}
          />
          <Stack color={color}>
            <Typography variant='h6' textAlign={{ xs: 'center', md: 'left' }}>
              {title}
            </Typography>
            <Typography
              textAlign={{ xs: 'center', md: 'left' }}
              variant='body2'
            >
              {subtitle}
            </Typography>
          </Stack>
        </Stack>
        <Divider/>
      </Container>
    </>
  );
}

export default CustomTitle;
