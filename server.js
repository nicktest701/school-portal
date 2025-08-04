// require("dotenv").config();
// const express = require("express");
// const logger = require("morgan");
// const cors = require("cors");
// const path = require("path");
// const fs = require("fs");
// const asyncHandler = require("express-async-handler");
// const cookieParser = require("cookie-parser");
// const session = require("express-session");
// const createError = require("http-errors");
// const db = require("./db/DBConnection");
// const schoolRoute = require("./routes/schoolRoute");
// const sessionRoute = require("./routes/sessionRoute");
// const termRoute = require("./routes/termRoute");
// const gradeRoute = require("./routes/gradeRoute");
// const levelRoute = require("./routes/levelRoute");
// const subjectRoute = require("./routes/subjectRoute");
// const courseRoute = require("./routes/courseRoute");
// const studentRoute = require("./routes/studentRoute");
// const studentAuthRoute = require("./routes/studentAuthRoute");
// const teacherRoute = require("./routes/teacherRoute");
// const parentRoute = require("./routes/parentRoute");
// const examinationRoute = require("./routes/examinationRoute");
// const feeRoute = require("./routes/feeRoute");
// const currentFeeRoute = require("./routes/currentFeeRoute");
// const messageRoute = require("./routes/messageRoute");
// const eventRoute = require("./routes/eventRoute");
// const announcementRoute = require("./routes/announcementRoute");
// const notificationRoute = require("./routes/notificationRoute");
// const holidayRoute = require("./routes/holidayRoute");
// const noteRoute = require("./routes/noteRoute");
// const userRoute = require("./routes/userRoute");
// const attendanceRoute = require("./routes/attendanceRoute");
// const { verifyJWT } = require("./middlewares/verifyJWT");

// // initialize express
// const app = express();

// // server port
// const port = process.env.PORT || 8002;
// app.disable("x-powered-by");
// app.set("view engine", "ejs");

// const whitelist = [
//   "http://192.168.0.175:3000",
//   "http://localhost:3000",
//   "http://127.0.0.1:3000",
//   "http://192.168.0.175:3001",
//   "http://localhost:3001",
//   "http://127.0.0.1:3001",
//   "http://192.168.0.175:8002",
//   "http://localhost:8002",
//   "http://127.0.0.1:8002",
//   "https://52.41.36.82:10000",
//   "https://54.191.253.12:10000",
//   "https://44.226.122.3:10000",
//   "https://school-portal-aivn.onrender.com",
//   "https://school-portal-aivn.onrender.com/*",
//   "https://school-portal-chi.vercel.app",
//   "https://school-portal-chi.vercel.app/*",
//   "https://vercel.com/nicktest701s-projects/school-portal/DKVdBYdzULv2q6tLYarAWtoWuFTn",
//   "https://school-portal-nicktest701s-projects.vercel.app",
//   "https://school-portal-git-main-nicktest701s-projects.vercel.app",

//   process.env.CLIENT_URL,
// ];
// const corsOptions = {
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
//   allowedHeaders: [
//     "Origin",
//     "X-Requested-With",
//     "Content-Type",
//     "Accept",
//     "Authorization",
//     "X-PINGOTHER",
//     "Referer",
//     // "x-token",
//   ],
//   credentials: true,
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(createError.NotFound("Not available"));
//     }
//   },
// };

// // middlewares
// app.use(cookieParser());
// app.use(cors(corsOptions));
// app.disable("x-powered-by");
// app.use(express.json({ limit: "50mb" }));
// app.use(
//   express.urlencoded({ limit: "50mb", extended: false, parameterLimit: 50000 })
// );

// if (process.env.NODE_ENV !== "production") {
//   app.use(logger("dev"));
// }

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true, maxAge: 1 * 60 * 60 * 1000, httpOnly: true },
//   })
// );

// //static path
// app.use(express.static(path.join(__dirname, "public")));
// app.use("/api/frebbys/v1/views", express.static(path.join(__dirname, "views")));
// app.use(
//   "/api/frebbys/v1/images",
//   express.static(path.join(__dirname, "images"))
// );
// app.use(
//   "/api/frebbys/v1/reports",
//   express.static(path.join(__dirname, "reports"))
// );
// app.use(
//   "/api/frebbys/v1/templates",
//   express.static(path.join(__dirname, "templates"))
// );

// //routes

// app.use("/api/frebbys/v1/users", userRoute);
// app.use("/api/frebbys/v1/schools", schoolRoute);
// app.use("/api/frebbys/v1/student-auth", studentAuthRoute);

// app.use(verifyJWT);
// app.use("/api/frebbys/v1/sessions", sessionRoute);
// app.use("/api/frebbys/v1/terms", termRoute);
// app.use("/api/frebbys/v1/students", studentRoute);
// app.use("/api/frebbys/v1/parents", parentRoute);
// app.use("/api/frebbys/v1/teachers", teacherRoute);
// app.use("/api/frebbys/v1/levels", levelRoute);
// app.use("/api/frebbys/v1/subjects", subjectRoute);
// app.use("/api/frebbys/v1/courses", courseRoute);
// app.use("/api/frebbys/v1/grades", gradeRoute);
// app.use("/api/frebbys/v1/examinations", examinationRoute);
// app.use("/api/frebbys/v1/fees", feeRoute);
// app.use("/api/frebbys/v1/current-fees", currentFeeRoute);
// app.use("/api/frebbys/v1/messages", messageRoute);
// app.use("/api/frebbys/v1/events", eventRoute);
// app.use("/api/frebbys/v1/notifications", notificationRoute);
// app.use("/api/frebbys/v1/attendances", attendanceRoute);
// app.use("/api/frebbys/v1/announcements", announcementRoute);
// app.use("/api/frebbys/v1/holidays", holidayRoute);
// app.use("/api/frebbys/v1/notes", noteRoute);

// // /airtime/template
// app.get(
//   "/api/frebbys/v1/template",
//   asyncHandler(async (req, res) => {
//     const template = req.query?.name || "students";
//     const filePath = path.join(
//       process.cwd(),
//       "/templates/",
//       `${template}.xlsx`
//     );

//     if (fs.existsSync(filePath)) {
//       return res.sendFile(filePath);
//     } else {
//       return res.sendStatus(204);
//     }
//   })
// );

// // if (process.env.NODE_ENV === 'production') {
// //   app.get('/*', function (req, res) {
// //     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// //   });
// // }

// //error handlers
// // app.use((req, res, next) => {
// //   next(createError.NotFound());
// // });

// app.use((err, req, res, next) => {
//   console.log(err);
//   // res.status(err.status || 500);
//   const errorStatus = err.status || 500;

//   if (process.env.NODE_ENV === "production") {
//     res.status(errorStatus).json("An unknown error has occurred!.");
//   } else {
//     res.status(errorStatus).json({
//       status: errorStatus,
//       message: err.message,
//       stack: err.stack,
//     });
//   }
// });

// db.asPromise()
//   .then(() => {
//     app.listen(port, () => console.log(`listening on port ${port}!`));
//   })
//   .catch((error) => {
//     console.log(error);
//     // throw error;
//   });

// process.on("uncaughtException", (err) => {
//   console.error("Unhandled Exception:", err);
// });

// process.on("unhandledRejection", (reason, promise) => {
//   console.error("Unhandled Rejection:", reason);
// });

require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const createError = require("http-errors");
const rateLimit = require("express-rate-limit");
const db = require("./db/DBConnection");

// Route imports
const schoolRoute = require("./routes/schoolRoute");
const sessionRoute = require("./routes/sessionRoute");
const termRoute = require("./routes/termRoute");
const gradeRoute = require("./routes/gradeRoute");
const levelRoute = require("./routes/levelRoute");
const subjectRoute = require("./routes/subjectRoute");
const courseRoute = require("./routes/courseRoute");
const studentRoute = require("./routes/studentRoute");
const studentAuthRoute = require("./routes/studentAuthRoute");
const teacherRoute = require("./routes/teacherRoute");
const parentRoute = require("./routes/parentRoute");
const examinationRoute = require("./routes/examinationRoute");
const feeRoute = require("./routes/feeRoute");
const currentFeeRoute = require("./routes/currentFeeRoute");
const messageRoute = require("./routes/messageRoute");
const eventRoute = require("./routes/eventRoute");
const announcementRoute = require("./routes/announcementRoute");
const notificationRoute = require("./routes/notificationRoute");
const holidayRoute = require("./routes/holidayRoute");
const noteRoute = require("./routes/noteRoute");
const userRoute = require("./routes/userRoute");
const attendanceRoute = require("./routes/attendanceRoute");
const { verifyJWT } = require("./middlewares/verifyJWT");

// Initialize express
const app = express();

// Server port
const port = process.env.PORT || 8002;

