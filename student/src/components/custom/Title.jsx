import { Box, Stack, Typography, IconButton } from "@mui/material";
import React from "react";
import { ArrowBackRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Title({ title, subtitle, color, showBack, to, right }) {
  const navigate = useNavigate();
  const goBack = () => navigate(to || -1);

  return (
    <>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
          my: 2,
          background:
            "linear-gradient(to right, var(--primary), var(--secondary))",
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
            <Typography flex={1} variant="h2" color="#fff">
              {title}
            </Typography>
          </Stack>
          <Typography variant="body2" color="#fff">
            {subtitle}
          </Typography>
        </Stack>
        {right}
      </Stack>

      {/* <Divider /> */}
    </>
  );
}

export default Title;
