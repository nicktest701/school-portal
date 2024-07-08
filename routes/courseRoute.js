const router = require('express').Router();
const _ = require('lodash');
const asyncHandler = require('express-async-handler');
const Course = require('../models/courseModel');
const Level = require('../models/levelModel');
const Attendance = require('../models/attendanceModel');
const {
  Types: { ObjectId },
} = require('mongoose');
const moment = require('moment/moment');

//@GET All school courses
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const courses = await Course.find();
    res.status(200).json(courses);
  })
);

//@GET All school courses
router.get(
  '/dashboard',
  asyncHandler(async (req, res) => {
    const { session, term, teacher } = req.query;

    //Get course assigned to teacher
    const courses = await Course.find({
      session: new ObjectId(session),
      term: new ObjectId(term),
      teacher: new ObjectId(teacher),
    }).countDocuments();

    const levels = await Level.find({
      session: new ObjectId(session),
      term: new ObjectId(term),
    })
      .select(['teacher', 'students', 'level'])
      .populate({
        path: 'students',
        match: { active: true },
      });

    //Get levels assigned to teacher
    const teacherLevel = levels.filter(
      (level) => level?.teacher?._id === teacher
    );

    //Get total students in each level
    const studentInEachLevel = teacherLevel.map((level) => {
      return {
        level: level?.levelName,
        students: level?.students?.length,
      };
    });

    // find males and females
    const totalStudents = teacherLevel.flatMap(({ students }) => students);
    const groupedStudents = _.groupBy(totalStudents, 'gender');

    //Get attendance for today
    const attendance = teacherLevel.flatMap(async (level) => {
      const attendance = await Attendance.findOne({
        level: new ObjectId(level?._id),
        date: moment().format('L'),
      }).select('status');
      if (attendance === null) return [];
      return attendance?.status;
    });

    const a = await Promise.all(attendance);

    const groupedAttendance = _.groupBy(_.flatMap(a), 'status');

    //Get attendance for today
    const weeklyAttendance = teacherLevel.map(async (level) => {
      const attendance = await Attendance.find({
        level: new ObjectId(level?._id),
      });
      if (attendance === null || attendance === undefined) return [];
      return attendance;
    });

    const week = await Promise.all(weeklyAttendance);

    //Group attendance into present and absent
    const weeklyGroup = week?.flatMap((att) => {
      return _.sortBy(att, 'date').map((at) => {
        const group = _.groupBy(at?.status, 'status');

        return {
          date: at?.date,
          present: group?.Present?.length ?? 0,
          absent: group?.Absent?.length ?? 0,
        };
      });
    });

    const groupedByDate = _.groupBy(weeklyGroup, 'date');
    const groupedWeeklyAttendance = Object.values(groupedByDate).map(
      (value) => {
        return {
          date: moment(new Date(value[0]?.date)).format('ddd, Do MMM'),
          present: _.sumBy(value, 'present'),
          absent: _.sumBy(value, 'absent'),
        };
      }
    );
   

    // console.log(_.values(_.merge(_.keyBy(weeklyGroup, 'date'))));

    const dashboardInfo = {
      courses: courses ?? 0,
      levels: teacherLevel?.length,
      students: totalStudents?.length,
      studentInEachLevel: studentInEachLevel,
      groupedStudents:
        groupedStudents !== undefined
          ? groupedStudents
          : { male: [], female: [] },
      present: groupedAttendance?.Present?.length,
      absent: groupedAttendance?.Absent?.length,
      unknown: groupedAttendance?.['']?.length,
      groupedWeeklyAttendance,
    };
    res.status(200).json(dashboardInfo);
  })
);

//@GET School Course by id
router.get(
  '/teacher',
  asyncHandler(async (req, res) => {
    const { session, term, teacher } = req.query;

    const courses = await Course.find({
      session: new ObjectId(session),
      term: new ObjectId(term),
      teacher: new ObjectId(teacher),
    })
      .populate('level')
      .select('subject');

    if (_.isEmpty(courses)) {
      return res.status(200).send([]);
    }

    const modifiedCourses = courses.map(({ _id, level, subject }) => {
      return {
        _id,
        subject,
        levelId: level?._id,
        level: level?.levelName,
        students: level?.students?.length,
      };
    });

    res.status(200).json(modifiedCourses);
  })
);

//@GET School Course by id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);
    res.status(200).json(course);
  })
);

//Add new School Course
router.post(
  '/',
  asyncHandler(async (req, res) => {
    //Create new Course
    const course = await Course.create(req.body);
    if (!course) {
      return res.status(404).send('Error creating new course.Try again later');
    }
    //console.log(course);
    res.status(201).send('New Course assigned!');
  })
);

//@PUT Update Existing School Course
router.put(
  '/',
  asyncHandler(async (req, res) => {
    const modifiedCourse = await Course.findByIdAndUpdate(
      req.body.id,
      req.body
    );

    if (!modifiedCourse) {
      return res.status(404).send('Error updating course info.Try again later');
    }

    res.send(modifiedCourse);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    await Course.findByIdAndRemove(id);

    res.send(204).send('Course Removed!');
  })
);

module.exports = router;
