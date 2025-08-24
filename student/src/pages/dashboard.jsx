import React from "react";
// import Calendar from "react-calendar";
import {
  Box,
  Stack,
  Typography,
  Avatar,
  Divider,
  Grid,
  IconButton,
  Chip,
  Badge,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import {
  Notifications,
  Mail,
  Settings,
  School,
  Event as EventIcon,
  Assignment,
  LibraryBooks,
  Home,
  Person,
  TrendingUp,
  CreditCard,
} from "@mui/icons-material";
import DashboardSwiper from "@/components/swiper/DashboardSwiper";
import Birthday from "@/components/items/Birthday";
import CustomCard from "@/components/cards/CustomCard";
import { EMPTY_IMAGES } from "@/config/images";
import CustomTitle from "@/components/custom/CustomTitle";
import Announcement from "@/components/calendar/Announcement";
import Event from "@/components/calendar/Event";
import { useAuth } from "@/context/AuthProvider";
import CustomEvent from "@/components/calendar/CustomEvent";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              pt: 2,
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                textAlign="right"
                textTransform="capitalize"
              >
                Welcome,{user?.firstname}!
              </Typography>
              <Typography>Your current dashboard for today!</Typography>
              {/* <p>
                This is your dashboard where you can see your academic progress,
                fees status, and more.
              </p>
              <p>
                Use the navigation menu to access different sections of the
                application.
              </p> */}
            </Box>
            {/* <Avatar
              alt="wave_hand"
              src={EMPTY_IMAGES.hand}
              style={{ width: "48px", height: "48px" }}
              variant="square"
            /> */}
            <Avatar
              alt={user?.firstname}
              src={user?.profile}
              sx={{
                width: 64,
                height: 64,
                border: "2px solid #3B82F6",
                bgcolor: "#3B82F6",
                color: "white",
              }}
            >
              {user?.firstname?.[0]}
              {user?.lastname?.[0]}
            </Avatar>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box>
              <Typography fontWeight={600} textTransform="capitalize">
                {user?.firstname} {user?.surname}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {user?.indexnumber || "STD-001"}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
                {user?.program || "Computer Science"}
              </Typography> */}
            </Box>
          </Stack>

          <Divider />
          <CustomTitle
            title="Dashboard"
            subtitle=" Access key metrics, recent updates, and important notifications to stay informed about school activities at a glance."
            color="text.main"
            bgColor="transparent"
            backColor="#012e54"
            titleVariant="h2"
            bgcolor="#ffffff"
          />
          {/* Quick Stats */}
          <Grid container spacing={3} sx={{ my: 3 }}>
            {/* GPA Card */}
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <CustomCard
                title="GPA"
                icon={<TrendingUp fontSize="large" />}
                bgColor="linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)"
              >
                <Stack direction="row" alignItems="flex-end" spacing={1}>
                  <Typography variant="h3" fontWeight={700} color="white">
                    3.78
                  </Typography>
                  <Typography
                    variant="body1"
                    color="rgba(255,255,255,0.8)"
                    pb={0.5}
                  >
                    /4.0
                  </Typography>
                </Stack>
                <Typography variant="body2" color="rgba(255,255,255,0.8)">
                  +0.12 from last semester
                </Typography>
              </CustomCard>
            </Grid>

            {/* Attendance Card */}
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <CustomCard
                title="Attendance"
                icon={<Person fontSize="large" />}
                bgColor="linear-gradient(135deg, #10B981 0%, #047857 100%)"
              >
                <Box
                  sx={{ position: "relative", display: "inline-flex", mb: 1 }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CircularProgress
                      variant="determinate"
                      value={92}
                      size={80}
                      thickness={4}
                      sx={{ color: "rgba(255,255,255,0.3)" }}
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
                      <Typography variant="h5" fontWeight={700} color="white">
                        92%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body2" color="rgba(255,255,255,0.8)">
                  4 absences this semester
                </Typography>
              </CustomCard>
            </Grid>

            {/* Fees Card */}
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <CustomCard
                title="Fees Status"
                icon={<CreditCard fontSize="large" />}
                bgColor="linear-gradient(135deg, #F59E0B 0%, #B45309 100%)"
              >
                <Stack spacing={1} width="100%">
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="rgba(255,255,255,0.8)">
                      Paid
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color="white">
                      ₵1,200
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="rgba(255,255,255,0.8)">
                      Balance
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color="white">
                      ₵300
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={80}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "rgba(255,255,255,0.2)",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 5,
                      },
                    }}
                  />
                  <Typography variant="caption" color="rgba(255,255,255,0.8)">
                    Due: Jan 15, 2024
                  </Typography>
                </Stack>
              </CustomCard>
            </Grid>
          </Grid>

          {/* <Divider /> */}
          <Box sx={{ pt: 4 }}>
            <div style={{ marginBottom: "24px" }}>
              <Typography variant="h4" paragraph>
                Recent News & Events
              </Typography>
              <DashboardSwiper />
            </div>
            <div style={{ paddingBlock: "24px" }}>
              <Typography variant="h4" paragraph>
                Events,Activities & Holidays
              </Typography>
              <CustomEvent />
            </div>
          </Box>
        </Box>

        <Box
          sx={{
            minWidth: { xs: 0, sm: 270, md: 300 },

            // minWidth: { xs: 0, md: 250 },
            display: { xs: "none", md: "block" },
            transition: "all 0.4s ease-in-out",
            position: "sticky",
            top: 0,
            // height:'200svh',
            minHeight: "100svh",
          }}
        >
          <Stack spacing={3} height="100%">
            <CustomCard title="Events">
              <Event />
            </CustomCard>
            <CustomCard title="Birthday">
              <Birthday />
            </CustomCard>
            <CustomCard title="Announcements">
              <Announcement />
            </CustomCard>
          </Stack>
        </Box>
      </Box>

      {/* <CustomParticle /> */}
    </>
  );
};

