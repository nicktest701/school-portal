const router = require('express').Router();
const _ = require('lodash');
const asyncHandler = require('express-async-handler');
const Student = require('../models/studentModel');
const Teacher = require('../models/teacherModel');
const Parent = require('../models/parentModel');
const Message = require('../models/messageModel');
// const sendMail = require('../config/mail/Mailer');
// const sendSMS = require('../config/sms/messenger');

//POST message

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const messages = await Message.find({}).sort({ createdAt: -1 });

    // //console.log(messages);

    res.status(200).json(messages);
  })
);
//POST message

router.post(
  '/quick',
  asyncHandler(async (req, res) => {
    const newMessage = req.body;
    //console.log(newMessage);
    const message = await Message.create({
      type: newMessage?.type,
      recipient: {
        type: 'Individual',
        phonenumber:
          newMessage?.phonenumber === undefined
            ? []
            : [newMessage?.phonenumber],
        email: newMessage?.email === undefined ? [] : [newMessage?.email],
      },
      body: {
        title: newMessage?.title,
        message: newMessage?.message,
      },
    });

    if (_.isEmpty(message)) {
      return res
        .status(404)
        .json('Couldnt send message.Please try again later...');
    }

    //ONLY SMS
    // if (message.type === "sms") {
    //   await sendSMS(message?.body, message?.recipient?.phonenumber);

    //   return res.status(200).json("Message delivered successfully!!!");
    // }
    // //ONLY EMAIL
    // if (message.type === "email") {
    //   await sendMail(message?.body, message?.recipient?.email);

    //   return res.status(200).json("Message delivered successfully!!!");
    // }
    // //BOTH EMAIL AND SMS
    // if (message.type === "both") {
    //   await sendSMS(message?.body, message?.recipient?.phonenumber);
    //   await sendMail(message?.body, message?.recipient?.email);
    //   return res.status(200).json("Message delivered successfully!!!");
    // }

    return res.status(200).json('Message delivered successfully!!!');
  })
);

router.post(
  '/resend',
  asyncHandler(async (req, res) => {
    const { id, type, body } = req.body;

    try {
      // switch (type) {
      //   case 'sms':
      //     await sendSMS(body, recipient?.phonenumber);
      //     break;
      //   case 'email':
      //     await sendMail(body, recipient?.email);
      //     break;

      //   case 'both':
      //     await sendSMS(body, recipient?.phonenumber);
      //     await sendMail(body, recipient?.email);
      // }

      await Message.findByIdAndUpdate(id, {
        $set: {
          active: true,
        },
      });

      return res.status(200).json('Message delivered successfully!!!');
    } catch (error) {
      return res.status(404).json('Couldnt send message.Try again later!!!');
    }
  })
);

//POST message

router.post(
  '/bulk',
  asyncHandler(async (req, res) => {
    const newMessage = req.body;
    let emailAddresses = [];
    let phoneNumbers = [];
    let groups = [];

    ///Students
    if (newMessage.group === 'students') {
      groups = await Student.find({}).select('email phonenumber');
    }

    ///Teachers
    if (newMessage.group === 'teachers') {
      groups = await Teacher.find({}).select('email phonenumber');
    }

    ///Teachers
    if (newMessage.group === 'parents') {
      groups = await Parent.find({}).select('email phonenumber');
    }

    ///Check message type
    if (newMessage.type === 'sms') {
      phoneNumbers = groups.map(({ phonenumber }) => phonenumber);
    }
    if (newMessage.type === 'email') {
      emailAddresses = groups.map(({ email }) => email);
    }
    if (newMessage.type === 'both') {
      phoneNumbers = groups.map(({ phonenumber }) => phonenumber);
      emailAddresses = groups.map(({ email }) => email);
    }

    //Remove empty emails and phone numbers and select only uniq values
    const emails = _.uniqWith(_.compact(emailAddresses), _.isEqual);
    const numbers = _.uniqWith(_.compact(phoneNumbers), _.isEqual);

    const message = await Message.create({
      type: newMessage?.type,
      recipient: {
        type: newMessage.group,
        phonenumber: numbers,
        email: emails,
      },
      body: {
        title: newMessage?.title,
        message: newMessage?.message,
      },
    });

    if (_.isEmpty(message)) {
      return res
        .status(404)
        .json("Couldn't deliver message.Please try again later...");
    }

    res.status(200).json('Message delivered successfully!!!');
  })
);
//DELETE message

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    const message = await Message.findByIdAndRemove(id, {
      new: true,
    });

    if (_.isEmpty(message)) {
      return res.status(404).json('Error removing message.Try again later...');
    }

    res.status(200).json('Message deleted successfully!!!');
  })
);

module.exports = router;
