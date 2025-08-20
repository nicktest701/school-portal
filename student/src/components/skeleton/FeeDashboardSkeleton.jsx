import {
  Card,
  CardContent,
  Grid,
  Skeleton,
  Box,
  Divider,
  Stack,
} from "@mui/material";

export default function FeeDashboardSkeleton() {
  return (
    <Box py={2}>
      {/* Top Summary Cards */}
      <Grid container spacing={2} mb={4}>
        {[1, 2, 3].map((i) => (
          <Grid
            size={{
              xs: 12,
              sm: 4,
            }}
            key={i}
          >
            <Card sx={{ height: 100, borderRadius: 3 }}>
              <CardContent>
                <Skeleton variant="text" width="60%" height={25} />
                <Skeleton variant="text" width="40%" height={25} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Current Fee Summary & Fee Payment History */}
      <Grid container spacing={2} mb={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: 220, borderRadius: 3 }}>
            <CardContent>
              <Skeleton variant="text" width="50%" height={25} />
              <Divider sx={{ my: 1 }} />
              <Stack spacing={2}>
                <Skeleton variant="rectangular" width="100%" height={40} />
                <Skeleton variant="rectangular" width="100%" height={40} />
                <Skeleton variant="rectangular" width="100%" height={40} />
                <Skeleton variant="rectangular" width="80%" height={12} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: 220, borderRadius: 3 }}>
            <CardContent>
              <Skeleton variant="text" width="50%" height={25} />
              <Divider sx={{ my: 1 }} />
              <Skeleton variant="rectangular" width="100%" height={150} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Fees Paid */}
      <Card sx={{ borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Skeleton variant="text" width="30%" height={25} />
          <Divider sx={{ my: 2 }} />
          {[1, 2].map((i) => (
            <Grid container spacing={2} key={i} sx={{ mb: 2 }}>
              <Grid size={{ xs: 12, sm: 2 }}>
                <Skeleton variant="text" width="80%" height={20} />
              </Grid>
              <Grid size={{ xs: 12, sm: 2 }}>
                <Skeleton variant="text" width="60%" height={20} />
              </Grid>
              <Grid size={{ xs: 12, sm: 2 }}>
                <Skeleton variant="text" width="70%" height={20} />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Skeleton variant="text" width="90%" height={20} />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Skeleton variant="text" width="80%" height={20} />
              </Grid>
            </Grid>
          ))}
        </CardContent>
      </Card>

      {/* Next Payment Notice */}
      <Card sx={{ borderRadius: 3, p: 2 }}>
        <Skeleton variant="text" width="60%" height={20} />
      </Card>
    </Box>
  );
}