export default React.memo(Dashboard);

// import React from "react";
// import {
//   Box,
//   Stack,
//   Typography,
//   Avatar,
//   Divider,
//   Grid,
//   IconButton,
//   Chip,
//   Badge,
//   LinearProgress,
//   CircularProgress,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import {
//   Notifications,
//   Mail,
//   Settings,
//   School,
//   Event,
//   Assignment,
//   LibraryBooks,
//   Home,
//   Person,
//   BarChart,
//   TrendingUp,
//   CreditCard,
//   CheckCircle,
// } from "@mui/icons-material";
// import { useAuth } from "@/context/AuthProvider";
// import CustomCard from "@/components/cards/CustomCard";

// // Mock data for demonstration
// const courses = [
//   { name: "Mathematics", attendance: 92, assignments: 2, exams: "Dec 15" },
//   { name: "Computer Science", attendance: 85, assignments: 1, exams: "Dec 18" },
//   { name: "Physics", attendance: 88, assignments: 3, exams: "Dec 20" },
//   {
//     name: "English Literature",
//     attendance: 95,
//     assignments: 0,
//     exams: "Dec 22",
//   },
// ];

// const events = [
//   { title: "Physics Assignment", date: "Tomorrow", type: "assignment" },
//   { title: "Math Quiz", date: "Dec 14", type: "exam" },
//   { title: "Science Fair", date: "Dec 20", type: "event" },
//   { title: "Term Ends", date: "Dec 22", type: "holiday" },
// ];

// const announcements = [
//   {
//     title: "Campus Maintenance",
//     date: "Dec 10",
//     content: "Library will be closed on Dec 15 for maintenance",
//   },
//   {
//     title: "Scholarship Deadline",
//     date: "Dec 18",
//     content: "Submit scholarship applications by Dec 20",
//   },
//   {
//     title: "Holiday Break",
//     date: "Dec 22",
//     content: "Campus closes for holiday break from Dec 23 - Jan 7",
//   },
// ];

// const Dashboard = () => {
//   const { user } = useAuth();

//   return (
//     <Box
//       sx={{
//         p: { xs: 1, md: 3 },
//         backgroundColor: "#f9fafb",
//         minHeight: "100vh",
//       }}
//     >
//       {/* Header */}
//       <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
//         <Grid item xs={12} md={6}>
//           <Typography variant="h4" fontWeight={700} color="text.primary">
//             Student Portal
//           </Typography>
//           <Typography variant="subtitle1" color="text.secondary">
//             Welcome back, {user?.firstname || "Student"}!
//           </Typography>
//         </Grid>

