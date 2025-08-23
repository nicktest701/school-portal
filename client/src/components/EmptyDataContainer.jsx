import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React from "react";
import Add from "@mui/icons-material/Add";
import Empty from "./svg/Empty";
import { Box, useMediaQuery, useTheme } from "@mui/material";

const EmptyDataContainer = ({
  onClick,
  buttonText,
  message,
  showAddButton,
  otherButtons,
}) => {
  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.down("md"));

  return (
    <Box
      maxWidth="xl"
      className="hide-on-pint"
      sx={{
        borderRadius: "12px",
        backgroundColor: "#fff",
        width: "100%",
        height: "80svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Empty width={matches ? 120 : 150} />

      <Stack zIndex={999} pt={12} gap={2} alignItems="center">
        <Typography variant="body2" color="primary" textAlign="center" pt={2}>
          {message || "No data available!"}
        </Typography>
        <Stack direction="row" spacing={2}>
          {showAddButton && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={onClick}
              sx={{ width: { xs: 150, md: 200 } }}
            >
              {buttonText}
            </Button>
          )}
          {otherButtons && <>{otherButtons}</>}
        </Stack>
      </Stack>
    </Box>
  );
};

export default EmptyDataContainer;
