import React, { useContext } from "react";
import Alert from "@mui/material/Alert";
import { SchoolSessionContext } from "../../context/providers/SchoolSessionProvider";
import Snackbar from "@mui/material/Snackbar";
import ErrorRounded from "@mui/icons-material/ErrorRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import Transition from "../animations/Transition";
const GlobalAlert = () => {
  const {
    schoolSessionState: { alertData },
    schoolSessionDispatch,
  } = useContext(SchoolSessionContext);

  const handleClose = () => {
    schoolSessionDispatch({
      type: "closeAlert",
    });
  };
  // const borderColor = alertData?.severity === 'error' ? '#B72136' : '#1890FF';
  const color = alertData?.severity === "error" ? "#B72136" : "green";

  return (
    <Snackbar
      anchorOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
      open={alertData?.message ? true : false}
      autoHideDuration={5000}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Alert
        icon={
          alertData?.severity === "info" ? (
            <CheckCircleRounded color="success" />
          ) : (
            <ErrorRounded color="error" />
          )
        }
        severity={alertData?.severity}
        // onClose={handleClose}
        sx={{
          // width: "100%",
          bgcolor: "primary.main",
          color: alertData?.severity === "info" ? "success.main" : "error.main",
          borderBottom: `2px solid ${color}`,
          py: 1,
        }}
      >
        {alertData?.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalAlert;