const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Holiday = require("../models/holidayModel");
const asyncHandler = require("express-async-handler");

// Get all holidays
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const year = req.query?.year || "";
    let query = {};

    if (year) {
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year}-12-31`);
      query.date = { $gte: startDate, $lte: endDate };
    }

    const holidays = await Holiday.find({
      school: req.user.school,
    }).sort({ date: 1 });

    res.json(holidays);
  })
);

// Get single holiday
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const holiday = await Holiday.findById(req.params.id);
    if (!holiday) {
      return res.status(404).json({ message: "Holiday not found" });
    }
    res.json(holiday);
  })
);

// Create holiday
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("date").isISO8601().withMessage("Invalid date format"),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const holiday = new Holiday({
      school: req.user.school,
      name: req.body.name,
      date: req.body.date,
      recurring: req.body.recurring || false,
      description: req.body.description,
    });

    try {
      const newHoliday = await holiday.save();
      res.status(201).json(newHoliday);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })
);

// Update holiday
router.put(
  "/",
  asyncHandler(async (req, res) => {
    const holiday = await Holiday.findByIdAndUpdate(
      req.body._id,
      {
        name: req.body.name,
        date: req.body.date,
        recurring: req.body.recurring,
        description: req.body.description,
      },
      { new: true, runValidators: true }
    );

    if (!holiday) {
      return res.status(404).json({ message: "Holiday not found" });
    }

    res.json(holiday);
  })
);

/**
 * @route DELETE /:id
 * @group Holidays - Operations about holidays
 * @param {string} id.path.required - The ID of the holiday to delete
 * @returns {object} 200 - An object containing a success message
 * @returns {object} 404 - An object containing an error message if the holiday is not found
 * @returns {object} 500 - An object containing an error message if there is a server error
 * @example { "message": "Holiday deleted" }
 * @example { "message": "Holiday not found" }
 * @example { "message": "Internal server error" }
 *
 * @description Deletes a holiday from the database based on the provided ID.
 * If the holiday is successfully deleted, a success message is returned.
 * If the holiday is not found, a 404 error is returned.
 * In case of a server error, a 500 error is returned with the error message.
 */
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const holiday = await Holiday.findByIdAndDelete(req.params.id);
    if (!holiday) {
      return res.status(404).json({ message: "Holiday not found" });
    }
    res.json({ message: "Holiday deleted" });
  })
);

module.exports = router;
