import { Typography } from '@mui/material';
import React from 'react';

const Footer = ({ bgcolor, color }) => {
  return (
    <footer
      style={{
        backgroundColor: bgcolor || '#333',
        display: 'grid',
        placeItems: 'center',
        height: '80px',
      }}
    >
      <Typography variant='body2' color={color || '#fff'}>
        Copyright &copy; {new Date().getFullYear()} | FrebbyTech Consults
      </Typography>
      {/* <Typography variant='caption' color='#fff'>
        +233543772591
      </Typography> */}
    </footer>
  );
};

export default Footer;
