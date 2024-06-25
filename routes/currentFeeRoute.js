const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const CurrentFee = require('../models/currentFeeModel');
const _ = require('lodash');
const moment = require('moment');
const {
  Types: { ObjectId },
} = require('mongoose');
const { currencyConverter } = require('../config/currencyConverter');

//@GET All school current fees
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const currentFees = await CurrentFee.find();
    res.status(200).json(currentFees);
  })
);

//@GET All school current fees summary
router.post(
  '/summary',
  asyncHandler(async (req, res) => {
    const { session, term, from, to } = req.body;

    const currentFees = await CurrentFee.find({
      session: new ObjectId(session),
      term: new ObjectId(term),
    }).select('payment');

    //GET all payments
    const allPayments = currentFees.flatMap(({ payment }) => payment);

    ///GET all fees for today
    const feesForToday = _.filter(allPayments, ({ date }) =>
      moment(date).isSame(moment(), 'day')
    );
    const totalfeesForToday = _.sumBy(feesForToday, 'paid');

    ///GET all fees for the month
    const feesForMonth = _.filter(allPayments, ({ date }) => {
      return (
        moment(date).isSame(moment(), 'month') &&
        moment(date).isSame(moment(), 'year')
      );
    });
    const totalfeesForMonth = _.sumBy(feesForMonth, 'paid');

    // ///GET all fees for the term
    // const feesFrom = moment(from).format('L');
    // const feesTo = moment(to).format('L');

    // const feesForTerm = _.filter(allPayments, ({ date }) => {
    //   const feeDate = moment(date).format('L');

    //   return feeDate >= feesFrom && feeDate <= feesTo;
    // });

    ///GET all fees for the term
    const feesFrom = moment(from);
    const feesTo = moment(to);

    const feesForTerm = _.filter(allPayments, ({ date }) => {
      return moment(date).isBetween(feesFrom, feesTo, null, '[]');
    });

    const totalfeesForTerm = _.sumBy(feesForTerm, 'paid');

    ///GET all fees for the month
    const feesForYear = _.filter(allPayments, ({ date }) => {
      return moment(date).isSame(moment(), 'year');
    });
    const totalfeesForYear = _.sumBy(feesForYear, 'paid');

    const feeSummary = {
      today: totalfeesForToday || 0,
      month: totalfeesForMonth || 0,
      term: totalfeesForTerm || 0,
      year: totalfeesForYear || 0,
    };

    res.status(200).json(feeSummary);
  })
);

//@GET School current Fees for a particular level id
router.post(
  '/level',
  asyncHandler(async (req, res) => {
    const { level, term } = req.body;
    //console.log(level, term);
    const currentFee = await CurrentFee.find({
      term: new ObjectId(term),
      level: new ObjectId(level),
    }).select('payment');

    if (_.isEmpty(currentFee)) {
      return res.status(200).json(0);
    }

    const allPaymentsByLevel = _.sumBy(
      currentFee.flatMap((fee) => fee.payment),
      'paid'
    );

    res.status(200).json(allPaymentsByLevel);
  })
);

//@GET All school current fees
router.get(
  '/day',
  asyncHandler(async (req, res) => {
    const { session, term, date } = req.query;
    //console.log(date);

    const currentFees = await CurrentFee.find({
      session: new ObjectId(session),
      term: new ObjectId(term),
    })
      .populate('student')
      .populate('level')
      .select({ student: 1, level: 1, payment: 1 });

    if (_.isEmpty(currentFees)) {
      return res.status(200).json([]);
    }

    const studentPaymentForOnADate = [];
    currentFees.map(({ student, level, payment }) => {
      const paidForToday = payment.filter(
        (payment) =>
          moment(new Date(payment.date)).format('L') ===
          moment(new Date(date)).format('L')
      );

      if (!_.isEmpty(paidForToday)) {
        studentPaymentForOnADate.push({
          student: student?.fullName,
          level: level?.levelName,
          payment: paidForToday,
        });
      }
    });

    res.status(200).json(studentPaymentForOnADate);
  })
);

