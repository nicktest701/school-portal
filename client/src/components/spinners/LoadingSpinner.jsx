import { Typography } from "@mui/material";

function LoadingSpinner({ value }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.52)",
        zIndex: "99999999999",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "100svw",
        minHeight: "100svh",
        overflow: "hidden",
        gap: "16px",
      }}
    >
      
      <div className="spinner"></div>
      <Typography variant='body2' color='white' >{value || "Please Wait.."}</Typography>
    </div>
  );
}

export default LoadingSpinner;
