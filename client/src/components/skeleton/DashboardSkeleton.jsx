import { Box, Skeleton } from '@mui/material';
import React from 'react';

const DashboardSkeleton = () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
        gap: 2,
        paddingY: 2,
      }}
    >
        <Skeleton variant='rounded' height={100}/>
        <Skeleton variant='rounded' height={100}/>
        <Skeleton variant='rounded' height={100}/>
        <Skeleton variant='rounded' height={100}/>
  
      

    </Box>
  );
};

export default DashboardSkeleton;
