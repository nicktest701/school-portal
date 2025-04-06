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
const { processWeeklyAttendance, getTotalAttendance, getAttendanceByGender } = require('../config/helper');

//@GET All school courses
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const courses = await Course.find({
      school: req.user.school,
    });
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
      // school: req.user.school,
      session: new ObjectId(session),
      term: new ObjectId(term),
      teacher: new ObjectId(teacher),
    }).countDocuments();

    //Get levels assigned to teacher
    const levels = await Level.find({
      session: new ObjectId(session),
      term: new ObjectId(term),
      teacher: teacher
    })
      .select(['teacher', 'level'])
      .populate({
        path: 'students',
        match: { active: true },
      });

    //Get total students in each level
    const studentInEachLevel = levels.map((level) => {
      return {
        level: level?.levelName,
        students: level?.students?.length || 0
      };
    });

    // find males and females
    const totalStudents = levels.flatMap(({ students }) => students);
    const groupedStudents = _.groupBy(totalStudents, 'gender');

    // const attendances=await Attendance.find({
    //   level: level?._id,
    // })

    //Get attendance for today
    const attendances = levels.flatMap(async (level) => {
      const attendance = await Attendance.find({
        level: new ObjectId(level?._id),
      })
        .populate({
          path: 'level', select: 'level'
        })
        .select(['date', 'status']);

      const data = attendance.map(at => {
        return {
          level: level?.levelName,
          date: at?.date,
          status: at?.status
        }
      })

      return data
    });

    const allAttendances = await Promise.all(attendances)
    // console.log(allAttendances)

    const modifiedAttendance = _.flatMap(allAttendances)
    const totalAttendance = getTotalAttendance(modifiedAttendance)
    const genderAttendance = getAttendanceByGender(modifiedAttendance)

    const weeklyAttendances = processWeeklyAttendance(modifiedAttendance)
 
    

    const dashboardInfo = {
      courses: courses ?? 0,
      levels: levels?.length,
      students: totalStudents?.length,
      studentInEachLevel: studentInEachLevel,
      groupedStudents:
        groupedStudents !== undefined
          ? groupedStudents
          : { male: [], female: [] },
      present: totalAttendance.Present,
      absent: totalAttendance?.Absent,
      unknown: totalAttendance?.Unknown,
      weeklyAttendances,
      genderAttendance
    };
    res.status(200).json(dashboardInfo);
  })
);

//@GET School Course by teacher
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
      .populate("subject");

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
    const course = await Course.findById(req.params.id).populate("subject");
    res.status(200).json(course);
  })
);

//Add new School Course
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { subject, level, term, session } = req.body
    const courses = await Course.find({
      session,
      term,
      level,
      subject,
    })

    if (!_.isEmpty(courses)) {
      return res.status(400).json('Course already assigned to teacher');
    }

    //Create new Course
    const course = await Course.create({ ...req.body, school: req.user.school, });

    if (!course) {
      return res.status(404).json('Error creating new course.Try again later');
    }
    //console.log(course);
    res.status(201).json('New Course assigned!');
  })
);

//@PUT Update Existing School Course
router.put(
  '/',
  asyncHandler(async (req, res) => {
    const { id, ...rest } = req.body;
    const modifiedCourse = await Course.findByIdAndUpdate(
      id,
      {
        $set: {
          ...rest
        }
      }
    );

    if (!modifiedCourse) {
      return res.status(404).json('Error updating course info.Try again later');
    }

    res.json(modifiedCourse);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    await Course.findByIdAndDelete(id);

    res.status(204).json('Course Removed!');
  })
);

module.exports = router;
