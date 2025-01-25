const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const Subject = require('../models/subjectModel');
const _ = require('lodash');

//@GET All school subjects
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const subjects = await Subject.find();
    // console.log(subjects)
    if (_.isEmpty(subjects)) {
      return res.status(200).send([]);
    }

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
      'PHYSICAL EDUCATION',
      'PHYSICAL & HEALTH EDUCATION',
      'READING',
      'WRITING',
      'MUSIC & DANCE',
      'ORALS & RHYMES',
    ];

    const modifiedSubjects = subjects.sort(
      (a, b) =>
        SUBJECT_OPTIONS.indexOf(a.name) - SUBJECT_OPTIONS.indexOf(b.name)
    );

    res.status(200).json(modifiedSubjects);
  })
);

//@GET School Subject by id
router.get(
  '/:name',
  asyncHandler(async (req, res) => {
    const { name } = req.params;
    const subject = await Subject.findOne({ name });
    res.status(200).json(subject);
  })
);

//Add new School Subject
router.post(
  '/',
  asyncHandler(async (req, res) => {
    //Create new Subject
    const subjects = req.body;

    const modifiedSubjects = subjects.map(async (subject) => {
      return await Subject.findOneAndUpdate({ name: subject?.name }, subject, {
        new: true,
        upsert: true,
      });
    });

    const updatedSubjects = await Promise.allSettled(modifiedSubjects);

    if (_.isEmpty(updatedSubjects)) {
      return res
        .status(404)
        .send('Error creating new subjects.Try again later');
    }
    //console.log(subject);
    res.send('Subjects Saved!');
  })
);

//@PUT Update Existing School Subject
router.put(
  '/',
  asyncHandler(async (req, res) => {
    const modifiedSubject = await Subject.findByIdAndUpdate(
      req.body._id,
      {
        $set: {
          code: req.body.code,
          name: req.body.name,
          isCore: req.body.isCore,
        },
      },
      {
        new: true,
      }
    );

    if (_.isEmpty(modifiedSubject)) {
      return res
        .status(404)
        .send('Error updating subject info.Try again later');
    }

    res.status(201).send('Changes Saved');
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    await Subject.findByIdAndDelete(id);

    res.status(204).send('Subject removed');
  })
);

module.exports = router;
