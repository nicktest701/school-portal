const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const School = require("../models/schoolModel");
const Examination = require("../models/examinationModel");
const Level = require("../models/levelModel");
const _ = require("lodash");
const pLimit = require("p-limit");
const ordinal = require("ordinal-suffix");
const moment = require("moment");
const getPosition = require("../config/rank");
const {
  Types: { ObjectId },
} = require("mongoose");
const { sendReportMail } = require("../config/mail/mail2");
const generateTotalGrade = require("../config/generateTotalGrade");
const generateReportTemplate = require("../config/generateReportTemplate");
const generateReport = require("../config/generateReport");
const generateRemarks = require("../config/generateRemarks");
const { convertImageToBase64, SUBJECT_OPTIONS } = require("../config/helper");
const { sendReportSMS } = require("../config/sms/messenger");

//@GET

router.get(
  "/details",
  asyncHandler(async (req, res) => {
    const { level } = req.query;

    //GET all Students scores
    const students = await Examination.find({ level })
      .populate({
        path: "level",
        select: ["subjects", "level"],
        populate: {
          path: "subjects",
        },
      })
      .populate({
        path: "student",
        select: [
          "firstname",
          "surname",
          "othername",
          "indexnumber",
          "profile",
          "gender",
          "dateofbirth",
        ],
      })
      .select("overallScore scores");

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
      highestMarks: _.maxBy(students, "overallScore").overallScore ?? 0,
      lowestMarks: _.minBy(students, "overallScore").overallScore ?? 0,
      averageMarks: Math.round(
        _.sumBy(students, "overallScore") / students.length ?? 0
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

    //is Results complete
    const totalTargetResults = Number(noOfSubjects) * students?.length;
    const completedResults = _.sumBy(
      students,
      (student) => student?.scores?.length
    );
    const resultsComplete = parseInt(
      Number(completedResults / totalTargetResults) * 100
    );

    //is Results complete
    const totalOverallScore = _.sumBy(students, "overallScore") ?? 0;
    const totalExpectedScore = Number(noOfSubjects) * students?.length * 100;
    const scorePercentage = parseInt(
      Number(totalOverallScore / totalExpectedScore) * 100
    );

    const selectedStudents = students.map(
      ({ _id, student, level, scores, overallScore }) => {
        return {
          _id: _id,
          studentId: student?._id,
          indexnumber: student?.indexnumber,
          profile: student?.profile || "",
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
      scorePercentage,
    });
  })
);

router.get(
  "/reports",
  asyncHandler(async (req, res) => {
    const { sessionId, termId, levelId } = req.query;

    const studentRecords = await Examination.find({
      session: new ObjectId(sessionId),
      term: new ObjectId(termId),
      level: new ObjectId(levelId),
    })
      .populate("term")
      .populate({
        path: "level",
        select: ["level", "students", "subjects"],
        populate: {
          path: "subjects",
          select: "name",
        },
      })
      .populate({
        path: "student",
        select: [
          "firstname",
          "surname",
          "othername",
          "indexnumber",
          "email",
          "profile",
        ],
      });

    if (_.isEmpty(studentRecords)) {
      return res.status(200).json([]);
    }

    const subjects = studentRecords[0]?.level?.subjects.sort(
      (a, b) =>
        SUBJECT_OPTIONS.indexOf(a.name) - SUBJECT_OPTIONS.indexOf(b.name)
    );

    const studentOverallScores = await Examination.find({
      term: termId,
      level: levelId,
    }).select(["overallScore"]);

    //GET student position
    const positions = getPosition(studentOverallScores);

    const generatedResults = studentRecords.map(async (report) => {
      //GENERATE STUDENT RESULTS
      const generatedResult = await studentReportDetails(
        report,
        positions,
        "preview"
      );
      return generatedResult;
    });

    const results = await Promise.all(generatedResults);

    res.status(200).json({
      subjects,
      results,
    });
  })
);

router.get(
  "/publish",
  asyncHandler(async (req, res) => {
    const publishType = req.query.type || "sms";
    const { sessionId, termId, levelId } = req.query;

    const studentRecords = await Examination.find({
      session: new ObjectId(sessionId),
      term: new ObjectId(termId),
      level: new ObjectId(levelId),
    })
      .populate("term")
      .populate({
        path: "level",
        select: ["level", "students"],
      })
      .populate({
        path: "student",
        select: [
          "firstname",
          "surname",
          "othername",
          "indexnumber",
          "phonenumber",
          "email",
          "profile",
        ],
      });

    if (_.isEmpty(studentRecords)) {
      return res.status(200).json([]);
    }
    const school = await School.findById(req.user.school);

    const scorePreference =
      studentRecords[0]?.term?.exams?.scorePreference?.split("/") || [
        "50",
        "50",
      ];
    const termDetails = {
      report: studentRecords[0]?.term?.report,
      class: scorePreference[0],
      exams: scorePreference[1],
      headmaster: studentRecords[0]?.term?.headmaster,
    };
    school.termDetails = termDetails;

    //CONVERT IMAGE TO BASE64
    let SCHOOL_PHOTO = "";

    if (!_.isEmpty(school)) {
      if (school.badge) {
        SCHOOL_PHOTO = await convertImageToBase64(school.badge);
      }
    }

    school.badge = SCHOOL_PHOTO;

    const studentOverallScores = await Examination.find({
      term: termId,
      level: levelId,
    }).select(["overallScore"]);

    //GET student position
    const positions = getPosition(studentOverallScores);

    try {
      //GENERATE STUDENT RESULTS

      const generatedResults = studentRecords.map(async (report) => {
        //GENERATE STUDENT RESULTS
        const generatedResult = await studentReportDetails(
          report,
          positions,
          "print"
        );
        return generatedResult;
      });

      //WAIT FOR ALL RESULTS TO FINISH
      const results = await Promise.all(generatedResults);

      const limit = pLimit(5);

      //SEND REPORTS TO STUDENT SMS
      if (publishType === "sms") {
        const response = _.take(results, 1).map(async (result) => {
          return limit(() => sendReportSMS(result, school));
        });

        await Promise.all(response);

        return res.status(200).json("ok");
      }

      //GENERATE ALL REPORT TEMPLATES
      const allTemplates = results.map(async (result) => {
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

      if (publishType === "email") {
        if (allReports) {
          const mailedReports = _.take(results, 1).map(
            async ({ fullName, email, report_id }) => {
              const mailResults = limit(() =>
                sendReportMail({
                  school: {
                    name: school?.name,
                    email: school?.email,
                    phonenumber: school?.phonenumber,
                  },
                  id: report_id,
                  email: email,
                  fullName,
                })
              );

              return mailResults?.messageId;
            }
          );

          await Promise.all(mailedReports);
        }
      }

      if (publishType === "both") {
        //SEND REPORTS TO STUDENT SMS
        const response = results.map(async (result) => {
          return limit(() => sendReportSMS(result, school));
        });

        const mailedReports = _.take(results, 1).map(
          async ({ fullName, email, report_id }) => {
            const mailResults = limit(() =>
              sendReportMail({
                school: {
                  name: school?.name,
                  email: school?.email,
                  phonenumber: school?.phonenumber,
                },
                id: report_id,
                email: email,
                fullName,
              })
            );

            return mailResults?.messageId;
          }
        );

        await Promise.all([mailedReports, response]);
      }

      return res.status(200).json("ok");
    } catch (error) {
      console.log(error);
      return res.status(400).json("An unknown error has occured.");
    }
  })
);

//@GET students results by subject
router.get(
  "/subject",
  asyncHandler(async (req, res) => {
    const { id, subject } = req.query;

    const studentRecord = await Examination.find({
      level: new ObjectId(id),
    })
      .populate("level", "level")
      .populate({
        path: "student",
        select: ["firstname", "surname", "othername", "indexnumber"],
      })
      .select("scores");

    const levelSubjects = await Level.findById(id)
      .populate({
        path: "subjects",
        select: ["name"],
        match: { _id: subject },
      })
      .select("subjects");

    const selectedSubject = levelSubjects?.subjects[0];

    const result = studentRecord.map(
      async ({ _id, scoresWithTotal, scores, student }) => {
        const newGenerateScore = await scoresWithTotal;
        const course = newGenerateScore?.find(
          (course) => course?._id === subject
        );

        return {
          _id: _id,
          studentId: student?._id,
          indexnumber: student?.indexnumber,
          student: student?.fullName,
          course:
            course !== undefined
              ? course
              : {
                  _id: selectedSubject?._id,
                  subject: selectedSubject?.name,
                  classScore: "",
                  examsScore: "",
                  totalScore: "",
                  grade: "",
                  remarks: "",
                },
        };
      }
    );
    const results = await Promise.all(result);
    const isCompleted = _.filter(results, (result) =>
      _.isNumber(result?.course?.totalScore)
    );
    const overallScore = _.sumBy(results, "course.totalScore");
    const totalOverAllScore = results?.length * 100;
    const topScore = _.maxBy(results, "course.totalScore");
    const lowScore = _.minBy(results, "course.totalScore");

    const scores = _.map(results, "course.totalScore");
    const totalPossibleScore = scores.length * 100;

    const totalScore = _.sum(scores);
    const overallPerformancePercentage =
      (totalScore / totalPossibleScore) * 100;

    const isCompletedPercentage = (isCompleted?.length / results?.length) * 100;

    res.status(200).json({
      students: studentRecord?.length,
      results,
      overallScore,
      totalOverAllScore,
      topScore: topScore?.course?.totalScore,
      lowScore: lowScore?.course?.totalScore,
      performanceIndex: overallPerformancePercentage.toFixed(1),
      completedResult: isCompletedPercentage.toFixed(0),
    });
  })
);

//@GET
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const publish = req.query.publish || "";
    const publishType = req.query.type || "sms";
    const { id } = req.params;

    const studentRecord = await Examination.findById(id)
      .populate("term")
      .populate({
        path: "level",
        select: ["level", "students", "subjects"],
        populate: {
          path: "level",
        },
      })
      .populate({
        path: "student",
        select: [
          "firstname",
          "surname",
          "othername",
          "indexnumber",
          "phonenumber",
          "email",
          "profile",
        ],
      });

    // console.log(studentRecord.term);

    const studentOverallScores = await Examination.find({
      term: studentRecord?.term?._id,
      level: studentRecord?.level?._id,
    }).select(["overallScore"]);
    //GET student position
    const positions = getPosition(studentOverallScores);

    let generatedResult = await studentReportDetails(
      studentRecord,
      positions,
      publish ? "print" : "preview"
    );

    if (_.isEmpty(publish)) {
      const expectedScore = studentRecord?.level.subjects?.length * 100;
      const scorePercentage = parseInt(
        Number(generatedResult.overallScore / expectedScore) * 100
      );

      const noOfSubjects = studentRecord?.level?.subjects?.length || 0;
      const noOfScores = generatedResult?.scores?.length || 0;

      generatedResult = {
        ...generatedResult,
        scorePercentage,
        entry: {
          completed: noOfScores || 0,
          total: noOfSubjects,
          percent: parseInt(Number(noOfScores / noOfSubjects) * 100),
          bestScoreSubject: _.maxBy(generatedResult?.scores, "totalScore"),
          worstScoreSubject: _.minBy(generatedResult?.scores, "totalScore"),
        },
      };

      return res.status(200).json(generatedResult);
    }

    const school = await School.findById(req.user.school);

    const scorePreference = studentRecord?.term?.exams?.scorePreference?.split(
      "/"
    ) || ["50", "50"];
    const termDetails = {
      report: studentRecord?.term?.report,
      class: scorePreference[0],
      exams: scorePreference[1],
      headmaster: studentRecord?.term?.headmaster,
    };

    school.termDetails = termDetails;

    //CONVERT IMAGE TO BASE64
    let SCHOOL_PHOTO = "";

    if (!_.isEmpty(school)) {
      if (school.badge) {
        SCHOOL_PHOTO = await convertImageToBase64(school.badge);
      }
    }

    school.badge = SCHOOL_PHOTO;

    //SEND REPORTS TO STUDENT SMS
    if (publishType === "sms") {
      await sendReportSMS(generatedResult, school);

      return res.status(200).json("ok");
    }

    //GENERATE ALL REPORT TEMPLATES
    const template = await generateReportTemplate({
      report: generatedResult,
      school,
    });

    //GENERATE REPORTS
    const generatedReports = await generateReport({
      id: generatedResult?.report_id,
      template,
    });

    if (publishType === "email") {
      if (generatedReports) {
        //SEND REPORTS TO STUDENT EMAIL
        await sendReportMail({
          school: {
            name: school?.name,
            email: school?.email,
            phonenumber: school?.phonenumber,
          },
          id: generatedResult.report_id,
          email: generatedResult?.email,
          fullName: generatedResult?.fullName,
        });
      }
    }

    if (publishType === "both") {
      await sendReportSMS(generatedResult, school);
      if (generatedReports) {
        //SEND REPORTS TO STUDENT EMAIL
        await sendReportMail({
          school: {
            name: school?.name,
            email: school?.email,
            phonenumber: school?.phonenumber,
          },
          id: generatedResult.report_id,
          email: generatedResult?.email,
          fullName: generatedResult?.fullName,
        });
      }
    }

    return res.status(200).json("ok");
  })
);

router.post(
  "/student/academics",
  asyncHandler(async (req, res) => {
    const { session, term, level, student } = req.body;

    //find if current term exams details exists
    const exists = await Examination.findOne({
      session,
      level,
      term,
      student,
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
      student,
    })
      .populate("term", "term")
      .populate("session", "academicYear")
      .populate("level");

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
      _.sortBy(modifiedTerms, "term"),
      "academicYear"
    );
    const results = Object.entries(groupedTerms);

    res.status(200).json(results);
  })
);

