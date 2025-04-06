const router = require('express').Router();
const { randomUUID } = require('crypto');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const {
  Types: { ObjectId },
} = require('mongoose');
const _ = require('lodash');
const multer = require('multer');
const Term = require('../models/termModel');
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
    const students = await Student.find({
      school: req.user.school
    });
    res.json(students);
  })
);
//@GET All students
router.get(
  '/ids',
  asyncHandler(async (req, res) => {
    const existingStudents = await Student.find({
      school: req.user.school
    });
    const students = _.map(existingStudents, 'indexnumber')
    res.json(students);
  })
);


//@GET All students details
router.get(
  '/details',
  asyncHandler(async (req, res) => {
    const { sessionId, termId } = req.query;
    const terms = await Term.find({
      session: new ObjectId(sessionId),

    }).select(['term', 'academicYear'])


    const modifiedTerms = _.map(terms, ({ term, academicYear }) => ({
      term, academicYear, student: 0
    }))

    const allLevels = await Level.find({
      session: new ObjectId(sessionId),
    })
      .populate('term', ['term', 'academicYear'])
      .select(['level', 'students']);


    //group students into terms
    const groupedLevels = _.groupBy(allLevels, 'term.term');

    const groupedTerms = Object.values(groupedLevels).map((level) => {

      return level.flatMap(({ term: { term, academicYear }, noOfStudents }) => {
        return {
          academicYear,
          term,
          noOfStudents,
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

    //Students in each term
    const students = _.values(_.merge(_.keyBy([...modifiedTerms, ...noOfStudents], 'term')))


    //Current Students in current sessions
    const currentStudents = await Level.find({

      session: new ObjectId(sessionId),
      term: new ObjectId(termId),
    }).populate({
      path: 'students',
      match: { active: true },
    }).select('level')

    const maleStudents = [];
    const femaleStudents = [];

    //Get number of males and females
    const modifiedStudents = currentStudents.flatMap(({ levelName, students }) => {
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
        student._doc.levelName = levelName

        return student;
      });
    });

    //Get all recently added students
    const recentStudents = _.take(_.orderBy(modifiedStudents, 'createdAt', 'desc'), 10)

    //Get total no of students in each class
    const noOfStudentsInEachLevel = currentStudents.map(({ noOfStudents, levelName }) => {

      return {
        level: levelName,
        students: noOfStudents,
      };
    });
    // console.log(noOfStudentsInEachLevel);

    const details = {
      recentStudents,
      noOfStudentsInEachLevel,
      noOfStudentsForEachTerm: students,
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

    //Personal Info
    const student = await Student.findById(id);

    //School Fees
    const fees = await CurrentFee.find({
      student: id,
    }).sort({ createdAt: -1 })
      .populate('student')
      .populate({
        path: 'term',
        select: ['term', 'academicYear']
      })
      .populate({
        path: 'level',
        select: ['level']
      })
      .select('payment');

    const modifiedFees = fees.map(fee => {
      return {
        _id: fee?._id,
        academicYear: fee?.term?.academicYear,
        term: fee?.term?.term,
        level: fee?.level?.levelName,
        payment: fee?.payment,
        paid: _.sumBy(fee?.payment, 'paid')
      }
    })

    //Group selected terms in ascending order
    const groupfeesByTerms = _.groupBy(
      _.sortBy(modifiedFees, 'term'),
      'academicYear'
    );
    const feesDetails = Object.entries(groupfeesByTerms)



    //Examination
    const examination = await Examination.find({
      student: id
    })
      .populate('term', ['academicYear', 'term'])
      .populate('level', ['level', 'subjects'])



    const modifiedExams = examination.map(({ _id, term, level }) => {
      return {
        _id,
        academicYear: term?.academicYear,
        term: term?.term,
        levelName: level?.levelName,
        subjects: level.subjects,
      };
    });


    //Group selected terms in ascending order
    const groupExamsByTerms = _.groupBy(
      _.sortBy(modifiedExams, 'term'),
      'academicYear'
    );
    const examsDetails = Object.entries(groupExamsByTerms)

    //Parents
    const parents = await Parent.find({
      student: id,
    });


    if (_.isEmpty(student)) {
      return res.status(400).json('No Such Student exists');
    }

    res.status(200).json({
      profile: student || [],
      fees: feesDetails || [],
      exams: examsDetails || [],
      parents: parents || []
    });
  })
);


//@POST students
router.post(
  '/',
  upload.single('profile'),
  asyncHandler(async (req, res) => {
    const { details } = req.body;

    const studentDetails = JSON.parse(details)
    const { session, personal, medical, academic, parent } = studentDetails;

    const doesStudentExists = await Student.findOne({
      indexnumber: personal?.indexnumber
    }).select('indexnumber');

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
      school: req.user.school,
      createdBy: req.user.id,
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


    const stud = {
      session: session?.sessionId,
      term: session?.termId,
      level: level?._id,
      student: student._id,
      school: req.user.school,
      createdBy: req.user.id,
    }
    //create exams details for student
    await Examination.create(stud);
    await CurrentFee.create(stud);


    const modifiedParents = parent.map(par => ({
      ...par,
      student: student._id,
      school: req.user.school,
    }));

    await Parent.insertMany(modifiedParents);

    res.status(200).json(student?._id);
  })
);

//@PUT students
router.post(
  '/many',
  asyncHandler(async (req, res) => {
    const { session, students, type } = req.body;

    const indexNumbers = _.compact(_.map(students, 'indexnumber'));
    const existingStudents = await Student.find({
      school: req.user.school,
      indexnumber: {
        $in: indexNumbers,
      },
    }).select('indexnumber')


    if (!_.isEmpty(existingStudents)) {
      return res
        .status(400)
        .json(
          {
            isDuplicateError: true,
            
            message: `ID of some students already exist.Please check and try again.`,
            data: _.map(existingStudents, 'indexnumber')
          }
        );
    }

    let studentIds = _.map(students, '_id');

    if (type === 'file') {

      const modifiedStudents = students?.map((student) => {
        return {
          ...student,
          school: req.user.school,
          createdBy: req.user.id,
        };
      });
      const newStudents = await Student.create(modifiedStudents);


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
      },
      { new: true }
    );

    //Create Exams and fees details for each inserted Student
    const studentDetails = studentIds.map(student => {
      return {
        session: session.sessionId,
        term: session.termId,
        level: session.levelId,
        student: student,
        createdBy: req.user.id
      }
    })

    await Examination.insertMany(studentDetails);
    await CurrentFee.insertMany(studentDetails);


    res.status(200).json('Student Information Saved!!!');
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
    const { id, ...rest } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(id, {
      $set: {
        medical: rest,
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
