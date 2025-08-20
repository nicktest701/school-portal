const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const CurrentFee = require("../models/currentFeeModel");
const Fee = require("../models/feeModel");
const _ = require("lodash");
const moment = require("moment");
const { randomUUID } = require("crypto");
const {
  Types: { ObjectId },
} = require("mongoose");
const { currencyConverter } = require("../config/currencyConverter");
const {
  processFeeForTerm,
  processWeeklyFees,
  getTotalFeesForWeek,
} = require("../config/helper");
const {
  getTotalPaidFees,
  getFeePaymentTrend,
  getTopFeePayments,
} = require("../config/helpers/fees");

//@GET All school current fees
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const currentFees = await CurrentFee.find();
    res.status(200).json(currentFees);
  })
);

//@GET All school current fees
router.get(
  "/day",
  asyncHandler(async (req, res) => {
    const { session, term, date } = req.query;

    const currentFees = await CurrentFee.find({
      session: new ObjectId(session),
      term: new ObjectId(term),
    })
      .populate({
        path: "student",
        select: ["firstname", "surname", "othername"],
      })
      .populate({
        path: "level",
        select: "level",
      })
      .select("payment");

    if (_.isEmpty(currentFees)) {
      return res.status(200).json([]);
    }

    const studentPaymentForOnADate = currentFees.map(
      ({ student, level, payment }) => {
        const paidForToday = payment.filter((pay) => {
          return moment(new Date(pay?.date || pay?.createdAt)).isSame(
            moment(new Date(date)),
            "day"
          );
        });
        if (_.isEmpty(paidForToday)) return null;

        const results = paidForToday?.map((fee) => {
          return {
            student: student?.fullName,
            level: level?.levelName,
            payment: fee,
          };
        });

        return results;
      }
    );

    res.status(200).json(_.compact(_.flatMapDeep(studentPaymentForOnADate)));
  })
);

//GET Student fee History
router.get(
  "/history",
  asyncHandler(async (req, res) => {
    const { studentId } = req.query;

    const studFees = await CurrentFee.find({
      student: studentId,
    })
      .sort({ createdAt: -1 })
      .populate("student")
      .populate({
        path: "term",
        select: ["term", "academicYear"],
      })
      .populate({
        path: "level",
        select: ["level"],
      })
      .select("payment");

    const modifiedFees = studFees.map(async (currentFee) => {
      const fee = await Fee.findOne({
        level: currentFee?.level?._id,
        term: currentFee?.term?._id,
      });

      return {
        _id: currentFee?._id,
        academicYear: currentFee?.term?.academicYear,
        term: currentFee?.term?.term,
        level: currentFee?.level?.levelName,
        fees: _.sumBy(fee?.amount, "amount"),
        payment: currentFee?.payment,
        paid: _.sumBy(currentFee?.payment, "paid"),
      };
    });
    const fees = await Promise.all(modifiedFees);

    res.status(200).json(fees);
  })
);

