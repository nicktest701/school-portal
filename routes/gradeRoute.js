const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const Grade = require('../models/gradeModel');
const Level = require('../models/levelModel');
const _ = require('lodash');

//@GET All school grades
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { session, term } = req.query

    if (!session || !term) {
      return res.status(200).json([]);

    }
    const grades = await Grade.find({
      session,
      term
    });

    if (!grades) {
      return res.status(200).json([]);

    }
    // console.log(grades)

    const modifiedGrades = grades.map(async (grade) => {

      const assignedLevels = await Level.find({
        session,
        term,
        grades: grade?._id
      }).select('level')



      return {
        _id: grade?._id,
        name: grade?.name,
        ratings: grade?.ratings,
        assignedLevels: _.map(assignedLevels, ({ levelName, _id }) => {
          return { levelName, _id }
        })

      }
    })

    const selectedGrades = await Promise.all(modifiedGrades)

    res.status(200).json(selectedGrades);

  })
);

//@GET School Grade by id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const grade = await Grade.findById(id);

    res.status(200).json(grade);
  })
);

//Add new School Grade
router.post(
  '/',
  asyncHandler(async (req, res) => {
    //Create new Grade
    const newGrades = req.body;
    
    const grades = await Grade.create({
      ...newGrades,
      school: req.user.school,
      createdBy: req.user.id,
    });
    if (_.isEmpty(grades)) {
      return res.status(404).send('Error creating new grades.Try again later');
    }
    //console.log(grade);
    res.status(201).json('Grades Saved!');
  })
);

//@PUT Update Existing School Grade
router.put(
  '/',
  asyncHandler(async (req, res) => {

    const modifiedGrade = await Grade.findByIdAndUpdate(
      req.body._id,
      {
        $set: {
          name: req.body.name,
          ratings: req.body.ratings,
        },
      },
      {
        new: true,
      }
    );

    if (_.isEmpty(modifiedGrade)) {
      return res.status(404).send('Error updating grade info.Try again later');
    }

    res.status(201).send('Changes Saved');
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    await Grade.findByIdAndDelete(id);

    res.status(204).send('Grade removed');
  })
);

module.exports = router;
