import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Divider,
  useMediaQuery,
  useTheme,
  Avatar,
  IconButton,
  InputAdornment,
  TextField,
  Container,
} from "@mui/material";
import {
  Person as PersonIcon,
  EventAvailable as AttendanceIcon,
  Warning as WarningIcon,
  TrendingUp as TrendIcon,
  School as ClassIcon,
  BarChart as ChartIcon,
  Search as SearchIcon,
  EmojiEvents as AwardIcon,
  CalendarToday as CalendarIcon,
  Sort as SortIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
} from "@mui/icons-material";

import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { getAttendanceDashboardInfo } from "@/api/attendanceAPI";
import { useAuth } from "@/context/AuthProvider";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AttendanceDashboard = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [tabValue, setTabValue] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const { user } = useAuth();
  const attendanceRecord = useQuery({
    queryKey: ["attendanceRecord", user?._id],
    queryFn: () => getAttendanceDashboardInfo(user?._id),
    refetchOnWindowFocus: false,
    // retry: 1,
    enabled: !!user?._id,
  });

  console.log("Attendance Record:", attendanceRecord.data);

  // Attendance data
  const overallAttendance = 91;
  const attendedClasses = 182;
  const totalClasses = 200;

  // Stat cards data
  const statCards = [
    {
      title: "Best Attendance",
      value: "98%",
      description: "Sarah Johnson - Class XII-B",
      icon: <PersonIcon fontSize="large" />,
      color: theme.palette.success.main,
      bgColor: "rgba(76, 175, 80, 0.1)",
      gradient:
        "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.2) 100%)",
    },
    {
      title: "Lowest Attendance",
      value: "68%",
      description: "Michael Chen - Class XI-A",
      icon: <PersonIcon fontSize="large" />,
      color: theme.palette.error.main,
      bgColor: "rgba(244, 67, 54, 0.1)",
      gradient:
        "linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(244, 67, 54, 0.2) 100%)",
    },
    {
      title: "Most Consistent Class",
      value: "94.2%",
      description: "Class XII-B",
      icon: <ClassIcon fontSize="large" />,
      color: theme.palette.primary.main,
      bgColor: "rgba(33, 150, 243, 0.1)",
      gradient:
        "linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0.2) 100%)",
    },
    {
      title: "Attendance Warnings",
      value: "12",
      description: "Students below 70%",
      icon: <WarningIcon fontSize="large" />,
      color: theme.palette.warning.main,
      bgColor: "rgba(255, 152, 0, 0.1)",
      gradient:
        "linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 152, 0, 0.2) 100%)",
    },
  ];

  // Attendance trend data
  const attendanceTrend = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Class XII-A",
        data: [92, 94, 91, 95, 90, 93, 94],
        backgroundColor: "rgba(33, 150, 243, 0.6)",
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
        borderRadius: 4,
        tension: 0.3,
      },
      {
        label: "Class XII-B",
        data: [94, 96, 95, 97, 94, 96, 98],
        backgroundColor: "rgba(76, 175, 80, 0.6)",
        borderColor: theme.palette.success.main,
        borderWidth: 2,
        borderRadius: 4,
        tension: 0.3,
      },
      {
        label: "Class XI-A",
        data: [88, 86, 89, 85, 82, 84, 86],
        backgroundColor: "rgba(255, 152, 0, 0.6)",
        borderColor: theme.palette.warning.main,
        borderWidth: 2,
        borderRadius: 4,
        tension: 0.3,
      },
    ],
  };

  // Bar chart options
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#333",
        bodyColor: "#333",
        borderColor: "#ddd",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 70,
        max: 100,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
  };

  // Class distribution data
  const classDistribution = {
    labels: [
      "Class XII-A",
      "Class XII-B",
      "Class XI-A",
      "Class XI-B",
      "Class X",
    ],
    datasets: [
      {
        data: [92, 95, 86, 90, 88],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.success.main,
          theme.palette.warning.main,
          theme.palette.info.main,
          theme.palette.secondary.main,
        ],
        borderColor: [
          theme.palette.primary.dark,
          theme.palette.success.dark,
          theme.palette.warning.dark,
          theme.palette.info.dark,
          theme.palette.secondary.dark,
        ],
        borderWidth: 1,
      },
    ],
  };

  // Doughnut chart options
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.parsed}%`;
          },
        },
      },
    },
    cutout: "70%",
  };

  // Table data
  const recentAbsentees = [
    {
      id: 1,
      name: "Michael Chen",
      className: "XI-A",
      date: "2023-07-15",
      reason: "Medical Appointment",
    },
    {
      id: 2,
      name: "Alex Johnson",
      className: "XII-B",
      date: "2023-07-14",
      reason: "Family Event",
    },
    {
      id: 3,
      name: "James Rodriguez",
      className: "XI-B",
      date: "2023-07-14",
      reason: "Illness",
    },
    {
      id: 4,
      name: "Emma Wilson",
      className: "XII-A",
      date: "2023-07-13",
      reason: "Personal",
    },
    {
      id: 5,
      name: "Olivia Brown",
      className: "X",
      date: "2023-07-12",
      reason: "Transport Issue",
    },
  ];

  const punctualStudents = [
    {
      id: 1,
      name: "Sarah Johnson",
      className: "XII-B",
      attendance: 98,
      rank: 1,
    },
    {
      id: 2,
      name: "David Williams",
      className: "XII-A",
      attendance: 97,
      rank: 2,
    },
    {
      id: 3,
      name: "Sophia Garcia",
      className: "XI-B",
      attendance: 96,
      rank: 3,
    },
    { id: 4, name: "Ethan Smith", className: "XII-B", attendance: 95, rank: 4 },
    {
      id: 5,
      name: "Isabella Martinez",
      className: "XI-A",
      attendance: 94,
      rank: 5,
    },
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedAbsentees = [...recentAbsentees].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  const sortedPunctual = [...punctualStudents].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  return (
    <Container
      sx={{
        p: 2,
        fontFamily: '"Roboto", "Inter", "Poppins", sans-serif',
        backgroundColor: "#f8fafc",
        mt: 2,
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.dark,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <AttendanceIcon fontSize="large" />
          Attendance Dashboard
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
          Track and analyze student attendance patterns
        </Typography>
      </Box>

      {/* Attendance Summary (Hero Section) */}
      <Card
        sx={{
          mb: 4,
          borderRadius: 4,
          boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
          background: "linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)",
          color: "white",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Grid container alignItems="center" spacing={4}>
            <Grid
              size={{ xs: 12, md: 4 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                  variant="determinate"
                  value={overallAttendance}
                  size={200}
                  thickness={4}
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    "& .MuiCircularProgress-circle": {
                      strokeLinecap: "round",
                    },
                  }}
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
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h2"
                    component="div"
                    sx={{ fontWeight: 700 }}
                  >
                    {overallAttendance}%
                  </Typography>
                  <Typography variant="subtitle1" sx={{ opacity: 0.9, mt: 1 }}>
                    Overall Attendance Rate
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Excellent Attendance Record
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                You've attended {attendedClasses} out of {totalClasses} classes
                this academic year. Your consistent attendance places you in the
                top 15% of your class.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  flexWrap: "wrap",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.15)",
                    p: 2,
                    borderRadius: 2,
                    minWidth: 150,
                  }}
                >
                  <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                    Attended
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {attendedClasses}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.15)",
                    p: 2,
                    borderRadius: 2,
                    minWidth: 150,
                  }}
                >
                  <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                    Missed
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {totalClasses - attendedClasses}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.15)",
                    p: 2,
                    borderRadius: 2,
                    minWidth: 150,
                  }}
                >
                  <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                    Rank
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AwardIcon sx={{ mr: 1 }} /> 8th
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Stat Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((card, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                background: card.gradient,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
                },
              }}
            >
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    backgroundColor: card.bgColor,
                    mr: 2,
                    flexShrink: 0,
                  }}
                >
                  <Box sx={{ color: card.color }}>{card.icon}</Box>
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ mb: 0.5 }}
                  >
                    {card.title}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {card.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {card.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Attendance Trend Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TrendIcon
                    sx={{ mr: 1, color: theme.palette.primary.main }}
                  />
                  Monthly Attendance Trend
                </Typography>
              </Box>
              <Box sx={{ height: 300 }}>
                <Bar data={attendanceTrend} options={barChartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Class Distribution Chart */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <ClassIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                Classwise Attendance Distribution
              </Typography>
              <Box sx={{ height: 300 }}>
                <Doughnut data={classDistribution} options={doughnutOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Detailed Tables */}
      <Card sx={{ borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant={isTablet ? "scrollable" : "standard"}
            sx={{ px: 2 }}
          >
            <Tab
              label="Recent Absentees"
              icon={<WarningIcon />}
              iconPosition="start"
              sx={{ minHeight: 60 }}
            />
            <Tab
              label="Most Punctual Students"
              icon={<AwardIcon />}
              iconPosition="start"
              sx={{ minHeight: 60 }}
            />
          </Tabs>
        </Box>

        <CardContent>
          {/* Recent Absentees Table */}
          {tabValue === 0 && (
            <TableContainer
              component={Paper}
              sx={{ borderRadius: 2, boxShadow: "none" }}
            >
              <Table>
                <TableHead sx={{ bgcolor: "rgba(0, 0, 0, 0.02)" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSort("name")}
                      >
                        Student Name
                        {sortConfig.key === "name" &&
                          (sortConfig.direction === "asc" ? (
                            <ArrowUpIcon fontSize="small" />
                          ) : (
                            <ArrowDownIcon fontSize="small" />
                          ))}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSort("className")}
                      >
                        Class
                        {sortConfig.key === "className" &&
                          (sortConfig.direction === "asc" ? (
                            <ArrowUpIcon fontSize="small" />
                          ) : (
                            <ArrowDownIcon fontSize="small" />
                          ))}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSort("date")}
                      >
                        Date
                        {sortConfig.key === "date" &&
                          (sortConfig.direction === "asc" ? (
                            <ArrowUpIcon fontSize="small" />
                          ) : (
                            <ArrowDownIcon fontSize="small" />
                          ))}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Reason</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedAbsentees.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:nth-of-type(odd)": {
                          bgcolor: "rgba(0, 0, 0, 0.02)",
                        },
                        "&:hover": { bgcolor: "rgba(25, 118, 210, 0.03)" },
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              bgcolor: theme.palette.primary.light,
                              mr: 2,
                              fontSize: 14,
                            }}
                          >
                            {row.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </Avatar>
                          {row.name}
                        </Box>
                      </TableCell>
                      <TableCell>{row.className}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CalendarIcon
                            sx={{
                              fontSize: 16,
                              mr: 1,
                              color: theme.palette.text.secondary,
                            }}
                          />
                          {row.date}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: theme.palette.text.secondary }}>
                        {row.reason}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Punctual Students Table */}
          {tabValue === 1 && (
            <TableContainer
              component={Paper}
              sx={{ borderRadius: 2, boxShadow: "none" }}
            >
              <Table>
                <TableHead sx={{ bgcolor: "rgba(0, 0, 0, 0.02)" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Rank</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Student</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Class</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>
                      Attendance %
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedPunctual.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:nth-of-type(odd)": {
                          bgcolor: "rgba(0, 0, 0, 0.02)",
                        },
                        "&:hover": { bgcolor: "rgba(25, 118, 210, 0.03)" },
                      }}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            fontWeight: 700,
                            color:
                              row.rank === 1
                                ? theme.palette.warning.main
                                : row.rank <= 3
                                ? theme.palette.primary.main
                                : "inherit",
                          }}
                        >
                          {row.rank}
                          {row.rank === 1
                            ? "st"
                            : row.rank === 2
                            ? "nd"
                            : row.rank === 3
                            ? "rd"
                            : "th"}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              bgcolor:
                                row.rank === 1
                                  ? theme.palette.warning.light
                                  : theme.palette.primary.light,
                              mr: 2,
                              fontSize: 14,
                            }}
                          >
                            {row.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </Avatar>
                          {row.name}
                        </Box>
                      </TableCell>
                      <TableCell>{row.className}</TableCell>
                      <TableCell align="right">
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            fontWeight: 700,
                            color:
                              row.attendance >= 95
                                ? theme.palette.success.main
                                : row.attendance >= 90
                                ? theme.palette.primary.main
                                : theme.palette.warning.main,
                          }}
                        >
                          {row.attendance}%
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Bottom status */}
      <Box
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
          bgcolor: "rgba(25, 118, 210, 0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: isTablet ? "column" : "row",
          textAlign: "center",
          gap: 1,
        }}
      >
        <AttendanceIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
        <Typography variant="body2">
          Your attendance is excellent! Maintain your current rate to qualify
          for the Perfect Attendance Award.
        </Typography>
      </Box>
    </Container>
  );
};

export default AttendanceDashboard;