//@POST

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newExamsScore = req.body;

    // Find if student exam details exists
    const examsInfo = await Examination.findById(newExamsScore.examsId);

    // Merge scores with  with same subjects
    const newScores = _.values(
      _.merge(
        _.keyBy([...examsInfo.scores, ...newExamsScore.scores], "subject")
      )
    );

    const overallScore = _.sumBy(newScores, "totalScore");
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
  "/bulk",
  asyncHandler(async (req, res) => {
    const { session, term, level, results } = req.body;

    //Extract student index numbers from a specific level
    const selectedLevel = await Level.findById(level)
      .populate("students", "indexnumber")
      .select("students");

    const r = selectedLevel.students?.map(async (student) => {
      if (_.isEmpty(student)) return;
      const exams = await Examination.findOne({
        session,
        term,
        level,
        student: new ObjectId(student?._id),
      })
        .populate("student", "indexnumber")
        .select(["student", "scores"]);

      const result = results?.find(
        ({ indexnumber }) => indexnumber === exams?.student?.indexnumber
      );

      const scores = [
        {
          _id: result?._id,
          subject: result?.subject,
          classScore: result?.classScore,
          examsScore: result?.examsScore,
          totalScore: result?.totalScore,
          grade: result?.grade,
          remarks: result?.remarks,
        },
      ];

      const newScores = _.values(
        _.merge(_.keyBy([...exams.scores, ...scores], "subject"))
      );

      const overallScore = _.sumBy(newScores, "totalScore");
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

    await Promise.all(r);

    return res.status(200).json("Results uploaded!");
  })
);

router.post(
  "/update",
  asyncHandler(async (req, res) => {
    const { session, scores } = req.body;

    let examsInfo = {};

    if (session.examsId) {
      // Find if student exam details exists
      examsInfo = await Examination.findById(session.examsId);
    } else {
      // Find if student exam details exists
      examsInfo = await Examination.findOne({
        session: new ObjectId(session.sessionId),
        term: new ObjectId(session.termId),
        student: new ObjectId(session.studentId),
      });
    }

    // Merge scores with  with same subjects
    const newScores = _.merge(
      _.keyBy([...examsInfo?.scores, ...scores], "_id")
    );

    const latestScores = _.values(newScores);
    const overallScore = _.sumBy(latestScores, (score) =>
      Number(score?.totalScore)
    );
    const comments = generateRemarks(overallScore);

    const t = await Examination.findByIdAndUpdate(
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

    res.status(201).json("Exams Scores updated!!!");
  })
);

//@POST

router.put(
  "/comments",
  asyncHandler(async (req, res) => {
    const newExamsComments = req.body;

    const updatedScores = await Examination.findByIdAndUpdate(
      newExamsComments._id,
      {
        $set: {
          comments: newExamsComments.comments,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
    if (_.isEmpty(updatedScores)) {
      return res.status(400).json("Error saving remarks.Try again later!!!");
    }

    res.status(201).json("Remarks updated successfully!!!");
  })
);

const studentReportDetails = async (
  report,
  positions,
  reportType = "preview"
) => {
  const {
    _id,
    term,
    level,
    scores,
    scoresWithTotal,
    overallScore,
    comments,
    student,
  } = report;

  const newGenerateScore = await scoresWithTotal;

  //CONVERT IMAGE TO BASE64
  let STUDENT_PHOTO = "";
  if (student?.profile && reportType === "print") {
    STUDENT_PHOTO = await convertImageToBase64(student?.profile);
  }

  //GET Student Grade
  const grade = await generateTotalGrade(scores, level?._id);

  const position =
    positions.find((exams) => {
      return exams._id.toString() === _id.toString();
    }).position || "";

  const modifiedStudentRecord = {
    _id,
    academicYear: term.academicYear,
    term: term.term,
    vacationDate: moment(new Date(term.vacationDate)).format("Do MMMM,YYYY"),
    reOpeningDate: moment(new Date(term.reOpeningDate)).format("Do MMMM,YYYY"),
    report_id: `${student?.fullName}_${level?.levelName}_${term.term}`,
    rollNumber: level.noOfStudents,
    totalLevelAttendance: 0,
    indexnumber: _.toUpper(student?.indexnumber),
    phonenumber: student?.phonenumber,
    fullName: student?.fullName,
    email: student?.email,
    level: `${level?.levelName}`,
    levelId: level?._id,
    profile:
      reportType === "preview" ? student?.profile || null : STUDENT_PHOTO,
    scores: newGenerateScore.sort(
      (a, b) =>
        SUBJECT_OPTIONS.indexOf(a.subject) - SUBJECT_OPTIONS.indexOf(b.subject)
    ),

    overallScore,
    position: ordinal(position),
    grade,
    comments,
  };

  return modifiedStudentRecord;
};

module.exports = router;
