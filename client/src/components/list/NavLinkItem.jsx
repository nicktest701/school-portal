import { useTheme } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinkItem = ({ to, text, color }) => {
  const { palette } = useTheme();

  const myLinkStyles = ({ isActive }) => {
    return {
      textDecoration: 'none',
      borderBottom: isActive ? `solid 2px ${palette.secondary.main}` : null,
      color: color || '#012e54',
      fontWeight: isActive ? 'bold' : '400',
      whiteSpace: 'nowrap',
    };
  };
  return (
    <NavLink to={to} style={myLinkStyles} end>
      {text}
    </NavLink>
  );
};

export default NavLinkItem;
