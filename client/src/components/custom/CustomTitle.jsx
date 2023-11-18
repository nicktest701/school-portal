import { Container, Divider, Stack, Typography } from '@mui/material';
import React from 'react';

import PropTypes from 'prop-types';
function CustomTitle({ title, subtitle, img, icon, color, backColor }) {
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
          my: 2,
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent='center'
          alignItems='center'
          gap={2}
        >
          {img ? (
            <img
              src={img}
              style={{
                width: '40px',
                height: '40px',
              }}
            />
          ) : (
            icon
          )}
          <Stack color={color}>
            <Typography
              color='secondary.main'
              variant='h6'
              textAlign={{ xs: 'center', md: 'left' }}
            >
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
        <Divider />
      </Container>
    </>
  );
}

export default CustomTitle;
