import {
  Box,
  Stack,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { ArrowBackRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const goBack = () => navigate(to || -1);

  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.up("md"));

  return (
    <>
      <Stack
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "center", md: "flex-start" },
          alignItems: "center",
          py: 3,
          my: 2,
          px: 2,
          bgcolor: bgColor || "#fff",
          borderRadius: "12px",
        }}
        gap={2}
        width="100%"
      >
        <Stack
          flex="1"
          // flexDirection={{ xs: "column-reverse" ,md:'column'}}
          color={color}
          pl={1}
        >
          {!matches && (
            <>
              {img ? (
                <img
                  src={img}
                  style={{
                    width: "40px",
                    height: "40px",
                    alignSelf: "center",
                  }}
                />
              ) : (
                <>{icon && icon}</>
              )}
            </>
          )}

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
            {matches && (
              <>
                {img ? (
                  <img
                    src={img}
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                  />
                ) : (
                  <>{icon && icon}</>
                )}
              </>
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
CustomTitle.propTypes = {
  title: PropTypes.node,
  titleVariant: PropTypes.string,
  subtitle: PropTypes.node,
  img: PropTypes.string,
  icon: PropTypes.node,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  showBack: PropTypes.bool,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  right: PropTypes.node,
};

export default CustomTitle;
