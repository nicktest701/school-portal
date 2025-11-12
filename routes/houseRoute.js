const router = require("express").Router();
const _ = require("lodash");
const asyncHandler = require("express-async-handler");
const House = require("../models/houseModel");

//GET house
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const houses = await House.find({
      school: req.user.school,
    })
      .populate("master", "firstname lastname")
      .sort({ createdAt: -1 });

    res.status(200).json(houses);
  })
);

//@GET House by id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const house = await House.findById(id);
    res.status(200).json(house);
  })
);

//Edit house

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const house = req.body;

    const newHouse = await House.create({
      school: req.user.school,
      session: house?.session,
      name: house.name,
      initials: house.initials,
      color: house.color,
      master: house.master,
      createdBy: req.user._id,
    });

    if (_.isEmpty(newHouse)) {
      return res.status(404).json("Error occurred.Try again later...");
    }

    res.status(200).json("Changes Saved!");
  })
);
//Edit house

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const house = req.body;

    const updatedHouse = await House.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...house },
      },
      {
        new: true,
      }
    );

    if (_.isEmpty(updatedHouse)) {
      return res.status(404).json("Error occurred.Try again later...");
    }

    res.status(200).json("Changes Saved!");
  })
);

//DELETE house
router.delete(
  "/remove",
  asyncHandler(async (req, res) => {
    const { houses } = req.body;

    const house = await House.deleteMany(
      {
        _id: { $in: houses },
      },
      {
        new: true,
      }
    );

    if (_.isEmpty(house)) {
      return res.status(404).json("Error removing house.Try again later...");
    }

    res.status(200).json("House Removed!");
  })
);

//DELETE house

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    const house = await House.findByIdAndDelete(id, {
      new: true,
    });

    if (_.isEmpty(house)) {
      return res.status(404).json("Error removing house.Try again later...");
    }

    res.status(200).json("House deleted successfully!!!");
  })
);

module.exports = router;
