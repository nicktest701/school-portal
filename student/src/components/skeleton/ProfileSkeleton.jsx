import { Skeleton, Box, Button, IconButton, Typography } from "@mui/material";
import { Edit, Person, ContactMail, School, Info, Delete } from "@mui/icons-material";

const ProfileSkeleton = () => {
  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      {/* Profile Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Skeleton variant="circular" width={80} height={80} />
        <Box>
          <Skeleton width={150} height={24} />
          <Skeleton width={100} height={20} />
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
        <Skeleton width={100} height={30} />
        <Skeleton width={120} height={30} />
        <Skeleton width={100} height={30} />
      </Box>

      {/* Profile Information */}
      <Typography variant="h6" fontWeight={600} mb={2}>
        <Skeleton width={200} height={30} />
      </Typography>
      <Box>
        {[...Array(4)].map((_, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Skeleton variant="rectangular" width={40} height={40} />
            <Box>
              <Skeleton width={100} height={20} />
              <Skeleton width={250} height={20} />
            </Box>
          </Box>
        ))}
      </Box>

      {/* Actions */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button variant="contained" disabled>
          <Skeleton width={120} height={40} />
        </Button>
        <Button variant="contained" color="error" disabled>
          <Skeleton width={120} height={40} />
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileSkeleton;
