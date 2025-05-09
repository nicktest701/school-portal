const jwt = require("jsonwebtoken");
const _ = require("lodash");
const User = require("../models/userModel");

const verifyJWT = (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeader) {
    return res
      .status(401)
      .json("Unauthorized Access.Please contact administrator");
  }

  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json("Unauthorized Access.Please contact administrator");
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json("Session has expired.Please login again");
    }

    // const loggedInUser = {
    //   id: user?._id,
    //   profile: user?.profile,
    //   firstname: user?.firstname,
    //   lastname: user?.lastname,
    //   fullname: user?.fullname,
    //   username: user?.username,
    //   email: user?.email,
    //   phonenumber: user?.phonenumber,
    //   role: user?.role,
    //   active: user?.active,
    //   school: user?.school,
    // };

    req.user = user;

    next();
  });
};

const verifyRefreshJWT = (req, res, next) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeader) {
    return res
      .status(401)
      .json("Unauthorized Access.Please contact administrator");
  }

  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json("Unauthorized Access.Please contact administrator");
  }

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json("Session has expired.Please login again");
    }

    const authUser = await User.findById(user?.id).select("-password");

    if (_.isEmpty(authUser)) {
      return res
        .status(401)
        .json("Unauthorized Access.Please contact administrator");
    }

    const loggedInUser = {
      _id: authUser._id,
      id: authUser._id?.toString(),
      profile: authUser?.profile,
      firstname: authUser?.firstname,
      lastname: authUser?.lastname,
      fullname: authUser?.fullname,
      username: authUser?.username,
      email: authUser?.email,
      dateofbirth: authUser.dateofbirth,
      gender: authUser.gender,
      phonenumber: authUser?.phonenumber,
      role: authUser?.role,
      active: authUser?.active,
      school: authUser?.school,
    };

    req.user = loggedInUser;

    next();
  });
};

module.exports = {
  verifyJWT,
  verifyRefreshJWT,
};
