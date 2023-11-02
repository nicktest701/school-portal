import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinkItem = ({ to, text, color }) => {
  const myLinkStyles = ({ isActive }) => {
    return {
      textDecoration: 'none',
      borderBottom: isActive ? 'solid 2px #ffc09f' : null,
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
