require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const createError = require('http-errors');
const db = require('./db/DBConnection');
const sessionRoute = require('./routes/sessionRoute');
const termRoute = require('./routes/termRoute');
const gradeRoute = require('./routes/gradeRoute');
const levelRoute = require('./routes/levelRoute');
const subjectRoute = require('./routes/subjectRoute');
const courseRoute = require('./routes/courseRoute');
const studentRoute = require('./routes/studentRoute');
const teacherRoute = require('./routes/teacherRoute');
const parentRoute = require('./routes/parentRoute');
const examinationRoute = require('./routes/examinationRoute');
const feeRoute = require('./routes/feeRoute');
const currentFeeRoute = require('./routes/currentFeeRoute');
const messageRoute = require('./routes/messageRoute');
const eventRoute = require('./routes/eventRoute');
const notificationRoute = require('./routes/notificationRoute');
const userRoute = require('./routes/userRoute');
const attendanceRoute = require('./routes/attendanceRoute');
const verifyJWT = require('./middlewares/verifyJWT');

// initialize express
const app = express();

// server port
const port = process.env.PORT || 8002;
app.disable('x-powered-by')
app.set('view engine', 'ejs');

// middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 })
);

if (process.env.NODE_ENV !== 'production') {
  app.use(logger('dev'));
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 1 * 60 * 60 * 1000, httpOnly: true },
  })
);

//static path
app.use(express.static(path.join(__dirname, 'public')));
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/reports', express.static(path.join(__dirname, 'reports')));

//routes

app.use('/users', userRoute);

app.use(verifyJWT);

app.use('/sessions', sessionRoute);
app.use('/terms', termRoute);
app.use('/students', studentRoute);
app.use('/parents', parentRoute);
app.use('/teachers', teacherRoute);
app.use('/levels', levelRoute);
app.use('/subjects', subjectRoute);
app.use('/courses', courseRoute);
app.use('/grades', gradeRoute);
app.use('/examinations', examinationRoute);
app.use('/fees', feeRoute);
app.use('/current-fees', currentFeeRoute);
app.use('/messages', messageRoute);
app.use('/events', eventRoute);
app.use('/notifications', notificationRoute);
app.use('/attendances', attendanceRoute);

if (process.env.NODE_ENV === 'production') {
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

//error handlers
// app.use((req, res, next) => {
//   next(createError.NotFound());
// });

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);

  if (process.env.NODE_ENV === 'production') {
    res.send('An unknown error has occurred!.');
  } else {
    res.send({
      error: {
        status: err.status || 500,
        message: err.message,
        stack: err.stack,
      },
    });
  }
});

db.asPromise()
  .then(() => {
    app.listen(port, () => console.log(`listening on port ${port}!`));
  })
  .catch((error) => {
    //console.log(error);
    throw error;
  });
