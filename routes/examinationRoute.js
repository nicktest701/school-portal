const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const asyncHandler = require('express-async-handler');
const School = require('../models/schoolModel');
const Examination = require('../models/examinationModel');
const CurrentLevelDetail = require('../models/currentLevelDetailModel');
const Level = require('../models/levelModel');
const _ = require('lodash');
const pLimit = require('p-limit');
const ordinal = require('ordinal-suffix');
const moment = require('moment');
const getPosition = require('../config/rank');
const {
  Types: { ObjectId },
} = require('mongoose');
const { sendReportMail } = require('../config/mail/mail2');
const ImageToBase64 = require('../config/ImageToBase64');
const generateTotalGrade = require('../config/generateTotalGrade');
const generateReportTemplate = require('../config/generateReportTemplate');
const generateReport = require('../config/generateReport');

//@GET

const SUBJECT_OPTIONS = [
  'English Language',
  'Mathematics',
  'Integrated Science',
  'Natural Science',
  'Our World,Our People',
  'Social Studies',
  'History',
  'Religious & Moral Education',
  'Computing',
  'Creative Arts & Design',
  'Career Technology',
  'Physical & Health Education',
  'Physical Education',
  'Ghanaian Language',
  'French',
  'Arabic',
  'Reading',
  'Writing',
  'Music & Dance',
  'Orals & Rhymes',
];

router.get(
  '/details',
  asyncHandler(async (req, res) => {
    const { sessionId, termId, levelId } = req.query;

    //GET all Students scores
    const students = await Examination.find({
      session: new ObjectId(sessionId),
      term: new ObjectId(termId),
      level: new ObjectId(levelId),
    })
      .populate('level', 'subjects')
      .select('overallScore');

    if (_.isEmpty(students)) {
      return res.status(200).json({
        noOfStudents: 0,
        highestMarks: 0,
        lowestMarks: 0,
        averageMarks: 0,
        passStudents: 0,
        failStudents: 0,
      });
    }

    const examsDetails = {
      noOfStudents: students.length ?? 0,
      highestMarks: _.maxBy(students, 'overallScore').overallScore ?? 0,
      lowestMarks: _.minBy(students, 'overallScore').overallScore ?? 0,
      averageMarks: Math.round(
        _.sumBy(students, 'overallScore') / students.length ?? 0
      ),
    };

    //FIND Numnber of subjects
    const noOfSubjects = students[0]?.level?.subjects?.length ?? 0;
    //Calculate cumulative marks
    let passMark = (noOfSubjects * 100) / 2;

    const studentsAboveAverage = [];
    const studentsBelowAverage = [];

    students.forEach(({ overallScore }) => {
      if (overallScore >= passMark) {
        studentsAboveAverage.push(overallScore);
      } else {
        studentsBelowAverage.push(overallScore);
      }
    });
    examsDetails.passStudents = studentsAboveAverage.length ?? 0;
    examsDetails.failStudents = studentsBelowAverage.length ?? 0;

    res.status(200).json(examsDetails);
  })
);

//@GET
router.get(
  '/student',
  asyncHandler(async (req, res) => {
    const { examsId } = req.query;
    const studentRecord = await Examination.findById(examsId)
      .populate('term')
      .populate('level')
      .populate('student');

    const { _id, term, level, student, scores, overallScore, comments } =
      studentRecord;
    const modifiedStudentRecord = {
      _id,
      academicYear: term.academicYear,
      term: term.term,
      vacationDate: term.vacationDate,
      reOpeningDate: term.reOpeningDate,
      rollNumber: level.rollNumber,
      totalLevelAttendance: level.attendance,
      fullName: _.startCase(
        `${student.surname} ${student.firstname} ${student.othername}`
      ),
      level: level.level?.name,
      levelId: level._id,
      profile: student.profile,
      scores: scores.sort(
        (a, b) =>
          SUBJECT_OPTIONS.indexOf(a.subject) -
          SUBJECT_OPTIONS.indexOf(b.subject)
      ),
      overallScore,
      comments,
    };

    res.status(200).json(modifiedStudentRecord);
  })
);

//@GET Current exams Details

