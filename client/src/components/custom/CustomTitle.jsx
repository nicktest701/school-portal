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
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingY: 4,
        }}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          justifyContent='center'
          alignItems='center'
          gap={2}
        >
          <Stack color={color}>
            <Typography variant='h5' textAlign='right'>
              {title}
            </Typography>
            <Typography textAlign='right'>{subtitle}</Typography>
          </Stack>
          <img
            src={img}
            style={{
              width: '60px',
              height: '60px',
            }}
          />
        </Stack>
      </Container>
    </>
  );
}

export default CustomTitle;
