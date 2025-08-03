import { Card, CardContent, Typography, Skeleton, Button } from "@mui/material";

const FeesDetailsSkeleton = () => {
  return (
    <Card sx={{ p: 2, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Skeleton variant="circular" width={24} height={24} />
        <Skeleton width={120} />
      </Typography>

      <CardContent>
        <Skeleton variant="rounded" height={40} />

        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          <Skeleton width={80} />
        </Typography>

        <Skeleton width="60%" height={20} />
        <Skeleton width="60%" height={20} />
        <Skeleton width="80%" height={20} sx={{ my: 1 }} />
        <Skeleton width="60%" height={20} />
        <Skeleton width="60%" height={20} />

        <Skeleton variant="rounded" width={120} height={32} sx={{ mt: 2 }} />
      </CardContent>
    </Card>
  );
};

export default FeesDetailsSkeleton;