//         <Grid
//           item
//           xs={12}
//           md={6}
//           sx={{
//             display: "flex",
//             justifyContent: "flex-end",
//             alignItems: "center",
//           }}
//         >
//           <Stack direction="row" spacing={1} alignItems="center">
//             <Avatar
//               alt={user?.firstname}
//               src={user?.profilePicture}
//               sx={{
//                 width: 56,
//                 height: 56,
//                 border: "2px solid #3B82F6",
//                 bgcolor: "#3B82F6",
//                 color: "white",
//               }}
//             >
//               {user?.firstname?.[0]}
//               {user?.lastname?.[0]}
//             </Avatar>

//             <Box>
//               <Typography fontWeight={600} textTransform="capitalize">
//                 {user?.firstname} {user?.lastname}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 ID: {user?.studentId || "STD-001"}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {user?.program || "Computer Science"}
//               </Typography>
//             </Box>

//             <Stack direction="row" spacing={1}>
//               <IconButton
//                 sx={{
//                   backgroundColor: "white",
//                   boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 <Badge badgeContent={3} color="error">
//                   <Notifications color="action" />
//                 </Badge>
//               </IconButton>
//               <IconButton
//                 sx={{
//                   backgroundColor: "white",
//                   boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 <Badge badgeContent={5} color="error">
//                   <Mail color="action" />
//                 </Badge>
//               </IconButton>
//               <IconButton
//                 sx={{
//                   backgroundColor: "white",
//                   boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 <Settings color="action" />
//               </IconButton>
//             </Stack>
//           </Stack>
//         </Grid>
//       </Grid>

//       {/* Quick Stats */}
//       <Grid container spacing={3} sx={{ mb: 3 }}>
//         {/* GPA Card */}
//         <Grid item xs={12} sm={6} md={3}>
//           <CustomCard
//             title="GPA"
//             icon={<TrendingUp fontSize="large" />}
//             bgColor="linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)"
//           >
//             <Stack direction="row" alignItems="flex-end" spacing={1}>
//               <Typography variant="h3" fontWeight={700} color="white">
//                 3.78
//               </Typography>
//               <Typography
//                 variant="body1"
//                 color="rgba(255,255,255,0.8)"
//                 pb={0.5}
//               >
//                 /4.0
//               </Typography>
//             </Stack>
//             <Typography variant="body2" color="rgba(255,255,255,0.8)">
//               +0.12 from last semester
//             </Typography>
//           </CustomCard>
//         </Grid>

//         {/* Attendance Card */}
//         <Grid item xs={12} sm={6} md={3}>
//           <CustomCard
//             title="Attendance"
//             icon={<Person fontSize="large" />}
//             bgColor="linear-gradient(135deg, #10B981 0%, #047857 100%)"
//           >
//             <Box sx={{ position: "relative", display: "inline-flex", mb: 1 }}>
//               <Box sx={{ position: "relative" }}>
//                 <CircularProgress
//                   variant="determinate"
//                   value={92}
//                   size={80}
//                   thickness={4}
//                   sx={{ color: "rgba(255,255,255,0.3)" }}
//                 />
//                 <Box
//                   sx={{
//                     top: 0,
//                     left: 0,
//                     bottom: 0,
//                     right: 0,
//                     position: "absolute",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Typography variant="h5" fontWeight={700} color="white">
//                     92%
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>
//             <Typography variant="body2" color="rgba(255,255,255,0.8)">
//               4 absences this semester
//             </Typography>
//           </CustomCard>
//         </Grid>

//         {/* Fees Card */}
//         <Grid item xs={12} sm={6} md={3}>
//           <CustomCard
//             title="Fees Status"
//             icon={<CreditCard fontSize="large" />}
//             bgColor="linear-gradient(135deg, #F59E0B 0%, #B45309 100%)"
//           >
//             <Stack spacing={1} width="100%">
//               <Stack direction="row" justifyContent="space-between">
//                 <Typography variant="body2" color="rgba(255,255,255,0.8)">
//                   Paid
//                 </Typography>
//                 <Typography variant="body2" fontWeight={600} color="white">
//                   ₵1,200
//                 </Typography>
//               </Stack>
//               <Stack direction="row" justifyContent="space-between">
//                 <Typography variant="body2" color="rgba(255,255,255,0.8)">
//                   Balance
//                 </Typography>
//                 <Typography variant="body2" fontWeight={600} color="white">
//                   ₵300
//                 </Typography>
//               </Stack>
//               <LinearProgress
//                 variant="determinate"
//                 value={80}
//                 sx={{
//                   height: 10,
//                   borderRadius: 5,
//                   backgroundColor: "rgba(255,255,255,0.2)",
//                   "& .MuiLinearProgress-bar": {
//                     borderRadius: 5,
//                   },
//                 }}
//               />
//               <Typography variant="caption" color="rgba(255,255,255,0.8)">
//                 Due: Jan 15, 2024
//               </Typography>
//             </Stack>
//           </CustomCard>
//         </Grid>

