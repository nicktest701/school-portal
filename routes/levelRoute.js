const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { randomUUID } = require("crypto");
const Level = require('../models/levelModel');
const Examination = require('../models/examinationModel');
const CurrentLevelDetails = require('../models/currentLevelDetailModel');
const CurrentLevel = require('../models/currentLevelModel');
const Teacher = require('../models/teacherModel');
// const Teacher = require('../models/teacherModel');
const _ = require('lodash');
const moment = require('moment');
const {
  Types: { ObjectId },
} = require('mongoose');

const LEVEL_OPTIONS = [
  'Day Care',
  'Creche',
  'Nursery 1',
  'Nursery 2',
  'Kindergarten 1',
  'Kindergarten 2',
  'Basic 1',
  'Basic 2',
  'Basic 3',
  'Basic 4',
  'Basic 5',
  'Basic 6',
  'Basic 7',
  'Basic 8',
  'Basic 9',
  'Basic 10',
  'Basic 11',
  'Basic 12',
  'J.H.S 1',
  'J.H.S 2',
  'J.H.S 3',
];

//@GET all current level by current school session
router.get(
  '/session',
  asyncHandler(async (req, res) => {
    const { session, term } = req.query;
    const levels = await Level.find({
      session: new ObjectId(session),
      term: new ObjectId(term),
      active: true,
    }).populate({
      path: 'students',
      match: { active: true },
    });

   

    const modifiedLevels = levels.sort(
      (a, b) =>
        LEVEL_OPTIONS.indexOf(a?.level?.name) -
        LEVEL_OPTIONS.indexOf(b?.level?.name)
    );

    res.status(200).json(modifiedLevels);
  })
);

//Get dashboard info
router.get(
  '/dashboard-info',
  asyncHandler(async (req, res) => {
    const { session, term } = req.query;

    //No of teachers
    const noOfTeachers = await Teacher.find().count();

    //No of levels
    const levels = await Level.find({
      session: new ObjectId(session),
      term: new ObjectId(term),
    }).populate({
      path: 'students',
      match: { active: true },
    });

    if (_.isEmpty(levels)) {
      const dashboardInfo = {
        teachers: noOfTeachers,
        levels: 0,
        courses: 0,
        students: 0,
      };

      return res.status(200).json(dashboardInfo);
    }

    //No of Levels
    const noOfLevels = levels.length;

    // No of Subjects
    const noOfSubjects = _.flatMap(_.map(levels, 'subjects')).length;

    // No of Students
    const noOfStudents = _.flatMap(_.map(levels, 'students')).length;

    const dashboardInfo = {
      teachers: noOfTeachers,
      levels: noOfLevels,
      courses: noOfSubjects,
      students: noOfStudents,
    };

    res.status(200).json(dashboardInfo);
  })
);
//@GET all current level by current school session
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const id = req.query.id;
    const level = await Level.findById(id).populate({
      path: 'students',
      match: { active: true },
    });

    if (level.students?.length !== 0) {
      const modifiedStudents = level?.students.map((student) => {
        return {
          ...student?._doc,
          fullName: student.fullName,
          levelId: id,
          levelName: `${level.level?.name}${level.level?.type}`,
        };
      });

      const modifiedLevel = {
        ...level?._doc,
        students: modifiedStudents,
      };
      // //console.log(modifiedLevel);
      return res.status(200).json(modifiedLevel);
    }

    res.status(200).json(level);
  })
);

//@GET all current subjects by level id
router.get(
  '/subject',
  asyncHandler(async (req, res) => {
    const levelId = req.query.levelId;
    //console.log(levelId);
    const subjects = await Level.findById(levelId).select('subjects grades');
    // console.log(subjects);

    res.status(200).json(subjects);
  })
);

//@GET all current level by current school session
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const levels = await Level.findById(id);
    res.status(200).json(levels);
  })
);

router.post(
  '/students/all',
  asyncHandler(async (req, res) => {
    const { sessionId, termId } = req.body;

    const AllStudents = await Level.find({
      session: new ObjectId(sessionId),
      term: new ObjectId(termId),
    })
      .populate('level')
      .populate({
        path: 'students',
        match: { active: true },
      });

    if (_.isEmpty(AllStudents)) {
      return res.status(200).json([]);
    }

    const modifiedStudents = AllStudents.flatMap(({ _id, students, level }) => {
      return students.map((student) => {
        return {
          ...student._doc,
          fullName: student.fullName,
          levelId: _id,
          levelName: `${level?.name}${level.type}`,
        };
      });
    });

    res.status(200).json(modifiedStudents);
  })
);



