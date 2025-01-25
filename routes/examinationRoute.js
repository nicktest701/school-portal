const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const asyncHandler = require('express-async-handler');
const School = require('../models/schoolModel');
const Examination = require('../models/examinationModel');
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
const generateRemarks = require('../config/generateRemarks');

//@GET

const SUBJECT_OPTIONS = [
  'ENGLISH LANGUAGE',
  'MATHEMATICS',
  'INTEGRATED SCIENCE',
  'NATURAL SCIENCE',
  'HISTORY',
  'SOCIAL STUDIES',
  'OUR WORLD,OUR PEOPLE',
  'RELIGIOUS & MORAL EDUCATION',
  'COMPUTING',
  'CREATIVE ARTS & DESIGN',
  'CAREER TECHNOLOGY',
  'GHANAIAN LANGUAGE',
  'FRENCH',
  'ARABIC',
  'PHYSICAL & HEALTH EDUCATION',
  'PHYSICAL EDUCATION',
  'READING',
  'WRITING',
  'MUSIC & DANCE',
  'ORALS & RHYMES',
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
      .populate('level', 'subjects level')
      .populate('student')
      .select('overallScore scores');

    if (_.isEmpty(students)) {
      return res.status(200).json({
        noOfStudents: 0,
        highestMarks: 0,
        lowestMarks: 0,
        averageMarks: 0,
        passStudents: 0,
        failStudents: 0,
        students: [],
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

    const levelDetails = await Level.findById(levelId);


    //FIND Numnber of subjects
    const noOfSubjects = levelDetails?.subjects?.length ?? 0;
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

    //is Results complete
    const totalTargetResults = Number(noOfSubjects) * students?.length
    const completedResults = _.sumBy(students, (student) => student?.scores?.length)
    const resultsComplete = parseInt(
      Number(completedResults / totalTargetResults) * 100
    )


    //is Results complete
    const totalOverallScore = _.sumBy(students, 'overallScore') ?? 0
    const totalExpectedScore = Number(noOfSubjects) * 100
    const scorePercentage = parseInt(
      Number(totalOverallScore / totalExpectedScore) * 100
    )


    const selectedStudents = students.map(
      ({ _id, student, level, scores, overallScore }) => {
        return {
          _id: _id,
          studentId: student?._id,
          indexnumber: student?.indexnumber,
          profile: student?.profile ? student?.profile : '',
          fullName: student?.fullName,
          gender: student?.gender,
          dateofbirth: student?.dateofbirth,
          level: level?.levelName,
          overallScore,
          entry: {
            completed: scores?.length || 0,
            total: level?.subjects?.length || 0,
            percent: parseInt(
              Number(scores?.length / level?.subjects?.length) * 100
            ),
          },
        };
      }
    );


    res.status(200).json({
      ...examsDetails,
      students: selectedStudents,
      resultsCompleted: resultsComplete,
      scorePercentage

    });
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
      const grade = await generateTotalGrade(scores, level?._id);

      //GET student position
      const positions = getPosition(allStudentsOverallScore);

      const position =
        positions.find((exams) => {
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
        indexnumber: student?.indexnumber,
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
        const grade = await generateTotalGrade(scores, level?._id);

        //GET student position
        const positions = getPosition(allStudentsOverallScore);

        const position =
          positions.find((exams) => {
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

    const allStudentsOverallScore = await Examination.find({
      level: new ObjectId(level?._id),
    }).select('overallScore');

    //GET Student Grade
    const grade = await generateTotalGrade(scores, level?._id);

    //GET student position
    const positions = getPosition(allStudentsOverallScore);


    const position =
      positions.find((exams) => {
        return exams._id.toString() === _id.toString();
      }).position || '';

    const expectedScore = level.subjects?.length * 100;
    const scorePercentage = parseInt(
      Number(overallScore / expectedScore) * 100
    )


    const modifiedStudentRecord = {
      _id,
      academicYear: term.academicYear,
      term: term.term,
      vacationDate: term.vacationDate,
      reOpeningDate: term.reOpeningDate,
      rollNumber: level.students?.length,
      totalLevelAttendance: level.attendance,
      profile: student?.profile ? student?.profile : '',
      indexnumber: student?.indexnumber,
      fullName: student?.fullName,
      level: level.levelName,
      levelId: level._id,
      scores: scores.sort(
        (a, b) =>
          SUBJECT_OPTIONS.indexOf(a.subject) -
          SUBJECT_OPTIONS.indexOf(b.subject)
      ),
      position: ordinal(position),
      grade,
      overallScore,
      comments,
      scorePercentage,
      entry: {
        completed: scores?.length || 0,
        total: level?.subjects?.length || 0,
        percent: parseInt(
          Number(scores?.length / level?.subjects?.length) * 100
        ),
        bestScoreSubject: _.maxBy(scores, 'totalScore'),
        worstScoreSubject: _.minBy(scores, 'totalScore'),
      },
    };

    res.status(200).json(modifiedStudentRecord);
  })
);

//@GET students results by subject
router.get(
  '/subject',
  asyncHandler(async (req, res) => {
    const { id, subject } = req.query;

    const studentRecord = await Examination.find({
      level: new ObjectId(id),
    }).populate('student');

    const results = studentRecord.map(({ scores, student }) => {
      const course = scores?.find((course) => course?.subject === subject);
      return {
        _id: student?._id,
        indexnumber: student?.indexnumber,
        student: student?.fullName,
        course:
          course !== undefined
            ? course
            : {
              subject,
              classScore: '',
              examsScore: '',
              totalScore: '',
              grade: '',
              remarks: '',
            },
      };
    });

    res.status(200).json(results);
  })
);

router.post(
  '/publish/student',
  asyncHandler(async (req, res) => {
    const { student: studentExamID, sessionId, termId, level } = req.body;

    const studentRecords = await Examination.find({
      session: new ObjectId(sessionId),
      term: new ObjectId(termId),
      level: new ObjectId(level),
    })
      .populate('term')
      .populate('level')
      .populate('student');

    const studentRecord = studentRecords.filter(
      (exam) => exam?._id?.toString() === studentExamID
    );

    if (_.isEmpty(studentRecord)) {
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

      const generatedResults = studentRecord.map(async (report) => {
        const { _id, term, level, scores, overallScore, comments, student } =
          report;

        //GET Student Grade
        const grade = await generateTotalGrade(scores, level?._id);

        //GET student position
        const positions = getPosition(allStudentsOverallScore);

        const position =
          positions.find((exams) => {
            return exams._id.toString() === _id.toString();
          }).position || '';

        const modifiedStudentRecord = {
          _id,
          academicYear: term?.academicYear,
          term: term?.term,
          vacationDate: moment(new Date(term?.vacationDate)).format(
            'Do MMMM,YYYY'
          ),
          reOpeningDate: moment(new Date(term?.reOpeningDate)).format(
            'Do MMMM,YYYY'
          ),
          report_id: `${student?.fullName}_${level?.level?.name}${level?.level?.type}_${term.term}`,
          rollNumber: level.students?.length,
          totalLevelAttendance: level.attendance,
          fullName: student?.fullName,
          indexnumber: student?.indexnumber,
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
          async ({ fullName, email, report_id }) => {
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
    const grade = await generateTotalGrade(scores, level?._id);

    //GET student position
    const positions = getPosition(allStudentsOverallScore);

    const position =
      positions.find((exams) => {
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
      indexnumber: student?.indexnumber,
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

    res.status(200).json(modifiedStudentRecord);
  })
);

router.post(
  '/student/academics',
  asyncHandler(async (req, res) => {
    const { session, term, level, student } = req.body;

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
        levelName: level?.levelName,
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

    const overallScore = _.sumBy(newScores, 'totalScore');
    const comments = generateRemarks(overallScore);

    const updatedScores = await Examination.findByIdAndUpdate(
      examsInfo._id,
      {
        $set: {
          scores: newScores,
          overallScore,
          comments,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
    res.status(201).json(updatedScores);
  })
);

router.post(
  '/bulk',
  asyncHandler(async (req, res) => {
    const { session, term, level, results } = req.body;

    //Extract student index numbers from a specific level
    const selectedLevel = await Level.findById(level)
      .populate('students', 'indexnumber')
      .select('students');

    const r = selectedLevel.students?.map(async (student) => {
      if (_.isEmpty(student)) return;
      const exams = await Examination.findOne({
        session: new ObjectId(session),
        term: new ObjectId(term),
        level: new ObjectId(level),
        student: new ObjectId(student?._id),
      })
        .populate('student', 'indexnumber')
        .select(['student', 'scores']);

      const result = results?.find(
        ({ indexnumber }) => indexnumber === exams?.student?.indexnumber
      );

      const scores = [
        {
          subject: result?.subject,
          classScore: result?.classScore,
          examsScore: result?.examsScore,
          totalScore: result?.totalScore,
          grade: result?.grade,
          remarks: result?.remarks,
        },
      ];

      const newScores = _.values(
        _.merge(_.keyBy([...exams.scores, ...scores], 'subject'))
      );

      const overallScore = _.sumBy(newScores, 'totalScore');
      const comments = generateRemarks(overallScore);
      const updatedScores = await Examination.findByIdAndUpdate(
        exams._id,
        {
          $set: {
            scores: newScores,
            overallScore,
            comments,
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

      return updatedScores;
    });

    const p = await Promise.all(r);

    return res.status(200).json('Results uploaded!');
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
    });

    if (_.isEmpty(examsInfo)) {
      const overallScore = _.sumBy(scores, (score) => Number(score?.totalScore));
      const comments = generateRemarks(overallScore);

      await Examination.create({
        session: new ObjectId(session.sessionId),
        term: new ObjectId(session.termId),
        level: new ObjectId(session.levelId),
        student: new ObjectId(session.studentId),
        scores,
        overallScore,
        comments,
        active: true,
      });

      return res
        .status(201)
        .json('Exams Scores has been updated successfully!!!');
    }

    // Merge scores with  with same subjects
    const newScores = _.merge(
      _.keyBy([...examsInfo?.scores, ...scores], '_id')
    );

    const latestScores = _.values(newScores);

    const overallScore = _.sumBy(latestScores, (score) => Number(score?.totalScore));
    const comments = generateRemarks(overallScore);

    await Examination.findByIdAndUpdate(
      examsInfo._id,
      {
        $set: {
          scores: latestScores,
          overallScore,
          comments,
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

//@POST

router.put(
  '/comments',
  asyncHandler(async (req, res) => {
    const newExamsScore = req.body;

    const updatedScores = await Examination.findByIdAndUpdate(
      newExamsScore._id,
      {
        $set: {
          comments: newExamsScore.comments,
        },
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
  asyncHandler(async (req, res) => { })
);

module.exports = router;
