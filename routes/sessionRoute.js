const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const Session = require("../models/sessionModel");
const _ = require("lodash");

//@GET All school sessions
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const sessions = await Session.find();

    // const sessions_ = await knex("sessions").select("*");

    res.status(200).json(sessions);
  })
);

//@GET School Session by id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const session = await Session.findById(req.params.id);

    // const session_ = await knex("sessions")
    //   .where("_id", req.params.id)
    //   .limit(1);

    res.status(200).json(session);
  })
);

//Add new School Session
router.post(
  "/",
  asyncHandler(async (req, res) => {
    //Create new Session
    const session = await Session.create(req.body);

    // const sessionID = randomUUID();
    // const session_ = await knex("sessions").insert({
    //   _id: sessionID,
    //   ...req.body,
    // });
  

    if (!session) {
      return res.status(404).send("Error creating new session.Try again later");
    }
    res.send(session);
  })
);

//@PUT Update Existing School Session
router.put(
  "/",
  asyncHandler(async (req, res) => {
    const { id, ...rest } = req.body;
    const modifiedSession = await Session.findByIdAndUpdate(id, rest);

    // const modifiedSession_ = await knex("sessions")
    //   .where("_id", id)
    //   .update(rest);
  

    if (!modifiedSession) {
      return res
        .status(404)
        .send("Error updating session info.Try again later");
    }

    res.send(modifiedSession);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    await Session.findByIdAndDelete(id);
    // await knex("sessions").where("_id", id).del();

    res.sendStatus(204);
  })
);

module.exports = router;