//Generate next term level details if not exists
router.post(
  '/generate',
  asyncHandler(async (req, res) => {
    const { sessionId, termId } = req.body;

    //FInd if current level exists
    const currentLevels = await Level.find({
      session: new ObjectId(sessionId),
      term: new ObjectId(termId),
    });

    if (!_.isEmpty(currentLevels)) {
      return res.status(200).json([]);
    }

    //find prevoius levels
    //FInd if levels exists
    const levels = await Level.find({
      session: new ObjectId(sessionId),
    });

    if (_.isEmpty(levels)) {
      return res.status(200).json([]);
    }

    //GET all existing students
    const previousLevels = await Level.find({
      session: new ObjectId(sessionId),
    }).populate({
      path: 'students',
      match: { active: true },
    });

    const selectedLevels = previousLevels.map(
      ({ level, subjects, students, grades }) => {
        return {
          level,
          subjects,
          students,
          grades,
          levelName: `${level.name}${level.type}`,
        };
      }
    );

    // //Merge all levels with same name
    const mergedLevels = _.values(
      _.merge(_.keyBy(selectedLevels, 'levelName'))
    );

    //GENERATE New Level info
    const students = mergedLevels.map(
      ({ level, subjects, students, grades }) => {
        return {
          session: new ObjectId(sessionId),
          term: new ObjectId(termId),
          level,
          subjects,
          grades,
          students: _.uniqWith(students, _.isEqual),
          rollNumber: students?.length || 0,
          attendance: 0,
        };
      }
    );

    //ADD Students to new class
    const newLevels = await Level.insertMany(students);

    //GENERATE examination info of students
    const newStudents = newLevels.flatMap(({ _id, students }) => {
      return students.map((student) => {
        return {
          session: sessionId,
          term: termId,
          level: _id,
          student: student?._id,
          scores: [],
          overallScore: 0,
          comments: {},
        };
      });
    });

    await Examination.insertMany(newStudents);

    res.sendStatus(201);
  })
);

//@POST add new level to current school session
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const newLevel = req.body;

    // //console.log(newLevel);

    const level = await Level.create(newLevel);

    if (_.isEmpty(level)) {
      return res.status(404).json('Error creating new levels.Try again later');
    }

    res.status(201).json('New Level created successfully!!!');
  })
);

router.put(
  '/',
  asyncHandler(async (req, res) => {
    const updatedLevel = req.body;
    const level = await Level.findByIdAndUpdate(
      updatedLevel._id,
      {
        $set: {
          level: updatedLevel?.level,
          teacher: updatedLevel?.teacher,
        },
      },
      {
        new: true,
      }
    );

    if (_.isEmpty(level)) {
      return res.status(404).json('Error updating level info.Try again later');
    }

    res.status(201).json('Level details updated successfully!!!');
  })
);

router.put(
  '/grade',
  asyncHandler(async (req, res) => {
    const { levels, grade } = req.body;

    const level = await Level.updateMany(
      {
        _id: {
          $in: levels,
        },
      },
      {
        $set: {
          grades: grade,
        },
      },
      {
        new: true,
      }
    );

    if (_.isEmpty(level)) {
      return res.status(404).json('Error assigning grades.Try again later');
    }

    res.status(201).json('Grades Assigned Successfully!!!');
  })
);

router.delete(
  '/',
  asyncHandler(async (req, res) => {
    const { sessionId, termId, id } = req.query;
    const deletedLevel = await Level.findByIdAndRemove(id);

    if (_.isEmpty(deletedLevel)) {
      return res.status(404).json('Error removing level info.Try again later');
    }
    await CurrentLevelDetails.findOneAndUpdate(
      {
        session: new ObjectId(sessionId),
        term: new ObjectId(termId),
        level: new ObjectId(id),
      },
      {
        $set: {
          active: false,
        },
      }
    );

    await CurrentLevel.findOneAndUpdate(
      {
        session: new ObjectId(sessionId),
        term: new ObjectId(termId),
        level: new ObjectId(id),
      },
      {
        $set: {
          active: false,
        },
      }
    );

    res.status(201).json(' Level has been removed successfully!!!');
  })
);

