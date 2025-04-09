const router = require("express").Router();
const _ = require("lodash");
const asyncHandler = require("express-async-handler");
const Level = require("../models/levelModel");
const Student = require("../models/studentModel");
const Grade = require("../models/gradeModel");
const Term = require("../models/termModel");
const Session = require("../models/sessionModel");
const Examination = require("../models/examinationModel");
const CurrentFee = require("../models/currentFeeModel");
const {
  startSession,

  Types: { ObjectId },
} = require("mongoose");
const { verifyJWT } = require("../middlewares/verifyJWT");
const moment = require("moment/moment");
// const knex = require("../db/knex");

//@GET All school Terms
router.get(
  "/",
  verifyJWT,
  asyncHandler(async (req, res) => {
    const session = req.query?.session;

    let terms = [];
    if (session) {
      terms = await Term.find({
        school: req.user.school,
        session: new ObjectId(session),
      }).populate("session");
    } else {
      terms = await Term.find({
        school: req.user.school,
      }).populate("session");

    }

    if (_.isEmpty(terms)) {
      return res.status(200).json([]);
    }
    const modifiedTerms = terms.map((term) => {
      const newTerm = {
        core: {
          name: term?.name,
          from: term?.from,
          to: term?.to,
          term: term?.term,
          academicYear: term?.academicYear,
          vacationDate: term?.vacationDate,
          reOpeningDate: term?.reOpeningDate,
          isPromotionTerm: term?.isPromotionTerm,
        },
        headmaster: term?.headmaster,
        report: term?.report,
        exams: term?.exams,
        termId: term._id,
        sessionId: term?.session?._id,
        active: term?.active,
      };

      return newTerm;
    });

    const sortedTerms = _.sortBy(modifiedTerms, ["academicYear", "term"]);

    res.status(200).json(sortedTerms);
  })
);


//@GET All school Terms
router.get(
  "/sessions",
  verifyJWT,
  asyncHandler(async (req, res) => {
    const session = req.query?.session;

    let terms = [];
    if (session) {
      terms = await Term.find({
        school: req.user.school,
        session: new ObjectId(session),
      }).populate("session");
    } else {
      terms = await Term.find({
        school: req.user.school,
      });
    }

    if (_.isEmpty(terms)) {
      return res.status(200).json([]);
    }
    const modifiedTerms = terms.map((term) => {
      return {
        _id: term?._id,
        sessionId: term?.session,
        term: term?.term,
        name: `${term?.academicYear} ${term?.term}`,
        academicYear: term?.academicYear,
        active: term?.active,
        createdAt: term?.createdAt,
      };
    });

    const sortedTerms = _.sortBy(modifiedTerms, ["academicYear", "term"]);

    res.status(200).json(sortedTerms);
  })
);

//@GET School Term by id
router.get(
  "/valid",
  asyncHandler(async (req, res) => {
    const { academicYear, term } = req.query;
    //Find if a term already exits
    const exists = await Term.findOne({
      school: req.user.school,
      academicYear,
      term,
      active: true,
    });

    //Check if term already exists
    if (!_.isEmpty(exists)) {
      return res
        .status(400)
        .json(
          `Academic year ${academicYear} with the term ${term} already exists.`
        );
    }

    res.status(200).json(exists);
  })
);
//@GET School Term by id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const term = await Term.findById(id).populate("session");

    const modifiedTerm = {
      core: {
        name: term?.name,
        from: term?.from,
        to: term?.to,
        term: term?.term,
        academicYear: term?.academicYear,
        vacationDate: term?.vacationDate,
        reOpeningDate: term?.reOpeningDate,
        isPromotionTerm: term?.isPromotionTerm,
      },
      report: term?.report,
      headmaster: term?.headmaster,
      exams: term?.exams,
      termId: term._id,
      sessionId: term?.session?._id,
      active: term?.active,
    };
    res.status(200).json(modifiedTerm);
  })
);

