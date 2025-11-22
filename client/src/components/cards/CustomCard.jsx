import { MoreHorizRounded } from "@mui/icons-material";
import { Card, IconButton, Stack, Typography } from "@mui/material";
import React from "react";

function CustomCard({ title, subtitle, children }) {
  return (
    <Card sx={{ p: 2, minWidth: 200, minHeight: 200 }}>
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2" fontWeight="bold">
            {title}
          </Typography>
          <IconButton color="secondary">
            <MoreHorizRounded />
          </IconButton>
        </Stack>
        {subtitle && (
          <Typography
            variant="caption"
            fontStyle="italic"
            color="text.secondary"
          >
            {subtitle}
          </Typography>
        )}
      </Stack>

      {children}
    </Card>
  );
}

export default CustomCard;