// @GET all recently paid fees
router.get(
  '/recent',
  asyncHandler(async (req, res) => {
    const { session, term } = req.query;
    
      const recentFeePayment = await CurrentFee.find({
        session: new ObjectId(session),
        term: new ObjectId(term),
      })
        .populate('level')
        .populate('student')
        .sort({ updatedAt: -1 })
        .limit(10);
      const modifiedFees = recentFeePayment.flatMap(
        ({ _id, level, student, payment }) => {
          return payment.map(({ date, paid, outstanding }) => {
            return {
              _id,
              date,
              student: student?.fullName,
              level: level?.levelName,
              paid: currencyConverter(paid),
              outstanding: currencyConverter(outstanding),
            };
          });
        }
      );
    
    // console.log(modifiedFees);

    res.status(200).json(_.orderBy(modifiedFees, 'date', 'desc'));
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const currentFee = await CurrentFee.findById(req.params.id);
    res.status(200).json(currentFee);
  })
);

//GET Student fee History
router.post(
  '/history',
  asyncHandler(async (req, res) => {
    const { sessionId, termId, levelId, studentId, feeId } = req.body;
    let studentFeeHistory = {};

    //Find All Student fee info
    if (feeId) {
      studentFeeHistory = await CurrentFee.findById(feeId)
        .populate('student')
        .populate('term')
        .populate('level')
        .populate('fee');
    } else {
      studentFeeHistory = await CurrentFee.findOne({
        session: new ObjectId(sessionId),
        term: new ObjectId(termId),
        level: new ObjectId(levelId),
        student: new ObjectId(studentId),
      })
        .populate('student')
        .populate('term')
        .populate('level')
        .populate('fee');
    }

    if (_.isEmpty(studentFeeHistory)) {
      return res.status(200).json({});
    }
    // //console.log(studentFeeHistory);
    const { student, term, level, payment } = studentFeeHistory;

    const modifiedFeeHistory = {
      fullName: student.fullName,
      profile: student?.profile,
      term: term.term,
      levelType: `${level?.level?.name}${level?.level?.type}`,
      payment: _.sortBy(payment, 'date'),
    };

    res.status(200).json(modifiedFeeHistory);
  })
);

//GET Student All fee History
router.get(
  '/history/all',
  asyncHandler(async (req, res) => {
    const { student } = req.query;

    //Find All Student fee info
    const studentFeeHistory = await CurrentFee.find({
      student: new ObjectId(student),
    })
      .populate('student')
      .populate('session')
      .populate('term')
      .populate('level')
      .populate('fee');

    if (_.isEmpty(studentFeeHistory)) {
      return res.status(200).json({});
    }

    const feeHistory = studentFeeHistory.map(
      ({ _id, term, level, session }) => {
        return {
          id: _id,
          academicYear: session?.academicYear,
          term: term?.term,
          levelId: level?._id,
          levelType: level?.levelName,
        };
      }
    );

    // //console.log(feeHistory);

    //Group selected terms in ascending order
    const groupedByTerms = _.groupBy(
      _.sortBy(feeHistory, 'term'),
      'academicYear'
    );

    const currentStudent = studentFeeHistory[0]?.student;

    const allFeeHistory = {
      studentId: currentStudent?._id,
      fullName: student.fullName,
      profile: currentStudent.profile,
      fees: Object.entries(groupedByTerms),
    };

    res.status(200).json(allFeeHistory);
    // res.status(200).json(Object.entries(groupedByTerms));
  })
);

