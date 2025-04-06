const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const Fee = require("../models/feeModel");
const Level = require("../models/levelModel");
const CurrentFee = require("../models/currentFeeModel");
const _ = require("lodash");
const {
  Types: { ObjectId },
} = require("mongoose");
const { currencyConverter } = require("../config/currencyConverter");

//@GET All school fees
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const fees = await Fee.find({
      school: req.user.school,
    }).populate({
      path: "level",
      select: "level"
    });
    if (_.isEmpty(fees)) return res.status(200).json([]);

    const modifiedFees = fees.map(({ _id, level, amount }) => {
      return {
        _id,
        level: level.level,
        fees: currencyConverter(_.sumBy(amount, "amount")),
        amount,
      };
    });

    res.status(200).json(modifiedFees);
  })
);



//@GET All school fees by session
router.get(
  "/all",
  asyncHandler(async (req, res) => {
    const { session, term } = req.query;

    const fees = await Fee.find({
      school: req.user.school,
      session,
      term,
    }).populate({
      path: "level",
      select: ["level", 'levelName', 'students']
    })

    //Check if null
    if (_.isEmpty(fees)) return res.status(200).json([]);

    const modifiedFees = fees.map(({ _id, level, amount }) => {
      const total = _.sumBy(amount, "amount");

      return {
        _id,
        noOfStudents: level?.noOfStudents,
        amount,
        levelId: level._id,
        level: level?.levelName,
        fee: total,
        fees: total,
        totalFees: Number(total * level?.noOfStudents),
      };
    });

    res.status(200).json(modifiedFees);
  })
);

//@GET  school fees by current level
router.post(
  "/current-level",
  asyncHandler(async (req, res) => {
    const { sessionId, termId, level } = req.body;

    const fees = await Fee.findOne({
      session: new ObjectId(sessionId),
      term: new ObjectId(termId),
      level: new ObjectId(level),
    }).populate("level");

    //Check if null
    if (_.isEmpty(fees)) return res.status(200).json({});

    const modifiedFees = {
      id: fees?._id,
      level: fees?.level.type,
      fees: _.sumBy(fees?.amount, "amount"),
      amount: fees?.amount,
    };

    res.status(200).json(modifiedFees);
  })
);



//@GET School Fees by id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const fee = await Fee.findById(req.params.id).populate("level");
    if (_.isEmpty(fee)) return res.status(200).json([]);

    const modifiedFee = {
      _id: fee._id,
      level: fee.level?.type,
      amount: fee.amount,
    };

    res.status(200).json(modifiedFee);
  })
);

//Add new School Fees
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { session, term, level } = req.body;

    const exists = await Fee.findOne({
      session,
      term,
      level
    });

    if (!_.isEmpty(exists)) {
      return res.status(400).send("Fees for this level already exists");
    }

    const fee = await Fee.create({
      school: req.user.school,
      ...req.body,
      createdBy: req.user.id
    });

    if (_.isEmpty(fee)) {
      return res.status(404).send("Error creating new Fee.Try again later");
    }

    const currentLevel = await Level.findByIdAndUpdate(
      level,
      {
        $set: {
          fee: fee?._id,
        },
      },
      {
        new: true,
      }
    ).select('students');


    if (!_.isEmpty(currentLevel.students)) {
      const modifiedStudents = currentLevel?.students.map(async (student) => {
        return await CurrentFee.findOneAndUpdate({
          session,
          term,
          level,
          student
        }, {
          $set: {
            fee: fee?._id
          }
        }, {
          new: true,
          upsert: true

        })
      })
      await Promise.all(modifiedStudents)

    }
    res.status(201).json("New Fee created");
  })
);

//@PUT Update Existing School Fees
router.put(
  "/",
  asyncHandler(async (req, res) => {
    const modifiedFee = await Fee.findByIdAndUpdate(req.body._id, {
      amount: req.body.amount,
    });

    if (_.isEmpty(modifiedFee)) {
      return res.status(404).send("Error updating Fees info.Try again later");
    }

    res.status(201).json("Fee details has been updated successfully!!!");
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    await Fee.findByIdAndDelete(id);

    res.status(201).json("Fee has been removed successfully");
  })
);


module.exports = router;
