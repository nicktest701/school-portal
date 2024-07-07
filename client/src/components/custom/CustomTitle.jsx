import { Box, Stack, Typography } from "@mui/material";
import React from "react";

import PropTypes from "prop-types";

function CustomTitle({
  title,
  titleVariant,
  subtitle,
  img,
  icon,
  bgColor,
  color,
}) {
  CustomTitle.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    color: PropTypes.string,
    backColor: PropTypes.string,
    img: PropTypes.string,
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
          justifyContent: { xs: "center", md: "flex-start" },
          alignItems: "center",
          py: 3,
          my: 2,
          px: 2,
          bgcolor: bgColor || "#fff",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          {/* <Back /> */}
          {img ? (
            <img
              src={img}
              style={{
                width: "40px",
                height: "40px",
              }}
            />
          ) : (
            icon
          )}
          <Stack color={color} pl={1}>
            <Typography
              color="secondary.main"
              variant={titleVariant || "h4"}
              textAlign={{ xs: "center", md: "left" }}
            >
              {title}
            </Typography>
            <Typography
              textAlign={{ xs: "center", md: "left" }}
              variant="body2"
            >
              {subtitle}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      {/* <Divider /> */}
    </>
  );
}

export default CustomTitle;
