const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { randomUUID } = require("crypto");
const { verifyJWT, verifyRefreshJWT } = require("../middlewares/verifyJWT");
const User = require("../models/userModel");
const Teacher = require("../models/teacherModel");
const School = require("../models/schoolModel");
const { isValidObjectId } = require("mongoose");
const { uploadFile } = require("../config/uploadFile");

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/users/");
  },
  filename: function (req, file, cb) {
    const ext = file?.originalname?.split(".")[1];

    cb(null, `${randomUUID()}.${ext}`);
  },
});
const upload = multer({ storage: Storage });

//@GET all users
router.get(
  "/",
  verifyJWT,
  asyncHandler(async (req, res) => {
    const users = await User.find({ school: req.user.school })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  })
);

// GET School Information
router.get(
  "/school",
  asyncHandler(async (req, res) => {
    const school = await School.findOne();

    res.status(200).json(school);
  })
);

//@GET all users
router.get(
  "/:id",
  verifyJWT,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    const loggedInUser = {
      _id: user._id?.toString(),
      id: user._id?.toString(),
      profile: user.profile,
      firstname: user.firstname,
      lastname: user.lastname,
      fullname: user.fullname,
      username: user.username,
      dateofbirth: user.dateofbirth,
      gender: user.gender,
      email: user.email,
      phonenumber: user.phonenumber,
      address: user.address,
      residence: user.residence,
      nationality: user.nationality,
      role: user.role,
      active: user.active,
    };

    res.status(200).json(loggedInUser);
  })
);

//@GET user by username
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const username = req.body.username;
    const user = await User.findByUsername(username);

    if (_.isEmpty(user)) {
      return res.status(404).json(" Username or Password is incorrect !");
    }
    const isTrue = bcrypt.compareSync(req.body.password, user.password);
    if (!isTrue) {
      return res.status(404).json(" Username or Password is incorrect !");
    }

    if (user.active === false) {
      return res
        .status(404)
        .json(
          "Your account has been disabled! Try contacting your administrator."
        );
    }

    // console.log(user)

    const loggedInUser = {
      _id: user._id?.toString(),
      id: user._id?.toString(),
      profile: user.profile,
      firstname: user.firstname,
      lastname: user.lastname,
      fullname: user.fullname,
      username: user.username,
      dateofbirth: user.dateofbirth,
      gender: user.gender,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      active: user.active,
      school: user?.school,
    };

    // Generate JWT token
    const token = jwt.sign(loggedInUser, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    const refresh_token = jwt.sign(
      loggedInUser,
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      }
    );

    req.session.user = {
      ...loggedInUser,
    };
    req.user = loggedInUser;
    req.session.refresh_token = refresh_token;
    req.session.save((err) => {
      if (err) console.error(err);
      // Send response here
    });
    // console.log(req.session.user);

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none", // Cross-site allowed
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
      domain:
        process.env.NODE_ENV === "production"
          ? ".school-portal-chi.vercel.app" // Leading dot for subdomains
          : undefined, // Localhost works without domain
    });

    res.status(200).json({
      token,
      refresh_token,
      // user: loggedInUser,
    });
  })
);

//@GET all users
router.post(
  "/verify",
  // verifyRefreshJWT,
  asyncHandler(async (req, res) => {
    // if (!req.session || !req.session.user) {
    //   return res.status(401).json("Unauthorized Access.Please login again");
    // }
    const user = req.session;
    const cookieUser = req.cookies;
    const signedCookie = req.signedCookies;

    console.log(user);
    console.log(cookieUser);
    console.log(signedCookie);

    if (!user) {
      return res.status(401).json("Unauthorized Access.Please login again");
    }
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    // Update session with new user data
    req.session.user = {
      ...user,
    };

    res.status(200).json({
      token,
    });
  })
);

