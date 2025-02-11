const router = require('express').Router();
const _ = require('lodash');
const moment = require('moment');
const asyncHandler = require('express-async-handler');
const Attendance = require('../models/attendanceModel');
const Level = require('../models/levelModel');
const {
  Types: { ObjectId },
} = require('mongoose');
const { isWeekend } = require('../config/helper');

//@GET All school Attendance
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const attendance = await Attendance.find({ active: true });
    if (_.isEmpty(attendance)) {
      return res.status(200).json([]);
    }

    res.status(200).json(attendance);
  })
);

//@GET School Attendance History
router.get(
  '/history/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { date } = req.query;
    // //console.log(id, date);
    const attendance = await Attendance.find({
      level: new ObjectId(id),
    });

    // console.log(attendance);
    const modifiedAttendance = attendance.map(({ status, date }) => {
      const present = _.filter(
        status,
        ({ status }) => status === 'Present'
      ).length;
      const absent = _.filter(
        status,
        ({ status }) => status === 'Absent'
      ).length;
      return {
        date,
        present,
        absent,
      };
    });

    const attendanceHistory = _.orderBy(modifiedAttendance, 'date', 'desc');

    res.status(200).json(attendanceHistory);
  })
);
//@GET School Attendance by id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { date } = req.query;



    const attendance = await Attendance.findOne({
      level: new ObjectId(id),
      date,
    });


    if (_.isEmpty(attendance)) {
      //Select students from the level with this id
      const level = await Level.findById(id).populate({
        path: 'students',
        match: { active: true },
      });


      if (isWeekend(new Date(date))) {

        return res.status(200).json({
          level: id,
          date,
          status: [],
        });
      }

      const students = level.students.map((student) => {

        return {
          _id: student?._id,
          fullName: student?.fullName,
          gender: student?.gender,
          status: '',
        };
      });

      const selectedAttendance = {
        level: id,
        date,
        status: students,
      };
      const savedAttendance = await Attendance.create(selectedAttendance);
      return res.status(200).json(savedAttendance);
    }

    res.status(200).json(attendance);
  })
);
//Add new School Attendance
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { date, level } = req.body;

    const attendance = await Attendance.findOneAndUpdate(
      {
        level: new ObjectId(level),
        date: date,
        active: true,
      },
      {
        $set: {
          status: req.body?.status,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    if (_.isEmpty(attendance)) {
      return res
        .status(404)
        .json('Error creating new attendance.Try again later!!!');
    }

    return res.status(201).json('Attendance saved Successfully!!!');
  })
);

//Add new School Attendance
router.post(
  '/student',
  asyncHandler(async (req, res) => {
    const { date, level, status } = req.body;

    const exists = await Attendance.findOne({
      level: new ObjectId(level),
      date: date,
      active: true,
    });

    if (_.isEmpty(exists)) {
      const attendance = {
        level,
        date,
        status: [status],
      };

      await Attendance.create(attendance);

      return res.status(200).json('Attendance Saved!');
    }

    const updatedAttendance = _.values(
      _.merge(_.keyBy([...exists?.status, status], '_id'))
    );

    const attendance = await Attendance.findOneAndUpdate(
      {
        level: new ObjectId(level),
        date: date,
        active: true,
      },
      {
        $set: {
          status: updatedAttendance,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    if (_.isEmpty(attendance)) {
      return res
        .status(404)
        .json('Error creating new attendance.Try again later!!!');
    }

    return res.status(201).json('Attendance saved Successfully!!!');
  })
);

//@PUT Update Existing School Attendance
router.put(
  '/',
  asyncHandler(async (req, res) => {
    const modifiedAttendance = await Attendance.findByIdAndUpdate(
      req.body.id,
      req.body
    );

    if (_.isEmpty(modifiedAttendance)) {
      return res
        .status(404)
        .send('Error updating attendance info.Try again later');
    }

    res
      .status(201)
      .json('Attendance information has been updated successfully!!!');
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deletedAttendance = await Attendance.findByIdAndUpdate(id, {
      $set: {
        active: false,
      },
    });

    if (_.isEmpty(deletedAttendance)) {
      return res
        .status(404)
        .json('Error removing attendance info.Try again later');
    }

    res.status(201).json(' Attendance have been removed successfully!!!');
  })
);

// router.delete(
//   "/:id",
//   asyncHandler(async (req, res) => {
//     const id = req.params.id;
//     const deletedAttendance = await Attendance.findByIdAndDelete(id);

//     if (_.isEmpty(deletedAttendance)) {
//       return res
//         .status(404)
//         .json("Error removing attendance info.Try again later");
//     }

//     res.status(201).json(" Attendance have been removed successfully!!!");
//   })
// );

module.exports = router;