//GET Student fee History
router.get(
  "/current/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const studFees = await CurrentFee.find({
      student: id,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "term",
        select: ["term", "academicYear"],
      })
      .populate({
        path: "level",
        select: ["level", "active"],
      })
      .select(["student", "payment"]);

    let activeLevel = null;

    const modifiedFees = studFees.map(async (currentFee) => {
      const fee = await Fee.findOne({
        level: currentFee?.level?._id,
        term: currentFee?.term?._id,
      });

      const fees = _.sumBy(fee?.amount, "amount");
      const paid = _.sumBy(currentFee?.payment, "paid");
      if (currentFee?.level?.active) {
        activeLevel = {
          term: currentFee?.term?.term,
          level: currentFee?.level?.levelName,
          fees: fees,
          paid: paid,
          arrears: fees - paid,
          percentage: (paid / fees) * 100,
        };
      }
      return {
        _id: currentFee?._id,
        academicYear: currentFee?.term?.academicYear,
        term: currentFee?.term?.term,
        level: currentFee?.level?.levelName,
        payment: currentFee?.payment,
        fees: fees,
        paid: paid,
      };
    });
    const fees = await Promise.all(modifiedFees);

    //Sum of fees for each term
    const totalFees = _.sumBy(fees, "fees");
    const totalPaid = getTotalPaidFees(fees);
    const totalArrears = totalFees - totalPaid;
    const feePaymentTrend = getFeePaymentTrend(fees);
    const topFeePayments = getTopFeePayments(fees);

    const lastFeePaid = _.first(topFeePayments);

    res.status(200).json({
      totalFees,
      totalPaid,
      lastFeePaid,
      totalArrears,
      feePaymentTrend,
      topFeePayments,
      activeLevel,
    });
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const currentFee = await CurrentFee.findById(req.params.id);
    res.status(200).json(currentFee);
  })
);
//@GET All school current fees summary
router.post(
  "/summary",
  asyncHandler(async (req, res) => {
    const { session, term, from, to } = req.body;

    const currentFees = await CurrentFee.find({
      session,
      term,
    })
      .populate({
        path: "level",
        select: ["level"],
      })
      .populate({
        path: "student",
        select: ["firstname", "surname", "othername"],
      })
      .sort({ updatedAt: -1 })
      .select("payment");

    //Recent Payments
    const recentFees = _.take(
      currentFees.flatMap(({ _id, level, student, payment }) => {
        return payment.map(({ createdAt, paid, outstanding }) => {
          return {
            _id,
            date: createdAt,
            student: student?.fullName,
            level: level?.levelName,
            paid: currencyConverter(paid),
            outstanding: currencyConverter(outstanding),
          };
        });
      }),
      10
    );

    //GET all payments
    const allPayments = currentFees.flatMap(({ payment }) => payment);

    const monthlyProjection = processFeeForTerm(from, to, allPayments);
    const weeklyProjection = processWeeklyFees(allPayments);

    ///GET all fees for today
    const feesForToday = _.filter(allPayments, ({ createdAt }) =>
      moment(new Date(createdAt)).isSame(moment(), "day")
    );
    const totalfeesForToday = _.sumBy(feesForToday, "paid");

    ///GET all fees for the month
    const feesForMonth = _.filter(allPayments, ({ createdAt }) => {
      return (
        moment(new Date(createdAt)).isSame(moment(), "month") &&
        moment(new Date(createdAt)).isSame(moment(), "year")
      );
    });
    const totalfeesForMonth = _.sumBy(feesForMonth, "paid");

    ///GET all fees for the term
    const feesFrom = moment(new Date(from));
    const feesTo = moment(new Date(to));

    const feesForTerm = _.filter(allPayments, ({ createdAt }) => {
      return moment(new Date(createdAt)).isBetween(
        feesFrom,
        feesTo,
        null,
        "[]"
      );
    });
    const totalfeesForTerm = _.sumBy(feesForTerm, "paid");

    ///GET all fees for the week
    const totalfeesForWeek = getTotalFeesForWeek(allPayments);

    const feeSummary = {
      recentFees: _.orderBy(recentFees, "date", "desc"),
      today: totalfeesForToday || 0,
      month: totalfeesForMonth || 0,
      term: totalfeesForTerm || 0,
      week: totalfeesForWeek || 0,
      monthlyProjection,
      weeklyProjection,
    };

    res.status(200).json(feeSummary);
  })
);

//@GET School current Fees for a particular level id
router.post(
  "/level",
  asyncHandler(async (req, res) => {
    const { level, term } = req.body;
    //console.log(level, term);
    const currentFee = await CurrentFee.find({
      term: new ObjectId(term),
      level: new ObjectId(level),
    }).select("payment");

    if (_.isEmpty(currentFee)) {
      return res.status(200).json(0);
    }

    const allPaymentsByLevel = _.sumBy(
      currentFee.flatMap((fee) => fee.payment),
      "paid"
    );

    res.status(200).json(allPaymentsByLevel);
  })
);

