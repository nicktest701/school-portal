import { Container, Stack, Typography } from '@mui/material';
import React from 'react';
import Back from '../Back';
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
      <Back color={backColor} />
      <Container
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          justifyContent: { xs: 'center', md: 'flex-end' },
          alignItems: 'center',
          paddingY: 1,
        }}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          justifyContent='center'
          alignItems='center'
          gap={2}
        >
          <Stack color={color}>
            <Typography
              variant='h6'
              textAlign={{ xs: 'center', md: 'right' }}
              paragraph
            >
              {title}
            </Typography>
            <Typography
              textAlign={{ xs: 'center', md: 'right' }}
              variant='body2'
            >
              {subtitle}
            </Typography>
          </Stack>
          <img
            src={img}
            style={{
              width: '50px',
              height: '50px',
            }}
          />
        </Stack>
      </Container>
    </>
  );
}

export default CustomTitle;
