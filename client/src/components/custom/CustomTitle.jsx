import { Box, Stack, Typography, IconButton } from "@mui/material";
import React from "react";
import { ArrowBackRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

function CustomTitle({
  title,
  titleVariant,
  subtitle,
  img,
  icon,
  bgColor,
  color,
  showBack,
  to,
  right,
}) {
  CustomTitle.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    color: PropTypes.string,
    backColor: PropTypes.string,
    img: PropTypes.string,
  };

  const navigate = useNavigate();
  const goBack = () => navigate(to || -1);

  return (
    <>
      <Stack
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
          justifyContent: { xs: "center", md: "flex-start" },
          alignItems: "center",
          py: 3,
          my: 2,
          px: 2,
          bgcolor: bgColor || "#fff",
          borderRadius: '12px',
        }}
        gap={2}
        width="100%"
      >
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
        <Stack
          flex="1"
          // flexDirection={{ xs: "column-reverse" ,md:'column'}}
          color={color}
          pl={1}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            {showBack && (
              <Box
                sx={{
                  backgroundColor: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  my: 1,
                }}
              >
                <IconButton
                  onClick={goBack}
                  sx={{ bgcolor: "rgba(1, 46, 84,0.1)" }}
                >
                  <ArrowBackRounded sx={{ color: color || "#fff" }} />
                </IconButton>
              </Box>
            )}
            <Typography
              flex={1}
              color="secondary.main"
              variant={titleVariant || "h4"}
              textAlign={{ xs: "center", md: "left" }}
            >
              {title}
            </Typography>
          </Stack>
          <Typography textAlign={{ xs: "center", md: "left" }} variant="body2">
            {subtitle}
          </Typography>
        </Stack>
        {right}
      </Stack>

      {/* <Divider /> */}
    </>
  );
}

export default CustomTitle;
