const router = require("express").Router();
const _ = require("lodash");
const asyncHandler = require("express-async-handler");
const Department = require("../models/departmentModel");

//GET department
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const departments = await Department.find({
      school: req.user.school,
    })
      .populate("hod", "firstname lastname")
      .sort({ createdAt: -1 });

    res.status(200).json(departments);
  })
);

//@GET Department by id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const department = await Department.findById(id);
    res.status(200).json(department);
  })
);

//Edit department

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const department = req.body;

    const newDepartment = await Department.create({
      school: req.user.school,
      session: department?.session,
      name: department.name,
      initials: department.initials,
      hod: department.hod,
      createdBy: req.user._id,
    });

    if (_.isEmpty(newDepartment)) {
      return res.status(404).json("Error occurred.Try again later...");
    }

    res.status(200).json("Changes Saved!");
  })
);
//Edit department

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const department = req.body;
    
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...department },
      },
      {
        new: true,
      }
    );

    if (_.isEmpty(updatedDepartment)) {
      return res.status(404).json("Error occurred.Try again later...");
    }

    res.status(200).json("Changes Saved!");
  })
);

//DELETE department
router.delete(
  "/remove",
  asyncHandler(async (req, res) => {
    const { departments } = req.body;

    const department = await Department.deleteMany(
      {
        _id: { $in: departments },
      },
      {
        new: true,
      }
    );

    if (_.isEmpty(department)) {
      return res
        .status(404)
        .json("Error removing department.Try again later...");
    }

    res.status(200).json("Department Removed!");
  })
);

//DELETE department

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    const department = await Department.findByIdAndDelete(id, {
      new: true,
    });

    if (_.isEmpty(department)) {
      return res
        .status(404)
        .json("Error removing department.Try again later...");
    }

    res.status(200).json("Department deleted successfully!!!");
  })
);

module.exports = router;
