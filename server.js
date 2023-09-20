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
const levelRoute = require('./routes/levelRoute');
const studentRoute = require('./routes/studentRoute');
const teacherRoute = require('./routes/teacherRoute');
const parentRoute = require('./routes/parentRoute');
const examinationRoute = require('./routes/examinationRoute');
const feeRoute = require('./routes/feeRoute');
const currentFeeRoute = require('./routes/currentFeeRoute');
const messageRoute = require('./routes/messageRoute');
const userRoute = require('./routes/userRoute');
const attendanceRoute = require('./routes/attendanceRoute');

// initialize express
const app = express();

// server port
const port = process.env.PORT || 8000;

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

//routes
// app.use("/user", userRoute);
app.use('/sessions', sessionRoute);
app.use('/terms', termRoute);
app.use('/users', userRoute);
app.use('/students', studentRoute);
app.use('/parents', parentRoute);
app.use('/teachers', teacherRoute);
app.use('/levels', levelRoute);
app.use('/examinations', examinationRoute);
app.use('/fees', feeRoute);
app.use('/current-fees', currentFeeRoute);
app.use('/messages', messageRoute);
app.use('/attendances', attendanceRoute);

// if (process.env.NODE_ENV === 'production') {
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// }

//error handlers
app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

db.asPromise()
  .then(() => {
    app.listen(port, () => console.log(`listening on port ${port}!`));
  })
  .catch((error) => {
    //console.log(error);
    throw error;
  });
