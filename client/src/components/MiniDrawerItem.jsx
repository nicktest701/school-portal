
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function MiniDrawerItem({ title, to, handleClose }) {
  const { pathname } = useLocation();
  const myLinkStyles = () => {
    return {
      textDecoration: "none",
      color: pathname === to ? `var(--secondary)` : "var(--primary)",
      backgroundColor: pathname.match(to) ? "rgba(255,255,255,0.3)" : '#fff',
      fontWeight: pathname.match(to) ? "bold" : "400",
      whiteSpace: "nowrap",
      borderRadius: 4,
    };
  };

  return (
    <NavLink
      className="mini-drawer-link"
      style={myLinkStyles}
      to={to}
      onClick={() => handleClose()}
    >
      {title}
    </NavLink>
  );
}

export default MiniDrawerItem;
