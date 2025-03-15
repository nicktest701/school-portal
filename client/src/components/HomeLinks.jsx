import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

export default function HomeLinks() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        display: { xs: "none", md: "inline-flex" },
      }}
    >
      <Link component={RouterLink} to="/" sx={{ fontWeight: "bold" }}>
        Home
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography
            key={to}
            color="text.primary"
            sx={{ textTransform: "capitalize" }}
          >
            {value}
          </Typography>
        ) : (
          <Link
            key={to}
            component={RouterLink}
            to={to}
            style={{ textTransform: "capitalize" }}
          >
            {value}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
