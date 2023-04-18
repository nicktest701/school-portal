import { Button } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinkItem = ({ to, text, color }) => {
  const myLinkStyles = ({ isActive }) => {
    return {
      textDecoration: 'none',
      borderBottom: isActive ? 'solid 2px #ffc09f' : null,
      color: '#333',
      fontWeight: isActive ? 'bold' : '400',
    };
  };
  return (
    <NavLink to={to} style={myLinkStyles} end>
      <Button variant='text' color={color}>
        {text}
      </Button>
    </NavLink>
  );
};

export default NavLinkItem;
