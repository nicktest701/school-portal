const router = require('express').Router();
const { randomUUID } = require('crypto');
const asyncHandler = require('express-async-handler');
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
const { uploadFile, uploadMultipleImages } = require('../config/uploadFile');


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




//@GET All students
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const students = await Student.find({});
    res.json(students);
  })
);

//@GET All students
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const students = await Student.find({});
    res.json(students);
  })
);

//@GET All students details
router.get(
  '/details',
  asyncHandler(async (req, res) => {
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
  asyncHandler(async (req, res) => {
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

//@GET student by student index number
router.get(
  '/index-number',
  asyncHandler(async (req, res) => {
    const { id } = req.query;

    const student = await Student.findOne({
      indexnumber: id
    });

    if (!_.isEmpty(student)) {
      return res.status(400).json('Index Number already exist!');
    }
    res.sendStatus(204);
  })
);

//@GET student by student id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (_.isEmpty(student)) {
      return res.json('No Such Student exists');
    }
    res.status(200).json(student);
  })
);

//@GET ALL student for search
router.post(
  '/search/all',
  asyncHandler(async (req, res) => {
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
      return {
        id: student._id,
        profile: student.profile,
        fullName: student?.fullName,
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
  asyncHandler(async (req, res) => {
    const { details } = req.body;


    const studentDetails = JSON.parse(details)
    const { personal, medical, academic, parent } = studentDetails;

    const doesStudentExists = await Student.findOne({
      indexnumber: personal?.indexnumber
    });

    if (!_.isEmpty(doesStudentExists)) {
      return res.status(400).json('Index Number already exist!');
    }

    let studentPhoto = "https://firebasestorage.googleapis.com/v0/b/fir-system-54b99.appspot.com/o/download.png?alt=media&token=c3f23cd6-8973-4681-9900-98dbadc93d2a"
    if (req.file) {
      const filename = req.file?.filename;
      studentPhoto = await uploadFile(filename, 'students/');
    }

    //Add new Student
    const student = await Student.create({
      profile: studentPhoto,
      indexnumber: personal?.indexnumber,
      firstname: personal?.firstname,
      surname: personal?.surname,
      othername: personal?.othername,
      dateofbirth: personal?.dateofbirth,
      gender: personal?.gender,
      email: personal?.email,
      phonenumber: personal?.phonenumber,
      address: personal?.address,
      residence: personal?.residence,
      nationality: personal?.nationality,
      medical,
      academic,
    });

    if (_.isEmpty(student)) {
      return res.status(404).json('Error adding student info.Try again later');
    }

    //Add Student to current class
    const level = await Level.findByIdAndUpdate(
      academic.level?._id,
      { $push: { students: student?._id } },
      { new: true }
    );

    //create exams details for student
    await Examination.create({
      session: new ObjectId(personal.session?.sessionId),
      term: new ObjectId(personal.session?.termId),
      level: new ObjectId(level?._id),
      student: new ObjectId(student._id),
      scores: [],
      overallScore: 0,
      comments: {},
    });


    await CurrentFee.create({
      session: new ObjectId(personal.session?.sessionId),
      term: new ObjectId(personal.session?.termId),
      level: new ObjectId(personal.level?._id),
      fee: level?.fees?._id,
      student: student._id,
      payment: [],
    });


    const firstParent = {
      ...parent.parent1,
      student: student._id,
    };
    const secondParent = {
      ...parent.parent2,
      student: student._id,
    };

    await Parent.insertMany([firstParent, secondParent]);

    res.status(200).json(student?._id);
  })
);

//@PUT students
router.post(
  '/many',
  asyncHandler(async (req, res) => {
    const { session, students, type } = req.body;

    // console.log(session)
    // return res
    //   .status(200).json('ok')

    const indexNumbers = _.map(students, 'indexnumber');

    const existingStudents = await Student.find({
      indexnumber: {
        $in: indexNumbers,
      },
    });



    if (!_.isEmpty(existingStudents)) {
      return res
        .status(404)
        .json(
          `A student with the ID ${existingStudents[0].indexnumber} already exists`
        );
    }

    let studentIds = _.map(students, '_id');

    if (type === 'file') {
      const newStudents = await Student.create(students);

      if (_.isEmpty(newStudents)) {
        return res
          .status(404)
          .json('Error adding student info.Try again later.');
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

    res.status(200).json('Student Information Saved!!!');
  })
);


//@PUT students
router.post(
  '/test',
  upload.single('profile'),
  asyncHandler(async (req, res) => {

    let filename = req.file?.filename;
    imageURL = await uploadFile(filename, 'students/');
    console.log(imageURL)

    // const studentPhoto = await uploadBase64Image(req.body?.profile, '123', 'students')

    // res.status(200).json({
    //   studentPhoto
    // });
    res.status(200).json('done');
  })
);
//@PUT students
router.put(
  '/',
  asyncHandler(async (req, res) => {
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

    res.status(200).json('Changes Saved!!!');
  })
);

//@POST Update Student medical history
router.put(
  '/medical',
  asyncHandler(async (req, res) => {
    const { id } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(id, {
      $set: {
        medical: req.body,
      },
    });

    if (_.isEmpty(updatedStudent)) {
      return res
        .status(400)
        .json('Error updating profile image.Try again later.');
    }

    res.status(201).json('Changes Saved!!!');
  })
);


//@POST Update Student profile
router.put(
  '/profile',
  upload.single('profile'),
  asyncHandler(async (req, res) => {
    const { _id } = req.body;

    if (_.isEmpty(req.file)) {
      return res.status(400).json("Please upload a file");
    }


    const filename = req.file?.filename;
    const studentPhoto = await uploadFile(filename, 'students/');


    const updatedStudent = await Student.findByIdAndUpdate(_id, {
      $set: {
        profile: studentPhoto
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

//@POST Update Student bulk profile
router.put(
  '/bulk-profile',
  upload.array("profile", 20),
  asyncHandler(async (req, res) => {

    if (!req.files || req.files.length === 0) {
      return res.status(400).json("No files uploaded");
    }


    const uploadedUrls = await uploadMultipleImages(req.files, "students/");

    const updatedStudents = uploadedUrls?.map(async (student) => {

      return await Student.findOneAndUpdate({
        indexnumber: student?.indexnumber
      }, {
        $set: {
          profile: student?.url
        },
      });

    })

    const modifiedStudents = await Promise.all(updatedStudents);

    if (_.isEmpty(modifiedStudents)) {
      return res
        .status(400)
        .json('Error uploading photos.Try again later.');
    }

    res.status(201).json('Photos updated!!!');
  })
);

//@DISABLE Student account
router.get(
  '/disable',
  asyncHandler(async (req, res) => {
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
  asyncHandler(async (req, res) => {
    const id = req.query.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.json({
        error: true,
        message: 'Invalid Student id',
      });
    }

    const student = await Student.findByIdAndDelete(id);
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
