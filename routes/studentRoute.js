const router = require('express').Router();
const { randomUUID } = require('crypto');
const AsyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const {
  Types: { ObjectId },
} = require('mongoose');
const _ = require('lodash');
const multer = require('multer');
const Level = require('../models/levelModel');
const Student = require('../models/studentModel');
const Parent = require('../models/parentModel');
const Examination = require('../models/examinationModel');
const CurrentFee = require('../models/currentFeeModel');
const Fee = require('../models/feeModel');
const verifyJWT = require('../middlewares/verifyJWT');

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images/students/');
  },
  filename: function (req, file, cb) {
    const ext = file?.originalname?.split('.')[1];

    cb(null, `${randomUUID()}.${ext}`);
  },
});
const upload = multer({ storage: Storage });

router.use(verifyJWT);

//@GET All students
router.get(
  '/',
  AsyncHandler(async (req, res) => {
    const students = await Student.find({});
    res.json(students);
  })
);

//@GET student by student id
router.post(
  '/current',
  AsyncHandler(async (req, res) => {
    const { levelId, levelName, studentId } = req.body;

    const student = await Student.findById(studentId);

    if (_.isEmpty(student)) {
      return res.json('No Such Student exists');
    }

    const modifiedStudent = {
      ...student?._doc,
      fullName: _.startCase(
        `${student?.surname} ${student?.firstname} ${student?.othername}`
      ),
      levelId,
      levelName,
    };
    res.status(200).json(modifiedStudent);
  })
);

//@GET All students
router.get(
  '/',
  AsyncHandler(async (req, res) => {
    const students = await Student.find({});
    res.json(students);
  })
);

//@GET All students
router.get(
  '/details',
  AsyncHandler(async (req, res) => {
    const { sessionId, termId } = req.query;

    const allLevels = await Level.find({
      session: new ObjectId(sessionId),
    })
      .populate({
        path: 'students',
        match: { active: true },
      })
      .populate('term')
      .select('level students');

    if (_.isEmpty(allLevels)) {
      return res.status(200).json({
        recentStudents: [],
        noOfStudentsInEachLevel: [],
        noOfStudentsForEachTerm: [],
        students: 0,
        males: 0,
        females: 0,
      });
    }

    //group students into terms
    const groupedLevels = _.groupBy(allLevels, 'term.term');

    const groupedTerms = Object.values(groupedLevels).map((level) => {
      return level.flatMap(({ term: { term, academicYear }, students }) => {
        return {
          academicYear,
          term,
          noOfStudents: students.length,
        };
      });
    });

    //No of students for each term
    const noOfStudents = groupedTerms.map((term) => {
      return {
        academicYear: term[0].academicYear,
        term: term[0].term,
        student: _.sumBy(term, 'noOfStudents'),
      };
    });

    const students = await Level.find({
      session: new ObjectId(sessionId),
      term: new ObjectId(termId),
    }).populate({
      path: 'students',
      match: { active: true },
    });

    const maleStudents = [];
    const femaleStudents = [];

    //Get number of males and females
    const modifiedStudents = students.flatMap(({ students }) => {
      return students.map((student) => {
        if (student.gender === 'male') {
          maleStudents.push(student);
        }
        if (student.gender === 'female') {
          femaleStudents.push(student);
        }
        student._doc.fullName = _.startCase(
          `${student?.surname} ${student?.firstname} ${student?.othername}`
        );

        return student;
      });
    });

    //Get all recently added students
    const recentStudents =
      _.orderBy(modifiedStudents, 'createdAt', 'desc').slice(0, 10) ?? [];

    //Get total no of students in each class
    const noOfStudentsInEachLevel = students.map(({ students, level }) => {
      return {
        level: `${level.name} ${level.type}`,
        students: students.length,
      };
    });
    // console.log(noOfStudentsInEachLevel);

    const details = {
      recentStudents,
      noOfStudentsInEachLevel,
      noOfStudentsForEachTerm: noOfStudents,
      students: modifiedStudents.length ?? 0,
      males: maleStudents.length ?? 0,
      females: femaleStudents.length ?? 0,
    };

    //console.log(details);

    res.status(200).json(details);
  })
);

//@GET Parent by student ID
router.get(
  '/parent',
  AsyncHandler(async (req, res) => {
    const { id } = req.query;
    const parent = await Parent.findOne({
      student: new ObjectId(id),
    });

    if (_.isEmpty(parent)) {
      return res.status(200).json({});
    }

    res.json(parent);
  })
);

//@GET ALL student for search
router.post(
  '/search/all',
  AsyncHandler(async (req, res) => {
    const { level } = req.body;

    //find student current level details
    const currentLevel = await Level.findById(level).populate({
      path: 'students',
      match: { active: true },
    });

    if (_.isEmpty(currentLevel)) {
      return res.status(200).json([]);
    }

    //filter out all students

    const uniqueStudents = currentLevel.students.map((student) => {
      const fullName = _.startCase(
        `${student?.surname} ${student?.firstname} ${student?.othername}`
      );
      return {
        id: student._id,
        profile: student.profile,
        fullName,
        level: currentLevel?._id,
        levelType: `${currentLevel.level?.name}${currentLevel.level?.type}`,
      };
    });
    //console.log(uniqueStudents);

    res.status(200).json(uniqueStudents);
  })
);