//         {/* Credits Card */}
//         <Grid item xs={12} sm={6} md={3}>
//           <CustomCard
//             title="Credits"
//             icon={<CheckCircle fontSize="large" />}
//             bgColor="linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)"
//           >
//             <Stack spacing={1} width="100%">
//               <Stack direction="row" justifyContent="space-between">
//                 <Typography variant="body2" color="rgba(255,255,255,0.8)">
//                   Completed
//                 </Typography>
//                 <Typography variant="body2" fontWeight={600} color="white">
//                   96
//                 </Typography>
//               </Stack>
//               <Stack direction="row" justifyContent="space-between">
//                 <Typography variant="body2" color="rgba(255,255,255,0.8)">
//                   Required
//                 </Typography>
//                 <Typography variant="body2" fontWeight={600} color="white">
//                   120
//                 </Typography>
//               </Stack>
//               <LinearProgress
//                 variant="determinate"
//                 value={80}
//                 sx={{
//                   height: 10,
//                   borderRadius: 5,
//                   backgroundColor: "rgba(255,255,255,0.2)",
//                   "& .MuiLinearProgress-bar": {
//                     borderRadius: 5,
//                   },
//                 }}
//               />
//               <Typography variant="caption" color="rgba(255,255,255,0.8)">
//                 24 credits remaining
//               </Typography>
//             </Stack>
//           </CustomCard>
//         </Grid>
//       </Grid>

//       {/* Main Content */}
//       <Grid container spacing={3}>
//         {/* Left Column - Academic Overview */}
//         <Grid item xs={12} lg={8}>
//           {/* Current Courses */}
//           <CustomCard title="Current Courses" icon={<School />}>
//             <Grid container spacing={2}>
//               {courses.map((course, index) => (
//                 <Grid item xs={12} sm={6} key={index}>
//                   <Box
//                     sx={{
//                       p: 2,
//                       border: "1px solid #e5e7eb",
//                       borderRadius: 2,
//                       transition: "all 0.3s ease",
//                       "&:hover": {
//                         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                         borderColor: "#3B82F6",
//                       },
//                     }}
//                   >
//                     <Stack
//                       direction="row"
//                       justifyContent="space-between"
//                       alignItems="center"
//                     >
//                       <Typography fontWeight={600}>{course.name}</Typography>
//                       <Chip
//                         label={`${course.attendance}%`}
//                         size="small"
//                         color={course.attendance > 90 ? "success" : "warning"}
//                       />
//                     </Stack>

//                     <Stack
//                       direction="row"
//                       spacing={1}
//                       mt={1}
//                       alignItems="center"
//                     >
//                       <Assignment fontSize="small" color="action" />
//                       <Typography variant="body2" color="text.secondary">
//                         {course.assignments} assignments due
//                       </Typography>
//                     </Stack>

//                     <Stack
//                       direction="row"
//                       spacing={1}
//                       mt={0.5}
//                       alignItems="center"
//                     >
//                       <Event fontSize="small" color="action" />
//                       <Typography variant="body2" color="text.secondary">
//                         Exam: {course.exams}
//                       </Typography>
//                     </Stack>
//                   </Box>
//                 </Grid>
//               ))}
//             </Grid>
//           </CustomCard>

