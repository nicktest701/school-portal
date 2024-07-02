import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React from "react";
import Add from "@mui/icons-material/Add";
import { EMPTY_IMAGES } from "../config/images";

const EmptyDataContainer = ({
  onClick,
  buttonText,
  img,
  message,
  showAddButton,
}) => {
  return (
    <Container
      className="hide-on-pint"
      sx={{
        backgroundColor: "#fff",
        height: "70svh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={3}
        paddingY={4}
      >
        <img
          loading="lazy"
          src={img || EMPTY_IMAGES.student}
          alt="empty_image"
          style={{
            width: 250,
            height: 250,
            objectFit: "contain",
          }}
        />
        <Typography variant="body2" color="primary" textAlign="center">
          {message || "No data available !"}
        </Typography>
        {showAddButton && (
          <Button variant="contained" startIcon={<Add />} onClick={onClick}>
            {buttonText}
          </Button>
        )}
      </Stack>
    </Container>
  );
};

export default EmptyDataContainer;
