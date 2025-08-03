import { MoreHorizRounded } from '@mui/icons-material';
import { Card, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';

function CustomCard({ title, children }) {
  return (
    <Card sx={{ p: 2, minWidth: 200, minHeight: 200 }}>
     
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='subtitle2'>{title}</Typography>
        <IconButton color='secondary'>
          <MoreHorizRounded />
        </IconButton>
      </Stack>
      {children}
    </Card>
  );
}

export default CustomCard;