router.get(
  '/reports',
  asyncHandler(async (req, res) => {
    const { sessionId, termId, levelId } = req.query;

    const level = await Level.findById(levelId).select('subjects');
    const subjects = _.sortBy(level.subjects);

    const studentRecords = await Examination.find({
      session: new ObjectId(sessionId),
      term: new ObjectId(termId),
      level: new ObjectId(levelId),
    })
      .populate('term')
      .populate('level')
      .populate('student');

    if (_.isEmpty(studentRecords)) {
      return res.status(200).json([]);
    }

    const allStudentsOverallScore = studentRecords.map((student) => {
      return {
        _id: student?._id,
        overallScore: student.overallScore,
      };
    });

    const generatedResults = studentRecords.map(async (report) => {
      const { _id, term, level, scores, overallScore, comments, student } =
        report;

      //GET Student Grade
      const grade = generateTotalGrade(scores);

      //GET student position
      const positions = getPosition(allStudentsOverallScore);

      const position =
        positions.find((exams) => {
          //console.log(exams._id);
          return exams._id.toString() === _id.toString();
        }).position || '';

      const modifiedStudentRecord = {
        _id,
        academicYear: term.academicYear,
        term: term.term,
        vacationDate: term.vacationDate,
        reOpeningDate: term.reOpeningDate,
        rollNumber: level.students?.length,
        totalLevelAttendance: level.attendance,
        fullName: student?.fullName,
        level: `${level?.level?.name}${level?.level?.type}`,
        levelId: level?._id,
        profile: student?.profile,
        scores: scores.sort(
          (a, b) =>
            SUBJECT_OPTIONS.indexOf(a.subject) -
            SUBJECT_OPTIONS.indexOf(b.subject)
        ),

        overallScore,
        position: ordinal(position),
        grade,
        comments,
      };

      return modifiedStudentRecord;
    });

    const results = await Promise.all(generatedResults);

    res.status(200).json({
      subjects,
      results,
    });
  })
);

router.get(
  '/publish',
  asyncHandler(async (req, res) => {
    const { sessionId, termId, levelId } = req.query;

    const studentRecords = await Examination.find({
      session: new ObjectId(sessionId),
      term: new ObjectId(termId),
      level: new ObjectId(levelId),
    })
      .populate('term')
      .populate('level')
      .populate('student');

    if (_.isEmpty(studentRecords)) {
      return res.status(200).json([]);
    }
    const school = await School.findOne();

    //CONVERT IMAGE TO BASE64
    let SCHOOL_PHOTO = '';

    if (!_.isEmpty(school)) {
      const url = path.join(process.cwd(), '/images/users/', school?.badge);

      if (fs.existsSync(url)) {
        SCHOOL_PHOTO = await ImageToBase64(url, 'image/png');
      }
      // console.log(SCHOOL_PHOTO);
    }

    school.badge = SCHOOL_PHOTO;

    const allStudentsOverallScore = studentRecords.map((student) => {
      return {
        _id: student?._id,
        overallScore: student.overallScore,
      };
    });

    try {
      //GENERATE STUDENT RESULTS

      const generatedResults = studentRecords.map(async (report) => {
        const { _id, term, level, scores, overallScore, comments, student } =
          report;

        //CONVERT IMAGE TO BASE64
        let STUDENT_PHOTO = '';

        // if (student?.profile) {
        //   const url = path.join(
        //     process.cwd(),
        //     '/images/students/',
        //     student?.profile
        //   );

        //   if (fs.existsSync(url)) {
        //     STUDENT_PHOTO = await ImageToBase64(url, 'image/png');
        //   } else {
        //     const url = path.join(
        //       process.cwd(),
        //       '/images/students/',
        //       'noimage.png'
        //     );
        //     STUDENT_PHOTO = await ImageToBase64(url, 'image/png');
        //   }
        // }

        // const url = path.join(
        //   process.cwd(),
        //   '/images/students/',
        //   'noimage.png'
        // );

        // STUDENT_PHOTO = await ImageToBase64(url, 'image/png');

        //GET Student Grade
        const grade = generateTotalGrade(scores);

        //GET student position
        const positions = getPosition(allStudentsOverallScore);

        const position =
          positions.find((exams) => {
            //console.log(exams._id);
            return exams._id.toString() === _id.toString();
          }).position || '';

        const modifiedStudentRecord = {
          _id,
          academicYear: term.academicYear,
          term: term.term,
          vacationDate: moment(new Date(term.vacationDate)).format(
            'Do MMMM,YYYY'
          ),
          reOpeningDate: moment(new Date(term.reOpeningDate)).format(
            'Do MMMM,YYYY'
          ),
          report_id: `${student?.fullName}_${level?.level?.name}${level?.level?.type}_${term.term}`,
          rollNumber: level.students?.length,
          totalLevelAttendance: level.attendance,
          fullName: student?.fullName,
          email: student?.email,
          level: `${level?.level?.name}${level?.level?.type}`,
          levelId: level?._id,
          // profile: STUDENT_PHOTO,
          profile: student?.profile,
          scores: scores.sort(
            (a, b) =>
              SUBJECT_OPTIONS.indexOf(a.subject) -
              SUBJECT_OPTIONS.indexOf(b.subject)
          ),

          overallScore,
          position: ordinal(position),
          grade,
          comments,
        };

        return modifiedStudentRecord;
      });

      //WAIT FOR ALL RESULTS TO FINISH
      const results = await Promise.all(generatedResults);

      const limit = pLimit(5);

      const tra = results;
      //GENERATE ALL REPORT TEMPLATES
      const allTemplates = tra.map(async (result) => {
        try {
          const template = await generateReportTemplate({
            report: result,
            school,
          });

          if (template) {
            return {
              id: result?.report_id,
              template,
            };
          }
        } catch (error) {
          return res.status(404).json(error.message);
        }
      });

      //WAIT FOR ALL TEMPLATES TO FINISH LOADING
      const generatedTemplates = await Promise.all(allTemplates);

      //GENERATE REPORTS
      const generatedReports = generatedTemplates.map((template) => {
        return limit(() => generateReport(template));
      });

      const allReports = await Promise.all(generatedReports);

      if (allReports) {
        const mailedReports = tra.map(
          async ({ _id, fullName, email, report_id }) => {
            const mailResults = limit(() =>
              sendReportMail({
                id: report_id,
                email,
                fullName,
              })
            );
            // console.log(mailResults?.messageId);
            return mailResults?.messageId;
          }
        );

        await Promise.all(mailedReports);
      }

      return res.send('ok');
    } catch (error) {
      console.log(error);
      return res.status(400).json('An unknown error has occured.');
    }
  })
);

