import React from "react";
import {
  Box,
  Skeleton,
  Grid,
  Card,
  CardContent,
  Container,
} from "@mui/material";

export default function NotesSkeleton() {
  const notes = new Array(20).fill(null);

  return (
    <Container maxWidth="lg" sx={{ margin: "auto", mt: 3 }}>
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        p={2}
        sx={{ background: "#f8f9fa", borderRadius: 2 }}
      >
        <Box>
          <Skeleton variant="text" width={200} height={30} />
          <Skeleton variant="text" width={350} height={20} />
        </Box>
        <Skeleton variant="rectangular" width={120} height={40} />
      </Box>
      {/* Theme Selector Skeleton */}
      <Box display="flex" justifyContent="flex-end" mt={3} gap={1}>
        {[1, 2, 3].map((index) => (
          <Skeleton key={index} variant="rectangular" width={60} height={30} />
        ))}
      </Box>

      {/* Notes Section */}
      <Grid container spacing={2} mt={2}>
        {notes.map((index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card>
              <CardContent>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                >
                  <Skeleton variant="circular" width={24} height={24} />
                  <Skeleton variant="circular" width={24} height={24} />
                </Box>
                <Skeleton variant="text" width="40%" height={25} />
                <Skeleton variant="rectangular" width="100%" height={120} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
