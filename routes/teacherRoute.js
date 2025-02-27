const router = require('express').Router();
const AsyncHandler = require('express-async-handler');
const crypto = require('crypto');
const mongoose = require('mongoose');
const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const {
  Types: { ObjectId },
} = require('mongoose');
const _ = require('lodash');
const multer = require('multer');
const Teacher = require('../models/teacherModel');
const User = require('../models/userModel');
const { uploadFile } = require('../config/uploadFile');

//
const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images/users/');
  },
  filename: function (req, file, cb) {
    const ext = file?.originalname?.split('.')[1];

    cb(null, `${crypto.randomUUID()}.${ext}`);
  },
});
const upload = multer({ storage: Storage });

//-------------------------------------------------------------------------------

//@GET All teachers
router.get(
  '/',
  AsyncHandler(async (req, res) => {
    const teachers = await Teacher.find({
      active: true,
    }).sort({ createdAt: -1 });

    res.status(200).json(teachers);
  })
);

//@GET Teacher by id
router.get(
  '/:id',
  AsyncHandler(async (req, res) => {
    const id = req.params.id;
    const teacher = await Teacher.findById(id);
    res.status(200).json(teacher);
  })
);

//@POST Teacher
router.post(
  '/',
  upload.single('profile'),
  AsyncHandler(async (req, res) => {
    const newTeacher = req.body;
    newTeacher.profile = req?.file?.filename;

    const isTeacherUserNameExists = await Teacher.find({
      username: newTeacher?.username,
    });

    if (!_.isEmpty(isTeacherUserNameExists)) {
      return res
        .status(400)
        .json(
          `Teacher with username '${newTeacher?.username}' already exists! `
        );
    }

    const isUserNameExists = await User.find({
      username: newTeacher?.username,
    });

    if (!_.isEmpty(isUserNameExists)) {
      return res
        .status(400)
        .json(
          `Teacher with username '${newTeacher?.username}' already exists! `
        );
    }

    let teacherPhoto = "https://firebasestorage.googleapis.com/v0/b/fir-system-54b99.appspot.com/o/download.png?alt=media&token=c3f23cd6-8973-4681-9900-98dbadc93d2a"
    if (req.file) {
      const filename = req.file?.filename;
      teacherPhoto = await uploadFile(filename, 'users/');
      newTeacher.profile = teacherPhoto
    }


    // console.log(newTeacher)
    const teacher = await Teacher.create(newTeacher);

    if (_.isEmpty(teacher)) {
      return res.status(404).json('Couldnt save Teacher info.Try again.');
    }

    const hashedPassword = await bcrypt.hash(teacher?.phonenumber, 10);



    const user = {
      _id: teacher?._id,
      profile: teacherPhoto,
      firstname: newTeacher?.firstname,
      lastname: newTeacher?.surname,
      fullname: _.startCase(`${newTeacher?.firstname} ${newTeacher?.surname}`),
      username: teacher?.username,
      dateofbirth: teacher?.dateofbirth,
      email: teacher?.email,
      gender: teacher?.gender,
      role: 'teacher',
      phonenumber: teacher?.phonenumber,
      address: teacher?.address,
      residence: teacher?.residence,
      nationality: teacher?.nationality,
      password: hashedPassword,
    };

    await User.create(user);

    res.status(201).json('New Teacher Added!!!');
  })
);

//@PUT students
router.post(
  '/many',
  AsyncHandler(async (req, res) => {
    const { students: teachers, } = req.body;

    const usernames = _.map(teachers, 'username');

    const existingTeachers = await Teacher.find({
      username: {
        $in: usernames,
      },
    });

    if (!_.isEmpty(existingTeachers)) {
      return res
        .status(404)
        .json(
          `A teacher with the Username ${existingTeachers[0].username} already exists`
        );
    }

    const newTeachers = await Teacher.create(teachers);
    if (_.isEmpty(newTeachers)) {
      return res
        .status(404)
        .json('Error adding teachers info.Try again later.');
    }


    res.status(200).json('Teachers Information Saved!!!');
  })
);


//@PUT teacher
router.put(
  '/',
  AsyncHandler(async (req, res) => {
    const id = req.body._id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json('Invalid Teacher id');
    }

    let modifiedTeacher = req.body;
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      modifiedTeacher,
      {
        upsert: true,
        new: true,
      }
    );

    if (_.isEmpty(updatedTeacher)) {
      return res.status(404).json('Couldnt update Teacher info.Try again.');
    }

    modifiedTeacher.fullname = _.startCase(
      `${updatedTeacher?.surname} ${updatedTeacher?.firstname}`
    );

    await User.findByIdAndUpdate(id, modifiedTeacher);

    res.status(201).json('Changes Saved!!!');
  })
);

//@PUT Update Teacher profile
router.put(
  '/profile',
  upload.single('profile'),
  AsyncHandler(async (req, res) => {
    const { _id } = req.body;


    if (_.isEmpty(req.file)) {
      return res.status(400).json("Please upload a file");
    }

    const filename = req.file?.filename;
    const userPhoto = await uploadFile(filename, 'users/');


    const updatedTeacher = await Teacher.findByIdAndUpdate(_id, {
      $set: {
        profile: userPhoto
      },
    });

    if (_.isEmpty(updatedTeacher)) {
      return res
        .status(400)
        .json('Error updating profile image.Try again later.');
    }

    await User.findByIdAndUpdate(_id, {
      $set: {
        profile: userPhoto
      },
    });

    res.status(201).json('Profile image updated!!!');
  })
);

//@PUT Update Teacher bulk profile
router.put(
  '/bulk-profile',
  upload.array("profile", 20),
  AsyncHandler(async (req, res) => {

    if (!req.files || req.files.length === 0) {
      return res.status(400).json("No files uploaded");
    }


    const uploadedUrls = await uploadMultipleImages(req.files, "users/");

    const updatedTeachers = uploadedUrls?.map(async (teacher) => {

      return await Teacher.findOneAndUpdate({
        phonenumber: teacher?.indexnumber
      }, {
        $set: {
          profile: teacher?.url
        },
      });

    })
    const modifiedTeachers = await Promise.all(updatedTeachers);


    if (_.isEmpty(modifiedTeachers)) {
      return res
        .status(400)
        .json('Error uploading photos.Try again later.');
    }

    res.status(201).json('Photos updated!!!');
  })
);

//@DELETE teacher
router.delete(
  '/:id',
  AsyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(403).json('Invalid information provided.');
    }

    const teacher = await Teacher.findByIdAndUpdate(id, {
      $set: { active: false },
    });

    if (_.isEmpty(teacher)) {
      return res.status(400).json("Couldn't remove Teacher info.Try again.");
    }

    await User.findByIdAndUpdate(id, {
      $set: { active: false },
    });

    res.status(200).json('Changes Saved!!!');
  })
);



module.exports = router;
