const router = require('express').Router();
const _ = require('lodash');
const asyncHandler = require('express-async-handler');
const Notification = require('../models/notificationModel');
const sendMail = require('../config/mail/mailer');
const sendSMS = require('../config/sms/messenger');

//GET notification
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const notifications = await Notification.find({}).sort({ createdAt: -1 });

    // //console.log(notifications);

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



//POST notification
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const newNotification = req.body;

    const notification = await Notification.create(newNotification);

    if (_.isEmpty(notification)) {
      return res
        .status(404)
        .json('Couldnt create notification.Please try again later...');
    }

    res.status(200).json('Notification Created!');

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

    res.status(200).json('Chnages Saved!');
  })
);
//DELETE notification

router.put(
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

    const notification = await Notification.findByIdAndRemove(id, {
      new: true,
    });

    if (_.isEmpty(notification)) {
      return res.status(404).json('Error removing notification.Try again later...');
    }

    res.status(200).json('Notification deleted successfully!!!');
  })
);

module.exports = router;
