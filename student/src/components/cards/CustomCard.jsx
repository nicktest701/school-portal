import React from "react";
import { Box, Typography, Stack, Divider } from "@mui/material";

const CustomCard = ({
  title,
  subtitle,
  icon,
  imgSrc,
  children,
  bgColor,
  sx,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: bgColor ? undefined : "white",
        background: bgColor || undefined,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        overflow: "hidden",
        height: "100%",
        ...sx,
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          p: 2,
          color: bgColor ? "white" : "text.primary",
          backgroundColor: bgColor ? "rgba(0,0,0,0.1)" : "transparent",
        }}
      >
        {icon}
        {imgSrc && (
          <img alt="db" src={imgSrc} style={{ width: 28, height: 28 }} />
        )}
        <Stack>
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="caption"
              fontStyle="italic"
              color="text.secondary"
            >
              {subtitle}
            </Typography>
          )}
        </Stack>
      </Stack>

      {!bgColor && <Divider />}

      <Box sx={{ p: 2.5 }}>{children}</Box>
    </Box>
  );
};

export default CustomCard;
