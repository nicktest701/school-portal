import { Backdrop, Typography } from '@mui/material';
import React from 'react';
// import { InfinitySpin } from "react-loader-spinner";
import Wifi from '../components/spinners/Wifi';
const Loader = () => {
  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap:2
      }}
      open={true}
    >
      {/* <InfinitySpin width="200" color={palette.primary.main} /> */}
      <Wifi />
      
      <Typography>Please Wait</Typography>
    </Backdrop>
  );
};

export default Loader;