//@GET all current level by current level id
router.get(
  '/previous',
  asyncHandler(async (req, res) => {
    const { sessionId, termId } = req.query;
    const previousLevels = await Level.find({
      session: new ObjectId(sessionId),
      term: new ObjectId(termId),
    })
      .select('level')
      .populate({
        path: 'students',
        match: { active: true },
      });

    res.status(200).json(previousLevels);
  })
);

// router.delete(
//   "/",
//   asyncHandler(async (req, res) => {
//     const { sessionId, termId, id } = req.query;
//     const deletedLevel = await Level.findByIdAndRemove(id);

//     if (_.isEmpty(deletedLevel)) {
//       return res.status(404).json("Error removing level info.Try again later");
//     }
//     await CurrentLevelDetails.findOneAndRemove({
//       session: new ObjectId(sessionId),
//       term: new ObjectId(termId),
//       level: new ObjectId(id),
//     });

//     await CurrentLevel.findOneAndRemove({
//       session: new ObjectId(sessionId),
//       term: new ObjectId(termId),
//       level: new ObjectId(id),
//     });

//     res.status(201).json(" Level has been removed successfully!!!");
//   })
// );

router.post(
  '/delete/many',
  asyncHandler(async (req, res) => {
    const ids = req.body.ids;
    const deletedLevels = await Level.deleteMany(ids);

    if (_.isEmpty(deletedLevels)) {
      return res.status(404).json('Error removing levels info.Try again later');
    }

    res.status(201).json(' Levels have been removed successfully!!!');
  })
);

////////////......................SUBJECTS........................\\\\\\\\\\\\\\

//@POST add new subjects to current level

router.put(
  '/subject',
  asyncHandler(async (req, res) => {
    const { levelId, subjects } = req.body;
    const newSubjects = await Level.findByIdAndUpdate(levelId, {
      subjects,
    });
    if (_.isEmpty(newSubjects)) {
      return res
        .status(404)
        .send('Error creating new Subjects.Try again later');
    }

    res.status(201).json('New Courses Added !!!');
  })
);

//@GET Teacher current level
router.post(
  '/assign-teacher',
  asyncHandler(async (req, res) => {
    const { sessionId, termId, teacher } = req.body;

    const level = await Level.findOne({
      session: new ObjectId(sessionId),
      term: new ObjectId(termId),
      teacher: {
        _id: teacher,
      },
    }).populate('level');

    const modifiedLevel = {
      _id: level?._id || '',
      type: `${level?.level?.name}${level?.level?.type}` || '',
    };

    res.status(200).json(modifiedLevel);
  })
);

//@PUT Assign a Teacher
router.put(
  '/assign-teacher',
  asyncHandler(async (req, res) => {
    const level = await Level.findByIdAndUpdate(
      req.body._id,
      {
        $set: {
          teacher: req.body.teacher,
        },
      },
      {
        new: true,
      }
    );

    if (_.isEmpty(level)) {
      return res.status(404).json('Error assigning Level.Try again later');
    }

    res.status(201).json('Level has been assigned successfully!!!');
  })
);

router.put(
  '/unassign-teacher',
  asyncHandler(async (req, res) => {
    const id = req.query.id;
    const level = await Level.findByIdAndUpdate(
      id,
      {
        $set: {
          teacher: null,
        },
      },
      {
        new: true,
      }
    );

    if (_.isEmpty(level)) {
      return res.status(404).json('Error updating info.Try again later');
    }

    res.status(201).json('Changes Saved!!!');
  })
);

// Birthdays

router.get(
  '/recent/birthday',
  asyncHandler(async (req, res) => {
    const { session, term } = req.query;

    const students = await Level.find({
      session: new ObjectId(session),
      term: new ObjectId(term),
    })
      .populate({
        path: 'students',
        match: { active: true },
      })
      .select('students');

    if (_.isEmpty(students)) {
      return res.status(404).json([]);
    }

    const birthdays = students.flatMap((student) => {
      return student.students?.filter(({ dateofbirth }) => {
        return (
          moment(new Date(dateofbirth)).format('Do MMMM') ===
          moment().format('Do MMMM')
        );
      });
    });

    const bds = birthdays.map((student) => {
      return {
        _id: student?._id,
        profile: student?.profile,
        fullname: student?.fullName,
        dob: student?.dateofbirth,
      };
    });

    res.status(200).json(bds);
  })
);

module.exports = router;
