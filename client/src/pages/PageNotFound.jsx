import { Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Stack
      rowGap={5}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        bgcolor: "primary.main",
      }}
    >
      <Typography variant="h1" color="#fff">
        Page Not Found
      </Typography>
      <Link
        to="/"
        style={{
          color: "#fff",
        }}
      >
        Go Home
      </Link>
    </Stack>
  );
};

export default PageNotFound;
