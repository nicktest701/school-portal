const router = require('express').Router();
const _ = require('lodash');
const asyncHandler = require('express-async-handler');
const Notification = require('../models/notificationModel');
const sendMail = require('../config/mail/mailer');
const {sendSMS} = require('../config/sms/messenger');

//GET notification
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const notifications = await Notification.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  })
);

//@GET Notification by id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const notification = await Notification.findById(id);
    res.status(200).json(notification);
  })
);


//Edit notification

router.put(
  '/',
  asyncHandler(async (req, res) => {
    const notification = req.body;

    const updatedNotification = await Notification.findByIdAndUpdate(notification?._id, {
      $set: { ...notification }
    }, {
      new: true
    })

    if (_.isEmpty(updatedNotification)) {
      return res.status(404).json('Error occurred.Try again later...');
    }

    res.status(200).json('Changes Saved!');
  })
);


// Mark a single notification as read
router.put("/:id/read", asyncHandler(async (req, res) => {
  // console.log(req.params.id)
  await Notification.findByIdAndUpdate(req.params.id, { active: false });
  res.status(200).json("Marked as read");
}));

// **Mark all notifications as read for a user**
router.put("/:userId/read-all", asyncHandler(async (req, res) => {
  await Notification.updateMany({ user: req.params.userId }, { active: false });
  res.status(200).json("All notifications marked as read");
}));



//DELETE notification
router.delete(
  '/remove',
  asyncHandler(async (req, res) => {
    const { notifications } = req.body;


    const notification = await Notification.deleteMany({
      _id: { $in: notifications }
    }, {
      new: true
    })

    if (_.isEmpty(notification)) {
      return res.status(404).json('Error removing notification.Try again later...');
    }

    res.status(200).json('Notification Removed!');
  })
);
//DELETE notification

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    const notification = await Notification.findByIdAndDelete(id, {
      new: true,
    });

    if (_.isEmpty(notification)) {
      return res.status(404).json('Error removing notification.Try again later...');
    }

    res.status(200).json('Notification deleted successfully!!!');
  })
);

router.delete(
  '/:id/all',
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    const notification = await Notification.deleteMany({
      user: id
    }, {
      new: true,
    });

    if (_.isEmpty(notification)) {
      return res.status(404).json('Error removing notification.Try again later...');
    }

    res.status(200).json('Notification deleted successfully!!!');
  })
);

module.exports = router;
