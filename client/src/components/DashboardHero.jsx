import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  LinearProgress,
  Divider,
  Badge,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";


const DashboardHero = () => {
  return (
    <Card sx={{ margin: "auto", padding: 2 }}>
      <CardContent>
        {/* Header */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            {/* Circular Progress with Text */}
            <Box>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                }}
              >
                {/* Non-completed part */}
                <CircularProgress
                  variant="determinate"
                  value={100} // Always render the full circle as light gray
                  size={90}
                  thickness={3}
                  sx={{
                    color: "lightgray",
                  }}
                />
                <CircularProgress
                  variant="determinate"
                  value={20}
                  size={90}
                  thickness={3}
                  sx={{
                    color: 20 === 100 ? "green" : "primary.main",
                    position: "absolute", // Stack it on top of the gray progress
                    left: 0,
                    // bgcolor:'lightgray'
                  }} // Optional styling for 100%
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6" component="div" color="text.primary">
                    20%
                  </Typography>
                </Box>
              </Box>
              <Typography>Results Entry </Typography>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Kumawu Technical Institute
                <Badge
                  color="success"
                  variant="dot"
                  overlap="circular"
                  sx={{ marginLeft: 1 }}
                >
                  <CheckCircleIcon color="success" />
                </Badge>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                9052900 | ASHANTI REGION | Day/Boarding
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Progress Section */}
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary">
            Below is the state of school results by distinct academic year and
            semesters.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Only 5 academic year/semester results out of 6 have been approved.
          </Typography>
          <Box mt={2} display="flex" alignItems="center" gap={1}>
            <Typography variant="body2" fontWeight="bold" color="primary">
              Approved: 5
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total: 6
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={83}
            sx={{ height: 8, borderRadius: 1, mt: 1 }}
          />
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Progress: 83%
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Statistics Section */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box textAlign="center">
              <GroupIcon color="primary" />
              <Typography variant="h6">33</Typography>
              <Typography variant="caption" color="text.secondary">
                Teachers
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box textAlign="center">
              <GroupIcon color="primary" />
              <Typography variant="h6">311</Typography>
              <Typography variant="caption" color="text.secondary">
                Students
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box textAlign="center">
              <AssignmentTurnedInIcon color="primary" />
              <Typography variant="h6">314</Typography>
              <Typography variant="caption" color="text.secondary">
                Assigned
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DashboardHero;
