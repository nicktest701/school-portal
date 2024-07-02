import { Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
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
      <Typography variant='body2' color='#fff'>
      For more information contact: +233543772591,+233560372844
      </Typography>
    </footer>
  );
};

export default Footer;
