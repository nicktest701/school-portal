const router = require('express').Router();
const _ = require('lodash');
const asyncHandler = require('express-async-handler');
const Parent = require('../models/parentModel');

const {
  Types: { ObjectId },
} = require('mongoose');

//@GET All  Parents
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const parents = await Parent.find();

    if (_.isEmpty(parents)) {
      return res.status(200).json([]);
    }

    res.status(200).json(sortedParents);
  })
);

//@GET Parent by student ID
router.get(
  '/student',
  asyncHandler(async (req, res) => {
    const id = req.query.id;
    const parents = await Parent.find({
      student: new ObjectId(id),
    });

    if (_.isEmpty(parents)) {
      return res.status(200).json({});
    }

    res.status(200).json(parents);
  })
);
//@GET  Parent by id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    const parent = await Parent.findById(id);

    if (_.isEmpty(parent)) {
      return res.status(200).json({});
    }

    res.status(200).json(parent);
  })
);

//Add new School Parent
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const newParent = await Parent.insertMany([
      req.body.parent1,
      req.body.parent2,
    ]);

    if (_.isEmpty(newParent)) {
      return res
        .status(404)
        .json('Error creating new parent.Try again later!!!');
    }

    res.status(201).json('New Parents created Successfully!!!');
  })
);

//@PUT Update Existing School Parent
router.put(
  '/',
  asyncHandler(async (req, res) => {
    const modifiedParent = await Parent.findByIdAndUpdate(
      req.body._id,
      req.body
    );

    if (_.isEmpty(modifiedParent)) {
      return res.status(404).send('Error updating parent info.Try again later');
    }

    res.status(201).json('Parent information has been updated successfully!!!');
  })
);

0;
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deletedParent = await Parent.findByIdAndUpdate(id, {
      $set: {
        active: false,
      },
    });

    if (_.isEmpty(deletedParent)) {
      return res.status(404).json('Error removing parent info.Try again later');
    }

    res.status(201).json(' Parent have been removed successfully!!!');
  })
);

module.exports = router;