//GET Student fee info
router.post(
  "/student",
  asyncHandler(async (req, res) => {
    const { session, term, level, student } = req.body;

    let previous = {
      fees: 0,
      paid: 0,
      remaining: 0,
    };

    //Find All Student fee info
    const studentPreviousFees = await CurrentFee.find({
      student,
      level: { $ne: level },
    }).select(["payment", "level"]);

    if (!_.isEmpty(studentPreviousFees)) {
      //GET total fees paid for each term and remaining
      const modifiedStudentFees = studentPreviousFees.map(
        async ({ level, payment }) => {
          const levelFee = await Fee.findOne({
            level: level,
          }).select("amount");

          //fees
          const fees = _.sumBy(levelFee?.amount, "amount");

          ///all fees paid
          const paid = _.sumBy(payment, "paid");

          //outstanding fees
          const remaining = fees - paid;
          return {
            fees,
            paid,
            remaining: remaining < 0 ? 0 : remaining,
          };
        }
      );
      const previousFees = await Promise.all(modifiedStudentFees);

      previous = {
        fees: _.sum(previousFees?.fees),
        paid: _.sum(previousFees?.paid),
        remaining: _.sum(previousFees?.remaining),
      };
    }

    //Find Student Current fee info
    let currentStudentFee = await CurrentFee.findOne({
      session: new ObjectId(session),
      term: new ObjectId(term),
      level: new ObjectId(level),
      student: new ObjectId(student),
    }).select("payment");

    //Check if current fee info is empty
    if (_.isEmpty(currentStudentFee)) {
      //If empty, create new current fee info
      currentStudentFee = await CurrentFee.create({
        session: new ObjectId(session),
        term: new ObjectId(term),
        level: new ObjectId(level),
        student: new ObjectId(student),
        payment: [],
        createdBy: req.user.id,
      }).select("payment");
    }

    //Get current level fee history
    const currentLevelFee = await Fee.findOne({
      level,
    }).select("amount");

    //fees
    const fees = _.sumBy(currentLevelFee?.amount, "amount");
    ///all fees paid
    const amountPaid = _.sumBy(currentStudentFee?.payment, "paid");

    //outstanding fees
    const remaining = fees - amountPaid;

    res.status(200).json({
      current: {
        _id: currentStudentFee?._id,
        fees: fees,
        paid: amountPaid,
        remaining: remaining < 0 ? 0 : remaining,
      },
      previous,
      totalFees: Number(fees) + Number(previous?.remaining),
      totalOutstanding: Number(remaining) + Number(previous?.remaining),
    });
  })
);

//Add new School current Fees
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { _id, payment } = req.body;

    const newPayment = {
      ...payment,
      createdAt: new Date(),
      issuerID: req.user.id,
      issuerName: req.user?.fullname,
      id: randomUUID(),
    };

    //Create new current Fees
    const currentFee = await CurrentFee.findByIdAndUpdate(
      _id,
      {
        $push: {
          payment: newPayment,
        },
      },
      {
        new: true,
      }
    );
    //if Error adding new fees
    if (!currentFee) {
      return res
        .status(404)
        .send("Error creating new CurrentFee.Try again later");
    }

    res.status(200).json(newPayment);
  })
);

//@PUT Update Existing School current Fees
router.put(
  "/",
  asyncHandler(async (req, res) => {
    const modifiedCurrentFee = await CurrentFee.findByIdAndUpdate(
      req.body.id,
      req.body
    );

    if (!modifiedCurrentFee) {
      return res
        .status(404)
        .send("Error updating current Fees info.Try again later");
    }

    res.send(modifiedCurrentFee);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    await CurrentFee.findByIdAndDelete(id);

    res.sendStatus(201);
  })
);

module.exports = router;