router.post(
  '/publish/student',
  asyncHandler(async (req, res) => {
    const { student } = req.body;

    const studentRecords = await Examination.find({
      _id: new ObjectId(student),
    })
      .populate('term')
      .populate('level')
      .populate('student');
    // console.log(studentRecords);

    if (_.isEmpty(studentRecords)) {
      return res.status(200).json([]);
    }

    const school = await School.findOne();

    //CONVERT IMAGE TO BASE64
    let SCHOOL_PHOTO = '';

    if (!_.isEmpty(school)) {
      const url = path.join(process.cwd(), '/images/users/', school?.badge);

      if (fs.existsSync(url)) {
        SCHOOL_PHOTO = await ImageToBase64(url, 'image/png');
      }
      // console.log(SCHOOL_PHOTO);
    }

    school.badge = SCHOOL_PHOTO;

    const allStudentsOverallScore = studentRecords.map((student) => {
      return {
        _id: student?._id,
        overallScore: student.overallScore,
      };
    });

    try {
      //GENERATE STUDENT RESULTS

      const generatedResults = studentRecords.map(async (report) => {
        const { _id, term, level, scores, overallScore, comments, student } =
          report;

        //CONVERT IMAGE TO BASE64
        let STUDENT_PHOTO = '';

        // if (student?.profile) {
        //   const url = path.join(
        //     process.cwd(),
        //     '/images/students/',
        //     student?.profile
        //   );

        //   if (fs.existsSync(url)) {
        //     STUDENT_PHOTO = await ImageToBase64(url, 'image/png');
        //   } else {
        //     const url = path.join(
        //       process.cwd(),
        //       '/images/students/',
        //       'noimage.png'
        //     );
        //     STUDENT_PHOTO = await ImageToBase64(url, 'image/png');
        //   }
        // }

        const url = path.join(
          process.cwd(),
          '/images/students/',
          'noimage.png'
        );

        STUDENT_PHOTO = await ImageToBase64(url, 'image/png');

        //GET Student Grade
        const grade = generateTotalGrade(scores);

        //GET student position
        const positions = getPosition(allStudentsOverallScore);

        const position =
          positions.find((exams) => {
            //console.log(exams._id);
            return exams._id.toString() === _id.toString();
          }).position || '';

        const modifiedStudentRecord = {
          _id,
          academicYear: term.academicYear,
          term: term.term,
          vacationDate: moment(new Date(term.vacationDate)).format(
            'Do MMMM,YYYY'
          ),
          reOpeningDate: moment(new Date(term.reOpeningDate)).format(
            'Do MMMM,YYYY'
          ),
          report_id: `${student?.fullName}_${level?.level?.name}${level?.level?.type}_${term.term}`,
          rollNumber: level.students?.length,
          totalLevelAttendance: level.attendance,
          fullName: student?.fullName,
          email: student?.email,
          level: `${level?.level?.name}${level?.level?.type}`,
          levelId: level?._id,
          profile: student?.profile,
          // profile: STUDENT_PHOTO,
          scores: scores.sort(
            (a, b) =>
              SUBJECT_OPTIONS.indexOf(a.subject) -
              SUBJECT_OPTIONS.indexOf(b.subject)
          ),

          overallScore,
          position: ordinal(position),
          grade,
          comments,
        };

        return modifiedStudentRecord;
      });

      //WAIT FOR ALL RESULTS TO FINISH
      const results = await Promise.all(generatedResults);

      const limit = pLimit(5);

      const tra = results;
      //GENERATE ALL REPORT TEMPLATES
      const allTemplates = tra.map(async (result) => {
        try {
          const template = await generateReportTemplate({
            report: result,
            school,
          });

          if (template) {
            return {
              id: result?.report_id,
              template,
            };
          }
        } catch (error) {
          return res.status(404).json(error.message);
        }
      });

      //WAIT FOR ALL TEMPLATES TO FINISH LOADING
      const generatedTemplates = await Promise.all(allTemplates);

      //GENERATE REPORTS
      const generatedReports = generatedTemplates.map((template) => {
        return limit(() => generateReport(template));
      });

      const allReports = await Promise.all(generatedReports);

      if (allReports) {
        const mailedReports = tra.map(
          async ({ _id, fullName, email, report_id }) => {
            const mailResults = limit(() =>
              sendReportMail({
                id: report_id,
                email,
                fullName,
              })
            );

            return mailResults?.messageId;
          }
        );

        await Promise.all(mailedReports);
      }

      return res.send('ok');
    } catch (error) {
      return res.status(400).json('An unknown error has occured.');
    }
  })
);

