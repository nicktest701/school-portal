const router = require("express").Router();
const _ = require("lodash");
const asyncHandler = require("express-async-handler");
const { randomUUID } = require("crypto");
const Term = require("../models/termModel");
const Session = require("../models/sessionModel");
const {
  Types: { ObjectId },
} = require("mongoose");
const knex = require("../db/knex");

//@GET All school Terms
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const session = req.query?.session;

    let terms = [];
    if (session) {
      terms = await Term.find({
        session: new ObjectId(session),
      }).populate("session");

      // const terms_ = await knex("session_term_info")
      //   .select(
      //     "termId",
      //     "sessionId",
      //     "academicYear",
      //     "term",
      //     "from",
      //     "to",
      //     "vacationDate",
      //     "reopeningDate as reOpeningDate",
      //     "termActive as active",
      //     "termCreatedAt as createdAt",
      //     "userName as createdBy"
      //   )
      //   .where({
      //     sessionId: session,
      //     sessionSchoolId: "d8705acb-b88e-4ebb-adc3-54feea43ceed",
      //   })
      //   .orderByRaw("academicYear,term");
    } else {
      terms = await Term.find().populate("session");

      // const terms_2 = await knex("session_term_info")
        // .select(
        //   "termId",
        //   "sessionId",
        //   "academicYear",
        //   "term",
        //   "from",
        //   "to",
        //   "vacationDate",
        //   "reopeningDate as reOpeningDate",
        //   "termActive as active",
        //   "termCreatedAt as createdAt",
        //   "userName as createdBy"
        // )
        // .where({
        //   sessionSchoolId: "d8705acb-b88e-4ebb-adc3-54feea43ceed",
        // })
        // .orderByRaw("academicYear,term");
    }
    // const terms = await Term.find({ active: true }).populate('session');

    if (_.isEmpty(terms)) {
      return res.status(200).json([]);
    }

    const modifiedTerms = terms.map((term) => {
      return {
        termId: term._id,
        sessionId: term?.session?._id,
        academicYear: term?.session?.academicYear,
        term: term.term,
        from: term?.from,
        to: term?.to,
        vacationDate: term.vacationDate,
        reOpeningDate: term.reOpeningDate,
        active: term.active,
        createdAt: term?.createdAt,
      };
    });

    const sortedTerms = _.sortBy(modifiedTerms, ["academicYear", "term"]);

    res.status(200).json(sortedTerms);
  })
);

//@GET School Term by id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const sessionId = req.query.sessionId;

    // const term = await knex("session_term_info").select("*").where({
    //   sessionId,
    //   active: true,
    // });

    const term = await Term.findOne({
      session: new ObjectId(sessionId),
      active: true,
    }).populate("session");

    res.status(200).json(term);
  })
);

//Add new School Term
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { from, to, vacationDate, reOpeningDate, academicYear, term } =
      req.body;

    //Find if a term already exits
    const exists = await Term.find({
      academicYear,
      term,
      active: true,
    });

    // const termExists = await knex("session_term_info")
    //   .where({
    //     term,
    //     academicYear,
    //     termActive: true,
    //   })
    //   .select("term", "academicYear", "termActive");

    //Check if term already exists

    if (!_.isEmpty(exists)) {
      return res.status(400).json("Session already exists.");
    }

    //Find if a session already exits
    const session = await Session.findOne({ academicYear });
    // const session_ = await knex("sessions")
    //   .where("academicYear", academicYear)
    //   .select("_id")
    //   .limit(1);

    if (!_.isEmpty(session)) {
      const sessionId = session._id;
      req.body.session = sessionId;

      //Create new Session with existing session id
      const newTerm = await Term.create(req.body);

      const termID = randomUUID();
      // const newTerm_ = await knex("terms").insert({
      //   _id: termID,
      //   termStarts: from,
      //   name: term,
      //   termEnds: to,
      //   vacationDate,
      //   reopeningDate: reOpeningDate,
      //   sessionId: session_[0]?._id,
      //   createdBy: "7949d62c-fc40-4fc9-be60-e59df348f868",
      // });

      if (_.isEmpty(newTerm)) {
        return res
          .status(404)
          .json("Error creating new session.Try again later!!!");
      }

      return res.status(201).json("New Session created Successfully!!!");
    }

    //Create new Session
    const splittedAcademicYear = academicYear.split("/");

    const newSession = await Session.create({
      from: splittedAcademicYear[0],
      to: splittedAcademicYear[1],
      academicYear,
    });

    const sessionID = randomUUID();

    // const newSession_ = await knex("sessions").insert({
    //   _id: sessionID,
    //   sessionFrom: splittedAcademicYear[0],
    //   sessionTo: splittedAcademicYear[1],
    //   academicYear: req.body.academicYear,
    //   schoolId: "d8705acb-b88e-4ebb-adc3-54feea43ceed",
    //   createdBy: "7949d62c-fc40-4fc9-be60-e59df348f868",
    // });

    if (_.isEmpty(newSession)) {
      return res
        .status(404)
        .json("Error creating new session.Try again later!!!");
    }
    //Create new term with new Session id
    req.body.session = newSession._id;
    const newTerm = await Term.create(req.body);

    // const termID = randomUUID();
    // const newTerm_ = await knex("terms").insert({
    //   _id: termID,
    //   name: term,
    //   sessionId: sessionID,
    //   termStarts: from,
    //   termEnds: to,
    //   vacationDate,
    //   reopeningDate: reOpeningDate,
    //   createdBy: "7949d62c-fc40-4fc9-be60-e59df348f868",
    // });

    if (_.isEmpty(newTerm)) {
      return res
        .status(404)
        .json("Error creating new session.Try again later!!!");
    }

    res.status(201).json("New Session created Successfully!!!");
  })
);

//@PUT Update Existing School Session
router.put(
  "/",
  asyncHandler(async (req, res) => {
    const { id, ...rest } = req.body;
    const modifiedTerm = await Term.findByIdAndUpdate(id, rest);

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

    res
      .status(201)
      .json("Session information has been updated successfully!!!");
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

    // const updatedTerm = await knex("terms").where("_id", id).update({
    //   active,
    // });

    if (_.isEmpty(updatedTerm)) {
      return res.status(404).json("Error updating Session info");
    }

    res.json(
      updatedTerm.active === true ? "Session  enabled" : "Session  disabled"
    );
  })
);

// router.delete(
//   '/:id',
//   asyncHandler(async (req, res) => {
//     const id = req.params.id;
//     const deletedTerm = await Term.findByIdAndUpdate(id, {
//       $set: {
//         active: false,
//       },
//     });

//     if (_.isEmpty(deletedTerm)) {
//       return res
//         .status(404)
//         .json('Error removing session info.Try again later');
//     }

//     res.status(201).json(' Session have been removed successfully!!!');
//   })
// );

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deletedTerm = await Term.findByIdAndRemove(id);

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