//GET Student fee info
router.post(
  '/student',
  asyncHandler(async (req, res) => {
    const { session, term, level, student } = req.body;
    let allStudentFee = [];

    //Find All Student fee info
    allStudentFee = await CurrentFee.find({
      student: new ObjectId(student),
    })
      .populate('fee')
      .select('payment')
      .select('createdAt');

    //console.log(allStudentFee);

    ///GET all fees for the terms
    const allFees = [];
    const allPaidAmount = [];
    const allFeesBalance = [];

    //GET total fees paid for each term and remaining
    const modifiedStudentFees = allStudentFee.map(
      ({ _id, fee, payment, createdAt }) => {
        //fees
        const fees = _.sumBy(fee?.amount, 'amount');
        allFees.push(fees);

        ///all fees paid
        const amountPaid = _.sumBy(payment, 'paid');
        allPaidAmount.push(amountPaid);

        //all fees balance
        const balance = _.sumBy(payment, 'balance');
        allFeesBalance.push(balance);

        //outstanding fees
        const remaining = fees - amountPaid;
        return {
          id: _id,
          fees,
          amountPaid,
          remaining: remaining < 0 ? 0 : remaining,
          balance,
          createdAt,
        };
      }
    );

    //SUM All fees for all terms
    const totalFees = _.sum(allFees);
    const totalAmountPaid = _.sum(allPaidAmount);
    // const totalBalance = _.sum(allFeesBalance);
    const totalArreas = totalFees - totalAmountPaid;

    //Find Student Current fee info
    const currentStudentFee = await CurrentFee.findOne({
      session: new ObjectId(session),
      term: new ObjectId(term),
      level: new ObjectId(level),
      student: new ObjectId(student),
    })
      .populate('fee')
      .select('payment')
      .select('createdAt');

    //Check if current fee info is empty
    if (_.isEmpty(currentStudentFee)) {
      return res.status(200).json({
        all: modifiedStudentFees,
        current: {},
        totalFees,
        totalAmountPaid,
        totalArreas,
      });
    }

    //filter out prevoius terms fees
    const filteredFees = modifiedStudentFees.filter(
      ({ createdAt }) => createdAt < currentStudentFee.createdAt
    );

    //GET total arreas of student for previous terms without current term
    const previousFees = _.sumBy(filteredFees, 'fees');
    const previousAmountPaid = _.sumBy(filteredFees, 'amountPaid');
    const previousArreas = previousFees - previousAmountPaid;

    //Fees for current term
    const fees = _.sumBy(currentStudentFee.fee?.amount, 'amount');
    const amountPaid = _.sumBy(currentStudentFee.payment, 'paid');
    const remainingFees = fees - amountPaid;
    const balance = _.sumBy(currentStudentFee.payment, 'balance');

    const modifiedStudentCurrentFees = {
      id: currentStudentFee._id,
      fees,
      amountPaid,
      remaining: remainingFees < 0 ? 0 : remainingFees,
      balance,
      createdAt: currentStudentFee.createdAt,
    };

    res.status(200).json({
      all: filteredFees,
      current: modifiedStudentCurrentFees,
      totalFees: totalFees,
      totalAmountPaid: totalAmountPaid,
      totalArreas: previousArreas,
    });
  })
);

//Add new School current Fees
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { session, term, level, student, payment } = req.body;

    //Find Student Cuurent fee info
    const currentStudentFee = await CurrentFee.findOne({
      session: new ObjectId(session),
      term: new ObjectId(term),
      level: new ObjectId(level),
      student: new ObjectId(student),
    });

    if (_.isEmpty(currentStudentFee)) {
      //Create new current Fees
      const currentFee = await CurrentFee.create(req.body);

      //if Error adding new fees
      if (!currentFee) {
        return res
          .status(404)
          .send('Error creating new CurrentFee.Try again later');
      }

      return res.status(200).json(currentFee);
    }

    //Update existing fees for term
    const modifiedCurrentFee = await CurrentFee.findByIdAndUpdate(
      currentStudentFee._id,
      {
        $push: {
          payment: payment[0],
        },
      },
      {
        new: true,
      }
    );

    if (!modifiedCurrentFee) {
      return res
        .status(404)
        .json('Error adding new  Fees info.Try again later');
    }

    return res.status(200).json(modifiedCurrentFee);
  })
);

//@PUT Update Existing School current Fees
router.put(
  '/',
  asyncHandler(async (req, res) => {
    const modifiedCurrentFee = await CurrentFee.findByIdAndUpdate(
      req.body.id,
      req.body
    );

    if (!modifiedCurrentFee) {
      return res
        .status(404)
        .send('Error updating current Fees info.Try again later');
    }

    res.send(modifiedCurrentFee);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    await CurrentFee.findByIdAndRemove(id);

    res.sendStatus(201);
  })
);

module.exports = router;