//           {/* Performance Charts */}
//           <Grid container spacing={3} sx={{ mt: 0 }}>
//             <Grid item xs={12} md={6}>
//               <CustomCard title="Performance Trend">
//                 <Box
//                   sx={{
//                     height: 250,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     background: "linear-gradient(to bottom, #f8fafc, #f1f5f9)",
//                     borderRadius: 2,
//                   }}
//                 >
//                   <Typography color="text.secondary">
//                     GPA Trend Chart
//                   </Typography>
//                 </Box>
//               </CustomCard>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <CustomCard title="Grade Distribution">
//                 <Box
//                   sx={{
//                     height: 250,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     background: "linear-gradient(to bottom, #f8fafc, #f1f5f9)",
//                     borderRadius: 2,
//                   }}
//                 >
//                   <Typography color="text.secondary">
//                     Subject Grade Chart
//                   </Typography>
//                 </Box>
//               </CustomCard>
//             </Grid>
//           </Grid>
//         </Grid>

//         {/* Right Column - Widgets */}
//         <Grid item xs={12} lg={4}>
//           {/* Upcoming Deadlines */}
//           <CustomCard title="Upcoming Deadlines" icon={<Assignment />}>
//             <Stack spacing={2}>
//               {events.map((event, index) => (
//                 <Stack
//                   key={index}
//                   direction="row"
//                   spacing={2}
//                   sx={{
//                     p: 1.5,
//                     borderRadius: 1,
//                     backgroundColor: "#f9fafb",
//                     borderLeft: `3px solid ${
//                       event.type === "assignment"
//                         ? "#3B82F6"
//                         : event.type === "exam"
//                         ? "#EF4444"
//                         : event.type === "event"
//                         ? "#10B981"
//                         : "#8B5CF6"
//                     }`,
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       width: 40,
//                       height: 40,
//                       borderRadius: "50%",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       backgroundColor:
//                         event.type === "assignment"
//                           ? "rgba(59, 130, 246, 0.1)"
//                           : event.type === "exam"
//                           ? "rgba(239, 68, 68, 0.1)"
//                           : event.type === "event"
//                           ? "rgba(16, 185, 129, 0.1)"
//                           : "rgba(139, 92, 246, 0.1)",
//                     }}
//                   >
//                     {event.type === "assignment" && (
//                       <Assignment sx={{ color: "#3B82F6" }} />
//                     )}
//                     {event.type === "exam" && (
//                       <School sx={{ color: "#EF4444" }} />
//                     )}
//                     {event.type === "event" && (
//                       <Event sx={{ color: "#10B981" }} />
//                     )}
//                     {event.type === "holiday" && (
//                       <Home sx={{ color: "#8B5CF6" }} />
//                     )}
//                   </Box>
//                   <Box>
//                     <Typography fontWeight={500}>{event.title}</Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Due: {event.date}
//                     </Typography>
//                   </Box>
//                 </Stack>
//               ))}
//             </Stack>
//           </CustomCard>

//           {/* Announcements */}
//           <CustomCard
//             title="Announcements"
//             icon={<Notifications />}
//             sx={{ mt: 3 }}
//           >
//             <Stack
//               spacing={2}
//               sx={{ maxHeight: 300, overflowY: "auto", pr: 1 }}
//             >
//               {announcements.map((announcement, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     p: 2,
//                     borderRadius: 2,
//                     backgroundColor: "#f9fafb",
//                     borderLeft: "3px solid #3B82F6",
//                   }}
//                 >
//                   <Stack direction="row" justifyContent="space-between">
//                     <Typography fontWeight={600}>
//                       {announcement.title}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {announcement.date}
//                     </Typography>
//                   </Stack>
//                   <Typography variant="body2" mt={1}>
//                     {announcement.content}
//                   </Typography>
//                 </Box>
//               ))}
//             </Stack>
//           </CustomCard>

//           {/* Additional Info */}
//           <Grid container spacing={2} sx={{ mt: 2 }}>
//             <Grid item xs={12} md={6}>
//               <CustomCard title="Library" icon={<LibraryBooks />}>
//                 <Typography variant="body2" color="text.secondary">
//                   Books borrowed: 3
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Fines: ₵0.00
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" mt={1}>
//                   Return by: Dec 20
//                 </Typography>
//               </CustomCard>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <CustomCard title="Hostel" icon={<Home />}>
//                 <Typography variant="body2" color="text.secondary">
//                   Room: B-204
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Status: Active
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" mt={1}>
//                   Check-out: May 15, 2024
//                 </Typography>
//               </CustomCard>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default React.memo(Dashboard);