//@POST add new user
router.post(
  "/",
  verifyJWT,
  upload.single("profile"),
  asyncHandler(async (req, res) => {
    const newUser = req.body;
    const username = req.body.username;

    const itExists = await User.findOne({ username });

    if (!_.isEmpty(itExists)) {
      return res
        .status(400)
        .json("An account with this Username already exits!");
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;

    let userPhoto =
      "https://firebasestorage.googleapis.com/v0/b/fir-system-54b99.appspot.com/o/download.png?alt=media&token=c3f23cd6-8973-4681-9900-98dbadc93d2a";
    if (req.file) {
      const filename = req.file?.filename;
      userPhoto = await uploadFile(filename, "users/");
      newUser.profile = userPhoto;
    }

    const user = await User.create(newUser);
    // await knex('users').insert(newUser);

    if (!user) {
      return res.status(404).json("Error Saving user info!");
    }

    res.status(201).json("New user has been added successfully!!!");
  })
);

//@Update User Information
router.put(
  "/",
  verifyJWT,
  asyncHandler(async (req, res) => {
    const { _id, password, isOnlyUpdate, iat, exp, ...rest } = req.body;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      rest.password = hashedPassword;
    } else {
      delete req.body.password;
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        $set: {
          ...rest,
        },
      },
      {
        new: true,
      }
    );

    if (_.isEmpty(updatedUser)) {
      return res.status(404).json("Error updating user info.Try Again Later.");
    }

    if (isOnlyUpdate) {
      return res.status(201).json("Profile Updated!!!");
    }

    const loggedInUser = {
      id: updatedUser._id?.toString(),
      profile: updatedUser.profile,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      fullname: updatedUser.fullname,
      username: updatedUser.username,
      dateofbirth: updatedUser.dateofbirth,
      gender: updatedUser.gender,
      email: updatedUser.email,
      phonenumber: updatedUser.phonenumber,
      role: updatedUser.role,
      active: updatedUser.active,
      school: updatedUser?.school,
    };

    const token = jwt.sign(loggedInUser, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });

    res.status(200).json({ token });
  })
);

//@POST Update User profile
router.put(
  "/profile",
  verifyJWT,
  upload.single("profile"),
  asyncHandler(async (req, res) => {
    const { _id, user } = req.body;

    if (_.isEmpty(req.file)) {
      return res.status(400).json("Please upload a file");
    }

    const filename = req.file?.filename;
    const userPhoto = await uploadFile(filename, "users/");

    const updatedUser = await User.findByIdAndUpdate(_id, {
      $set: {
        profile: userPhoto,
      },
    });

    if (_.isEmpty(updatedUser)) {
      return res
        .status(400)
        .json("Error updating profile image.Try again later.");
    }

    if (updatedUser.role === "teacher") {
      await Teacher.findByIdAndUpdate(_id, {
        $set: {
          profile: userPhoto,
        },
      });
    }

    if (!_.isEmpty(user)) {
      const loggedInUser = {
        _id: updatedUser._id,
        id: updatedUser._id?.toString(),
        profile: updatedUser.profile,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        fullname: updatedUser.fullname,
        username: updatedUser.username,
        dateofbirth: updatedUser.dateofbirth,
        gender: updatedUser.gender,
        email: updatedUser.email,
        phonenumber: updatedUser.phonenumber,
        role: updatedUser.role,
        active: updatedUser.active,
        school: updatedUser?.school,
      };

      const token = jwt.sign(loggedInUser, process.env.JWT_SECRET, {
        expiresIn: "2m",
      });

      return res.status(200).json({ token });
    }
    res.status(201).json("Profile Updated");
  })
);

//@PUT add new user
router.get(
  "/admin/add/:token",
  asyncHandler(async (req, res) => {
    const token = req.params.token;

    if (token !== process.env.TOKEN) {
      return res.sendStatus(403);
    }
    const newUser = {
      fullname: "Nick Test",
      username: "admin",
      gender: "male",
      email: "nicktest701@gmail.com",
      password: "Akwasi21guy",
      role: "administrator",
      phonenumber: "0543772591",
    };

    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    const user = await User.create(newUser);
    if (!user) {
      return res.status(404).json("Error Saving user info!");
    }

    res.json("done");
  })
);

