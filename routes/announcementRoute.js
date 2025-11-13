const router = require("express").Router();
const _ = require("lodash");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Announcement = require("../models/announcementModel");
const Notification = require("../models/notificationModel");
const StudentAuth = require("../models/studentAuthModel");
const { truncateWords } = require("../config/helper");

//GET announcement
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const announcements = await Announcement.find({
      school: req.user.school,
    }).sort({ createdAt: -1 });

    // console.log(req.user);

    res.status(200).json(announcements);
  })
);

//@GET Announcement by id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const announcement = await Announcement.findById(id);
    res.status(200).json(announcement);
  })
);

//POST announcement
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const newAnnouncement = req.body;

    const announcement = await Announcement.create({
      ...newAnnouncement,
      school: req.user.school,
      createdBy: req.user.id,
    });

    if (_.isEmpty(announcement)) {
      return res
        .status(404)
        .json("Couldnt create announcement.Please try again later...");
    }

    let users = await User.find({}, "_id"); // Get all user IDs


    if (["all", "students"].includes(newAnnouncement.group)) {
      const student = await StudentAuth.find({}, "_id");

      users.push(student);
    }

    const notifications = users.map((user) => ({
      user: user._id,
      school: req.user.school,
      session: newAnnouncement?.session,
      term: newAnnouncement?.term,
      type: "Announcement",
      title: newAnnouncement?.title,
      description: truncateWords(newAnnouncement?.description, 20),
      album: null,
      link: `/announcements?_title=${announcement.title}`,
      createdBy: req.user.id,
    }));

    await Notification.insertMany(notifications);

    res.status(200).json("Announcement Created!");
  })
);

//Edit announcement

router.put(
  "/",
  asyncHandler(async (req, res) => {
    const announcement = req.body;

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      announcement?._id,
      {
        $set: { ...announcement },
      },
      {
        new: true,
      }
    );

    if (_.isEmpty(updatedAnnouncement)) {
      return res.status(404).json("Error occurred.Try again later...");
    }

    res.status(200).json("Chnages Saved!");
  })
);
//DELETE announcement

router.put(
  "/remove",
  asyncHandler(async (req, res) => {
    const { announcements } = req.body;

    const announcement = await Announcement.deleteMany(
      {
        _id: { $in: announcements },
      },
      {
        new: true,
      }
    );

    if (_.isEmpty(announcement)) {
      return res
        .status(404)
        .json("Error removing announcement.Try again later...");
    }

    res.status(200).json("Announcement Removed!");
  })
);
//DELETE announcement

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    const announcement = await Announcement.findByIdAndDelete(id, {
      new: true,
    });

    if (_.isEmpty(announcement)) {
      return res
        .status(404)
        .json("Error removing announcement.Try again later...");
    }

    res.status(200).json("Announcement deleted successfully!!!");
  })
);

module.exports = router;
