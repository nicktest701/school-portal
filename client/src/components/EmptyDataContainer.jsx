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
  img,
  message,
  showAddButton,
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
      
        <Empty width={matches ? 100 : 200} />
      
      <Stack zIndex={9999999} pt={12}>
        <Typography variant="h6" color="primary" textAlign="center">
          {message || "No data available !"}
        </Typography>
        {showAddButton && (
          <Button variant="contained" startIcon={<Add />} onClick={onClick}>
            {buttonText}
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default EmptyDataContainer;
