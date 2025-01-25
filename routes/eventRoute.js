const router = require('express').Router();
const _ = require('lodash');
const asyncHandler = require('express-async-handler');
const Event = require('../models/eventModel');
const Notification = require('../models/notificationModel');
const sendMail = require('../config/mail/mailer');
const sendSMS = require('../config/sms/messenger');
const { truncateWords } = require('../config/helper');

//GET event
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const events = await Event.find({}).sort({ createdAt: -1 });

    res.status(200).json(events);
  })
);

//@GET Event by id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const event = await Event.findById(id);
    res.status(200).json(event);
  })
);



//POST event
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const newEvent = req.body;

    const event = await Event.create(newEvent);

    if (_.isEmpty(event)) {
      return res
        .status(404)
        .json('Couldnt create event.Please try again later...');
    }

    await Notification.create({
      type: 'Event',
      title: newEvent?.title,
      description: truncateWords(newEvent?.caption, 20),
      album: newEvent?.album,
      link: `/events/${event._id}`
    })


    res.status(200).json('Event Created!');

  })
);


//Edit event

router.put(
  '/',
  asyncHandler(async (req, res) => {
    const event = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(event?._id, {
      $set: { ...event }
    }, {
      new: true
    })

    if (_.isEmpty(updatedEvent)) {
      return res.status(404).json('Error occurred.Try again later...');
    }

    res.status(200).json('Chnages Saved!');
  })
);
//DELETE event

router.put(
  '/remove',
  asyncHandler(async (req, res) => {
    const { events } = req.body;


    const event = await Event.deleteMany({
      _id: { $in: events }
    }, {
      new: true
    })

    if (_.isEmpty(event)) {
      return res.status(404).json('Error removing event.Try again later...');
    }

    res.status(200).json('Event Removed!');
  })
);
//DELETE event

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    const event = await Event.findByIdAndDelete(id, {
      new: true,
    });

    if (_.isEmpty(event)) {
      return res.status(404).json('Error removing event.Try again later...');
    }

    res.status(200).json('Event deleted successfully!!!');
  })
);

module.exports = router;