router.post(
  '/student/current',
  asyncHandler(async (req, res) => {
    const { sessionId, termId, studentId, levelId } = req.body;
    const studentRecord = await Examination.findOne({
      session: new ObjectId(sessionId),
      term: new ObjectId(termId),
      student: new ObjectId(studentId),
    })
      .populate('term')
      .populate('level')
      .populate('student');

    if (_.isEmpty(studentRecord)) {
      return res.status(200).json({});
    }

    const allStudentsOverallScore = await Examination.find({
      level: new ObjectId(levelId),
    }).select('overallScore');

    const { _id, term, level, student, scores, overallScore, comments } =
      studentRecord;

    //GET Student Grade
    const grade = generateTotalGrade(scores);

    //GET student position
    const positions = getPosition(allStudentsOverallScore);

    const position =
      positions.find((exams) => {
        //console.log(exams._id);
        return exams._id.toString() === _id.toString();
      }).position || '';

    const modifiedStudentRecord = {
      _id,
      academicYear: term.academicYear,
      term: term.term,
      vacationDate: term.vacationDate,
      reOpeningDate: term.reOpeningDate,
      rollNumber: level.students?.length,
      totalLevelAttendance: level.attendance,
      fullName: _.startCase(
        `${student?.surname} ${student?.firstname} ${student?.othername}`
      ),
      level: `${level?.level?.name}${level?.level?.type}`,
      levelId: level?._id,
      profile: student?.profile,
      scores: scores.sort(
        (a, b) =>
          SUBJECT_OPTIONS.indexOf(a.subject) -
          SUBJECT_OPTIONS.indexOf(b.subject)
      ),
      overallScore,
      position: ordinal(position),
      grade,
      comments,
    };
    // //console.log(modifiedStudentRecord);

    res.status(200).json(modifiedStudentRecord);
  })
);

router.post(
  '/student/all',
  asyncHandler(async (req, res) => {
    const { session, term, level, student } = req.body;

    // console.log(req.body);

    //find if current term exams details exists
    const exists = await Examination.findOne({
      session: new ObjectId(session),
      level: new ObjectId(level),
      term: new ObjectId(term),
      student: new ObjectId(student),
    });

    //create new exams Details for the term
    if (_.isEmpty(exists)) {
      await Examination.create({
        session,
        term,
        level,
        student,
        scores: [],
        overallScore: 0,
      });
    }

    const examination = await Examination.find({
      student: new ObjectId(student),
    })
      .populate('term')
      .populate('session')
      .populate('level');

    const modifiedTerms = examination.map(({ _id, session, term, level }) => {
      return {
        _id,
        academicYear: session?.academicYear,
        term: term?.term,
        levelName: `${level.level?.name}${level.level?.type}`,
        subjects: level.subjects,
      };
    });

    //Group selected terms in ascending order
    const groupedTerms = _.groupBy(
      _.sortBy(modifiedTerms, 'term'),
      'academicYear'
    );

    res.status(200).json(Object.entries(groupedTerms));
  })
);