//@PUT Reset Password
router.put(
  "/reset",
  verifyJWT,
  asyncHandler(async (req, res) => {
    const { id, oldPassword, newPassword } = req.body;
    const user = await User.findById(id);
    // const user = await knex('users').where('id', id).first();

    if (_.isEmpty(user)) {
      return res.status(404).json("User does not exist");
    }
    const isTrue = await bcrypt.compare(oldPassword, user.password);
    if (!isTrue) {
      return res.status(404).json("Password is incorrect!!!");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(id, {
      password: hashedPassword,
    });

    if (_.isEmpty(updatedUser)) {
      return res.status(404).json("Error updating user info.Try Again Later.");
    }

    res.json("User information updated !!!");
  })
);
//@POST Reset User Password
router.put(
  "/reset-password",
  verifyJWT,
  asyncHandler(async (req, res) => {
    const { id, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        password: hashedPassword,
      },
      {
        new: true,
      }
    );

    if (_.isEmpty(updatedUser)) {
      return res.status(404).json("Error updating user info.Try Again Later.");
    }

    res.status(200).json("Password updated !!!");
  })
);

router.put(
  "/logout",
  verifyJWT,
  asyncHandler(async (req, res) => {
    req.session.destroy((err) => {
      req.user = null;
      res.clearCookie("sid", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return res.sendStatus(err ? 500 : 200);
    });
  })
);

//@PUT Reset Password
router.patch(
  "/admin/reset-password",
  verifyJWT,
  asyncHandler(async (req, res) => {
    const { id, password } = req.body;
    const user = await User.findById(id);

    if (_.isEmpty(user)) {
      return res.status(404).json("User does not exist");
    }

    const hashedPassword = await bcrypt.hash(password?.trim(), 10);

    const updatedUser = await User.findByIdAndUpdate(id, {
      password: hashedPassword,
    });

    if (_.isEmpty(updatedUser)) {
      return res.status(404).json("Error updating user info.Try Again Later.");
    }

    res.json("User password updated !!!");
  })
);

router.patch(
  "/",
  verifyJWT,
  asyncHandler(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });

    if (_.isEmpty(updatedUser)) {
      return res.status(404).json("Error updating user info");
    }

    res.status(200).json(true);
  })
);

//Enable or Disable User Account
router.put(
  "/account",
  verifyJWT,
  asyncHandler(async (req, res) => {
    const { id, active } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { active: Boolean(active) } },
      {
        new: true,
      }
    );

    if (_.isEmpty(updatedUser)) {
      return res.status(404).json("Error updating user info");
    }

    res.json(
      updatedUser.active === true
        ? "User account enabled!"
        : "User account disabled!"
    );
  })
);

//@DELETE student
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!isValidObjectId(id)) {
      return res.status(401).json("Invalid User information");
    }

    const user = await User.findByIdAndDelete(id, {
      new: true,
    });

    if (_.isEmpty(user)) {
      return res.status(403).json("No User with such id");
    }
    res.status(200).json("User has been removed successfully !!!");
  })
);

// EDIT School Information
router.put(
  "/school",
  verifyJWT,
  asyncHandler(async (req, res) => {
    const schoolInfo = req.body;
    const school = await School.findOneAndUpdate(
      {
        unique: schoolInfo.unique,
      },

      schoolInfo,

      {
        upsert: true,
        new: true,
      }
    );

    if (_.isEmpty(school)) {
      return res
        .status(403)
        .json('Couldn"t save school information.Please try again later.!!');
    }
    res.status(200).json("School Information Updated!!!");
  })
);

module.exports = router;