//Add new School Term
router.post(
  "/",
  verifyJWT,
  asyncHandler(async (req, res) => {
    const { core, levels, students, exams, report } = req.body;

    if (!_.isEmpty(students)) {
      const existingIndexNumbers = _.flatMap(
        students,
        (student) => student?.data
      );
      const indexNumbers = _.compact(
        _.map(existingIndexNumbers, "indexnumber")
      );
      const existingStudents = await Student.find({
        school: req.user.school,
        indexnumber: {
          $in: indexNumbers,
        },
      }).select("indexnumber");

      if (!_.isEmpty(existingStudents)) {
        return res.status(400).json({
          isDuplicateError: true,
          message: `ID of some students already exist.Please check and try again.`,
          data: _.map(existingStudents, "indexnumber"),
        });
      }
    }

    const { name, from, to, term, isPromotionTerm } = core;
    const { grade, ...examsRest } = exams;

    const academicStart = moment(new Date(from)).year();
    const academicEnd = moment(new Date(to)).year();
    const academicYear = `${academicStart}/${academicEnd}`;

    //Find if a term already exits
    const exists = await Term.findOne({
      school: req.user.school,
      academicYear,
      term,
      active: true,
    });

    //Check if term already exists
    if (!_.isEmpty(exists)) {
      return res
        .status(400)
        .json(
          `Academic year ${academicYear} with the term ${term} already exists.`
        );
    }

    //Find if a session already exits
    const session = await Session.findOne({
      school: req.user.school,
      academicYear,
    });
    let sessionId = session?._id;

    if (_.isEmpty(session)) {
      //Create new Session
      const newSession = await Session.create({
        school: req.user.school,
        from: academicStart,
        to: academicEnd,
        academicYear,
        name,

        createdBy: req.user.id,
      });

      if (_.isEmpty(newSession)) {
        return res
          .status(404)
          .json("Error creating new session.Try again later!!!");
      }
      sessionId = newSession._id;
    }

    //Create new term with new Session id
    const newTerm = await Term.create({
      school: req.user.school,
      session: sessionId,
      name,
      from,
      to,
      term,
      academicYear,
      vacationDate: to,
      reOpeningDate: to,
      isPromotionTerm,
      exams: {
        scorePreference: "50/50",
        ...examsRest,
      },
      report,
    });

    if (_.isEmpty(newTerm)) {
      return res
        .status(404)
        .json("Error creating new session.Try again later!!!");
    }

    let grades = null;
    if (!_.isEmpty(grade)) {
      const itGradeExisting = await Grade.findOne({ name: grade.name });

      if (_.isEmpty(itGradeExisting)) {
        const newGrade = await Grade.create({
          ...grade,
          school: req.user.school,
          session: sessionId,
          term: newTerm._id,
          createdBy: req.user.id,
        });

        grades = newGrade?._id;
      } else {
        grades = itGradeExisting?._id;
      }
    }

    if (!_.isEmpty(levels)) {
      // create levels
      const modifiedLevels = levels.map(async (level) => {
        const student = students.find((student) =>
          _.isEqual(student?.class, level)
        );

        const modifiedStudents = student?.data?.map((student) => {
          return {
            ...student,
            school: req.user.school,
            createdBy: req.user.id,
          };
        });

        let studentIds = [];
        if (student?.isPrevious) {
          studentIds = _.map(student?.data, "_id");
        } else {
          const createdStudents = await Student.insertMany(modifiedStudents, {
            ordered: false,
          });
          studentIds = _.map(createdStudents, "_id");
        }

        // update student data in the session
        const newLevel = await Level.create({
          session: sessionId,
          term: newTerm._id,
          level,
          students: studentIds,
          grades: grades._id,
          createdBy: req.user.id,
        });

        //Create Exams and fees details for each inserted Student
        const examsDetails = studentIds.map((student) => {
          return {
            session: sessionId,
            term: newTerm._id,
            level: newLevel?._id,
            student: student,
            createdBy: req.user.id,
          };
        });

        await Examination.insertMany(examsDetails);
        await CurrentFee.insertMany(examsDetails);

        return newLevel;
      });

      await Promise.all(modifiedLevels);
      return res.status(201).json("New Session created Successfully!!!");
    }

    res.status(201).json("New Session created Successfully!!!");
  })
);

//@PUT Update Existing School Session
router.put(
  "/",
  asyncHandler(async (req, res) => {
    const { termId, ...rest } = req.body;
    console.log(req.body);
    const modifiedTerm = await Term.findByIdAndUpdate(termId, {
      $set: {
        ...rest?.core,
        exams: {
          ...rest?.exams,
        },
        report: {
          ...rest?.report,
        },
        headmaster: {
          ...rest?.headmaster,
        },
      },
    });

    // const modifiedTerm = await knex("terms")
    //   .where({ _id: id })
    //   .update({
    //     ...rest,
    //   });

    if (_.isEmpty(modifiedTerm)) {
      return res
        .status(404)
        .send("Error updating session info.Try again later");
    }

    res.status(201).json("Changes Saved!");
  })
);

//Enable or Disable a particular Term
router.put(
  "/account",
  asyncHandler(async (req, res) => {
    const { id, active } = req.body;

    const updatedTerm = await Term.findByIdAndUpdate(
      id,
      { $set: { active } },
      {
        new: true,
      }
    );

    if (_.isEmpty(updatedTerm)) {
      return res.status(404).json("Error updating Session info");
    }

    res.json(
      updatedTerm.active === true ? "Session  enabled" : "Session  disabled"
    );
  })
);

router.put(
  "/remove",
  asyncHandler(async (req, res) => {
    const sessions = req.body;
    console.log(sessions);
    const deletedTerms = await Term.deleteMany(
      {
        _id: { $in: sessions },
      },
      {
        new: true,
      }
    );

    if (_.isEmpty(deletedTerms)) {
      return res
        .status(404)
        .json("Error removing session info.Try again later");
    }

    res.status(201).json(" Session have been removed successfully!!!");
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deletedTerm = await Term.findByIdAndDelete(id);

    // const deletedTerm = await knex("terms").where("_id", id).del();

    if (_.isEmpty(deletedTerm)) {
      return res
        .status(404)
        .json("Error removing session info.Try again later");
    }

    res.status(201).json(" Session have been removed successfully!!!");
  })
);

module.exports = router;
