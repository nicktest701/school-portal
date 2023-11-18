import { Box, Skeleton } from '@mui/material';
import React from 'react';

const ChartSkeleton = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
        backgroundColor: 'transparent',
        gap: 3,
        paddingY: 4,
      }}
    >
      <Skeleton variant='rounded' height={200} />
      <Skeleton variant='rounded' height={200} />
      <Skeleton variant='rounded' height={200} />
      <Skeleton variant='rounded' height={200} />
    </Box>
  );
};

export default ChartSkeleton;
