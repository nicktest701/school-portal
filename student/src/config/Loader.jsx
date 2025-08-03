import { Backdrop, Typography } from "@mui/material";
import React from "react";
// import { InfinitySpin } from "react-loader-spinner";
// import Wifi from "../components/spinners/Wifi";
const Loader = () => {
  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        width: "100%",
      }}
      open={true}
    >
      {/* <InfinitySpin width="200" color={palette.primary.main} /> */}
      {/* <Wifi /> */}
      <div className="spinner"></div>
      <Typography variant='body2'>Please Wait..</Typography>
    </Backdrop>
  );
};

export default Loader;
