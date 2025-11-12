import { ExpandMore } from "@mui/icons-material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";

function MiniDrawerItem({ title, to, handleClose, data, icon }) {
  const { pathname } = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const hasChildren = data && data.length > 0;

  const myLinkStyles = () => {
    const isActive =
      pathname === to ||
      (hasChildren && data.some((child) => pathname === child.to));
    return {
      textDecoration: "none",
      color: isActive ? `var(--secondary)` : "var(--primary)",
      backgroundColor: isActive ? "rgba(255,255,255,0.3)" : "#fff",
      fontWeight: isActive ? "bold" : "400",
      whiteSpace: "nowrap",
      borderRadius: 4,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px 12px",
      fontSize: "14px",
      cursor: "pointer",
    };
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleItemClick = () => {
    if (hasChildren) {
      toggleDropdown();
    } else {
      handleClose();
    }
  };

  const handleChildClick = () => {
    handleClose();
    setIsDropdownOpen(false);
  };

  return (
    <div className="mini-drawer-item">
      <div
        className="mini-drawer-link"
        style={myLinkStyles()}
        onClick={handleItemClick}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {icon && <span className="mini-drawer-icon">{icon}</span>}
          {hasChildren ? (
            title
          ) : (
            <NavLink
              to={to}
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
              }}
              onClick={handleClose}
            >
              {/* {icon && <span className="mini-drawer-icon">{icon}</span>} */}
              {title}
            </NavLink>
          )}
        </div>
        {hasChildren && (
          <span
            className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}
            style={{
              transition: "transform 0.2s",
              transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <ExpandMore />
          </span>
        )}
      </div>

      {hasChildren && isDropdownOpen && (
        <div className="dropdown-children">
          {data.map((child, index) => (
            <NavLink
              key={index}
              to={child.to}
              style={{
                textDecoration: "none",
                color:
                  pathname === child.to ? `var(--secondary)` : "var(--primary)",
                backgroundColor:
                  pathname === child.to
                    ? "rgba(255,255,255,0.3)"
                    : "transparent",
                fontWeight: pathname === child.to ? "bold" : "400",
                padding: "6px 12px 6px 24px",
                display: "block",
                marginLeft: "12px",
                whiteSpace: "nowrap",
                borderRadius: 2,
                fontSize: "14px",
              }}
              onClick={handleChildClick}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "14px",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {child.icon && <span className="child-icon">{child.icon}</span>}
                {child.title}
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
MiniDrawerItem.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  to: PropTypes.string,
  handleClose: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      icon: PropTypes.node,
    })
  ),
  icon: PropTypes.node,
};

export default MiniDrawerItem;