//@POST students
router.post(
  '/',
  upload.single('profile'),
  AsyncHandler(async (req, res) => {
    const newStudent = req.body;

    //Add new Student
    const student = await Student.create({
      profile: req.file?.filename,
      firstname: newStudent.firstname,
      surname: newStudent.surname,
      othername: newStudent.othername,
      dateofbirth: newStudent.dateofbirth,
      gender: newStudent.gender,
      email: newStudent.email,
      phonenumber: newStudent.phonenumber,
      address: newStudent.address,
      residence: newStudent.residence,
      nationality: newStudent.nationality,
    });

    if (_.isEmpty(student)) {
      return res.status(404).json('Error adding student info.Try again later');
    }

    //Add Student to current class
    const level = await Level.findByIdAndUpdate(
      newStudent.level,
      { $push: { students: student?._id } },
      { new: true }
    );

    //create exams details for student
    await Examination.create({
      session: new ObjectId(newStudent.session),
      term: new ObjectId(newStudent.term),
      level: new ObjectId(level?._id),
      student: new ObjectId(student._id),
      scores: [],
      overallScore: 0,
      comments: {},
    });

    //find current fees for a particular student class
    const fees = await Fee.findOne({
      session: new ObjectId(newStudent.session),
      term: new ObjectId(newStudent.term),
      level: new ObjectId(newStudent.level),
    });

    //Generate current student fees
    if (!_.isEmpty(fees)) {
      await CurrentFee.create({
        session: new ObjectId(newStudent.session),
        term: new ObjectId(newStudent.term),
        level: new ObjectId(newStudent.level),
        fee: fees._id,
        student: student._id,
        payment: [],
      });
    }

    //Add Student Parent Info
    await Parent.create({
      firstname: newStudent.parentFirstName,
      surname: newStudent.parentSurName,
      gender: newStudent.parentGender,
      email: newStudent.parentEmail,
      phonenumber: newStudent.parentPhoneNo,
      address: newStudent.parentAddress,
      nationality: newStudent.parentNationality,
      student: student._id,
    });

    res.status(200).json('New Student has been created successfully!!!');
  })
);

//@PUT students
router.post(
  '/many',
  AsyncHandler(async (req, res) => {
    const { session, students, type } = req.body;

    let studentIds = _.map(students, '_id');

    if (type === 'file') {
      const newStudents = await Student.create(students);
      if (_.isEmpty(newStudents)) {
        return res
          .status(404)
          .json('Error adding student info.Try again later.');
      }

      if (_.isEmpty(newStudents)) {
        return res
          .status(404)
          .json('Error adding student info.Try again later');
      }
      studentIds = _.map(newStudents, '_id');
    }

    //Add Students to current class
    await Level.findByIdAndUpdate(
      session.levelId,
      {
        $push: { students: studentIds },
        // $set: {
        //   rollNumber: studentIds.length,
        // },
      },
      { new: true }
    ).select('students');

    //create exams details for students
    studentIds.forEach(async (id) => {
      await Examination.create({
        session: new ObjectId(session.sessionId),
        term: new ObjectId(session.termId),
        level: new ObjectId(session.levelId),
        student: id,
        scores: [],
        overallScore: 0,
        comments: {},
      });
    });

    //find current fees for a particular student class
    const fees = await Fee.findOne({
      session: new ObjectId(session.sessionId),
      term: new ObjectId(session.termId),
      level: new ObjectId(session.levelId),
    });

    //Generate current student fees
    if (!_.isEmpty(fees)) {
      studentIds.forEach(async (id) => {
        await CurrentFee.create({
          session: new ObjectId(session.sessionId),
          term: new ObjectId(session.termId),
          level: new ObjectId(session.levelId),
          fee: fees._id,
          student: id,
          payment: [],
        });
      });
    }

    res.status(200).json('Students Info has been Updated Successfully!!!');
  })
);
//@PUT students
router.put(
  '/',
  AsyncHandler(async (req, res) => {
    const id = req.body._id;

    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(403)
        .json('Error updating student info.Try again later.');
    }

    const modifiedStudent = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      modifiedStudent,
      {
        upsert: true,
        new: true,
      }
    );
    if (_.isEmpty(updatedStudent)) {
      return res
        .status(404)
        .json('Error updating student info.Try again later.');
    }

    res.status(200).json('Student Info has been Updated Successfully!!!');
  })
);

//@POST Update Student profile
router.put(
  '/profile',
  upload.single('profile'),
  AsyncHandler(async (req, res) => {
    const { _id } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(_id, {
      $set: {
        profile: req.file?.filename,
      },
    });

    if (_.isEmpty(updatedStudent)) {
      return res
        .status(400)
        .json('Error updating profile image.Try again later.');
    }

    res.status(201).json('Profile image updated!!!');
  })
);

//@DISABLE Student account
router.get(
  '/disable',
  AsyncHandler(async (req, res) => {
    const { id, active } = req.query;

    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(403)
        .json('Error updating student info.Try again later.');
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        $set: { active: active === 'Yes' ? false : true },
      },
      {
        upsert: true,
        new: true,
      }
    );
    if (_.isEmpty(updatedStudent)) {
      return res
        .status(404)
        .json('Error updating student info.Try again later.');
    }

    res
      .status(200)
      .json(
        `Student Account ${updatedStudent?.active ? 'Enabled' : 'Disabled'}!!!`
      );
  })
);

//@DELETE student
router.delete(
  '/',
  AsyncHandler(async (req, res) => {
    const id = req.query.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.json({
        error: true,
        message: 'Invalid Student id',
      });
    }

    const student = await Student.findByIdAndRemove(id);
    if (student === null) {
      return res.json({
        error: true,
        mesaage: 'No Student with such id',
      });
    }
    res.json(student);
  })
);

module.exports = router;
