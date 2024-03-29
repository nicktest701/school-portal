import { Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        // position: 'fixed',
        // bottom: 0,
        backgroundColor: '#333',
        display: 'grid',
        placeItems: 'center',
        paddingBlock: '16px',
        color: '#fff',
      }}
    >
      <Typography variant='body2' color='#fff'>
        Copyright &copy; {new Date().getFullYear()} | FrebbyTech Consults
      </Typography>
      {/* <Typography variant='caption' color='#fff'>
        +233543772591
      </Typography> */}
    </footer>
  );
};

export default Footer;