//@POST

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const newExamsScore = req.body;

    // Find if student exam details exists
    const examsInfo = await Examination.findById(newExamsScore.examsId);

    // Merge scores with  with same subjects
    const newScores = _.values(
      _.merge(
        _.keyBy([...examsInfo.scores, ...newExamsScore.scores], 'subject')
      )
    );

    const updatedScores = await Examination.findByIdAndUpdate(
      examsInfo._id,
      {
        $set: {
          scores: newScores,
          overallScore: _.sumBy(newScores, 'totalScore'),
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
    res.json(updatedScores);
  })
);

router.post(
  '/bulk',
  asyncHandler(async (req, res) => {
    const examsDetails = req.body;

    const modifiedResults = examsDetails.map(
      async ({
        id,
        subject,
        classScore,
        examsScore,
        totalScore,
        grade,
        remarks,
        session,
        term,
        level,
      }) => {
        const exam = await Examination.findOne({
          session: new ObjectId(session),
          term: new ObjectId(term),
          level: new ObjectId(level),
          student: new ObjectId(id),
        });

        const scores = [
          {
            subject,
            classScore,
            examsScore,
            totalScore,
            grade,
            remarks,
          },
        ];

        const newScores = _.values(
          _.merge(_.keyBy([...exam.scores, ...scores], 'subject'))
        );

        const updatedScores = await Examination.findByIdAndUpdate(
          exam._id,
          {
            $set: {
              scores: newScores,
              overallScore: _.sumBy(newScores, 'totalScore'),
            },
          },
          {
            upsert: true,
            new: true,
          }
        );

        return updatedScores;
      }
    );

    await Promise.all(modifiedResults);

    res.status(200).json('Results uploaded!');
    // res.json(updatedScores);
  })
);

router.post(
  '/update',
  asyncHandler(async (req, res) => {
    const { session, scores } = req.body;

    // Find if student exam details exists
    const examsInfo = await Examination.findOne({
      session: new ObjectId(session.sessionId),
      term: new ObjectId(session.termId),
      student: new ObjectId(session.studentId),
      // level: new ObjectId(session.levelId),
    });

    if (_.isEmpty(examsInfo)) {
      const currentLevelDetail = await CurrentLevelDetail.findOne({
        session: new ObjectId(session.sessionId),
        term: new ObjectId(session.termId),
        level: new ObjectId(session.levelId),
        active: true,
      });

      await Examination.create({
        session: new ObjectId(session.sessionId),
        term: new ObjectId(session.termId),
        level: new ObjectId(session.levelId),
        currentLevelDetails: currentLevelDetail._id,
        student: new ObjectId(session.studentId),
        scores,
        overallScore: _.sumBy(scores, 'totalScore'),
        active: true,
      });

      return res
        .status(201)
        .json('Exams Scores has been updated successfully!!!');
    }

    // Merge scores with  with same subjects
    const newScores = _.merge(
      _.keyBy([...examsInfo?.scores, ...scores], 'subject')
    );

    const latestScores = _.values(newScores);

    await Examination.findByIdAndUpdate(
      examsInfo._id,
      {
        $set: {
          scores: latestScores,
          overallScore: _.sumBy(latestScores, 'totalScore'),
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.status(201).json('Exams Scores has been updated successfully!!!');
  })
);

//@PUT

router.put(
  '/',
  asyncHandler(async (req, res) => {})
);

//@POST

router.put(
  '/comments',
  asyncHandler(async (req, res) => {
    const newExamsScore = req.body;

    const updatedScores = await Examination.findByIdAndUpdate(
      newExamsScore._id,
      {
        comments: newExamsScore.comments,
      },
      {
        upsert: true,
        new: true,
      }
    );
    if (_.isEmpty(updatedScores)) {
      return res.status(400).json('Error saving remarks.Try again later!!!');
    }

    res.status(201).json('Remarks have been saved successfully!!!');
  })
);

//@DELETE

router.delete(
  '/',
  asyncHandler(async (req, res) => {})
);

module.exports = router;
