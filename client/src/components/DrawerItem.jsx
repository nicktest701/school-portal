import React, { useState } from 'react';
import { Typography, Stack, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';

const DrawerItem = ({ title, icon, to }) => {
  const { palette } = useTheme();
  const [showContext, setShowContext] = useState(false);

  const handleFocus = () => {
    setShowContext(true);
  };

  const handleBlur = () => {
    setShowContext(false);
  };
  return (
    <NavLink
      to={to}
      style={{
        textDecoration: 'none',
        color: `${palette.primary.main}`,
        // border: "1px solid red",
        paddingInline: '8px',
      }}
    >
      <Stack
        direction='row'
        columnGap={3}
        justifyContent={{ xs: 'center', md: 'flex-start' }}
        alignItems='center'
        sx={{
          position: 'relative',
          padding: { xs: 1, sm: 2 },
          cursor: 'pointer',
          boxShadow: { xs: '0 2px 5px  rgba(1, 46, 84,0.2) ', sm: 'none' },
          borderRadius: { xs: '50px', sm: '0' },

          '&:hover': {
            backgroundColor: palette.grey[300],
            borderRadius: '4px',
          },
        }}
        onMouseEnter={handleFocus}
        onMouseLeave={handleBlur}
      >
        {icon}
        <Typography
          variant='caption'
          sx={{
            display: { xs: 'block', sm: 'none', md: 'block' },
            whiteSpace: 'noWrap',
            color: 'primary.main',
          }}
        >
          {title}
        </Typography>
      </Stack>
    </NavLink>
  );
};

export default DrawerItem;