// Security headers
app.use(
  helmet({
    // contentSecurityPolicy: {
    //   directives: {
    //     defaultSrc: ["'self'"],
    //     scriptSrc: ["'self'", "'unsafe-inline'", "trusted-cdn.com"],
    //     styleSrc: ["'self'", "'unsafe-inline'"],
    //     imgSrc: ["'self'", "data:"],
    //     connectSrc: ["'self'", process.env.CLIENT_URL],
    //   },
    // },
    // crossOriginResourcePolicy: { policy: "same-site" },

    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// View engine setup
app.set("view engine", "ejs");
app.disable("x-powered-by");

// CORS configuration
const whitelist = process.env.CORS_WHITELIST
  ? process.env.CORS_WHITELIST.split(",")
  : [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://school-portal-aivn.onrender.com",
      "https://school-portal-chi.vercel.app",
    ];

const corsOptions = {
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "Referer",
  ],
  credentials: true,
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(createError.Forbidden("Origin not allowed by CORS policy"));
    }
  },
};

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later",
});

// Middlewares
app.use(cors(corsOptions));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// Session configuration
const sessionConfig = {
  name: "refresh_token",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    domain:
      process.env.NODE_ENV === "production"
        ? ".vercel.app" // Leading dot for subdomains
        : undefined, // Localhost works without domain
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "none", // Cross-site allowed
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
};

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // Trust first proxy
  sessionConfig.cookie.sameSite = "none";
}

app.use(session(sessionConfig));

// Logging
if (process.env.NODE_ENV !== "production") {
  app.use(logger("dev"));
} else {
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }
  );
  app.use(logger("combined", { stream: accessLogStream }));
}

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/frebbys/v1/views", express.static(path.join(__dirname, "views")));
app.use(
  "/api/frebbys/v1/images",
  express.static(path.join(__dirname, "images"))
);
app.use(
  "/api/frebbys/v1/reports",
  express.static(path.join(__dirname, "reports"))
);
app.use(
  "/api/frebbys/v1/templates",
  express.static(path.join(__dirname, "templates"))
);

// Apply rate limiting to all routes
// app.use(apiLimiter);

// Public routes
app.use("/api/frebbys/v1/users", userRoute);
app.use("/api/frebbys/v1/schools", schoolRoute);
app.use("/api/frebbys/v1/student-auth", studentAuthRoute);

// Protected routes (require JWT)
app.use(verifyJWT);
app.use("/api/frebbys/v1/sessions", sessionRoute);
app.use("/api/frebbys/v1/terms", termRoute);
app.use("/api/frebbys/v1/students", studentRoute);
app.use("/api/frebbys/v1/parents", parentRoute);
app.use("/api/frebbys/v1/teachers", teacherRoute);
app.use("/api/frebbys/v1/levels", levelRoute);
app.use("/api/frebbys/v1/subjects", subjectRoute);
app.use("/api/frebbys/v1/courses", courseRoute);
app.use("/api/frebbys/v1/grades", gradeRoute);
app.use("/api/frebbys/v1/examinations", examinationRoute);
app.use("/api/frebbys/v1/fees", feeRoute);
app.use("/api/frebbys/v1/current-fees", currentFeeRoute);
app.use("/api/frebbys/v1/messages", messageRoute);
app.use("/api/frebbys/v1/events", eventRoute);
app.use("/api/frebbys/v1/notifications", notificationRoute);
app.use("/api/frebbys/v1/attendances", attendanceRoute);
app.use("/api/frebbys/v1/announcements", announcementRoute);
app.use("/api/frebbys/v1/holidays", holidayRoute);
app.use("/api/frebbys/v1/notes", noteRoute);

// Template download route
app.get(
  "/api/frebbys/v1/template",
  asyncHandler(async (req, res) => {
    const template = req.query?.name || "students";
    const safeTemplate = path.basename(template); // Prevent directory traversal
    const filePath = path.join(__dirname, "templates", `${safeTemplate}.xlsx`);

    if (!fs.existsSync(filePath)) {
      throw createError.NotFound("Template not found");
    }
    res.sendFile(filePath);
  })
);

// Health check endpoint
app.get("/api/frebbys/v1/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

// 404 Handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// Global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "An unexpected error occurred"
      : err.message;

  if (process.env.NODE_ENV !== "test") {
    console.error(`[${new Date().toISOString()}] ${err.stack || err}`);
  }

  res.status(status).json({
    status: "error",
    statusCode: status,
    message,
  });
});

// Database connection and server startup
db.asPromise()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    // Graceful shutdown
    const shutdown = (signal) => {
      console.log(`${signal} received: shutting down server`);
      server.close(() => {
        console.log("HTTP server closed");
        db.closeConnection();
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });

// Handle uncaught exceptions and rejections
process.on("uncaughtException", (err) => {
  console.error("Unhandled Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});
