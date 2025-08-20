// import { MoreHorizRounded } from '@mui/icons-material';
// import { Card, IconButton, Stack, Typography } from '@mui/material';
// import React from 'react';

// function CustomCard({ title, children }) {
//   return (
//     <Card sx={{ p: 2, minWidth: 200, minHeight: 200 }}>

//       <Stack direction='row' justifyContent='space-between' alignItems='center'>
//         <Typography variant='subtitle2'>{title}</Typography>
//         <IconButton color='secondary'>
//           <MoreHorizRounded />
//         </IconButton>
//       </Stack>
//       {children}
//     </Card>
//   );
// }

// export default CustomCard;

// src/components/cards/CustomCard.js
import { Box, Typography, Stack, Divider } from "@mui/material";

const CustomCard = ({ title, icon, children, bgColor, sx }) => {
  return (
    <Box
      sx={{
        backgroundColor: bgColor ? undefined : "white",
        background: bgColor || undefined,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        overflow: "hidden",
        height: "100%",
        ...sx,
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          p: 2.5,
          color: bgColor ? "white" : "text.primary",
          backgroundColor: bgColor ? "rgba(0,0,0,0.1)" : "transparent",
        }}
      >
        {icon}
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>
      </Stack>

      {!bgColor && <Divider />}

      <Box sx={{ p: 2.5 }}>{children}</Box>
    </Box>
  );
};

export default CustomCard;
