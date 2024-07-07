const jwt = require('jsonwebtoken');
const _ = require('lodash')
const User = require('../models/userModel')



const verifyJWT = (req, res, next) => {
  const authHeader =
    req.headers['authorization'] || req.headers['Authorization'];

  if (!authHeader) {
    return res
      .status(401)
      .json('Unauthorized Access.Please contact administrator');

  }

  const token = authHeader?.split(' ')[1];

  if (!token) {

    return res
      .status(401)
      .json('Unauthorized Access.Please contact administrator');

  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json('Session has expired.Please login again');
    }
   

    const authUser = await User.findById(user?.id).select('-password')
    if (_.isEmpty(authUser)) {
      return res
        .status(401)
        .json('Unauthorized Access.Please contact administrator');
    }


    const loggedInUser = {
      id: authUser?._id,
      profile: authUser?.profile,
      firstname: authUser?.firstname,
      lastname: authUser?.lastname,
      fullname: authUser?.fullname,
      username: authUser?.username,
      email: authUser?.email,
      phonenumber: authUser?.phonenumber,
      role: authUser?.role,
      active: authUser?.active,
    };

    req.session.user = loggedInUser;

    next();
  });
};


const verifyRefreshJWT = (req, res, next) => {
  const authHeader =
    req.headers['authorization'] || req.headers['Authorization'];


  if (!authHeader) {
    return res
      .status(401)
      .json('Unauthorized Access.Please contact administrator');

  }

  const token = authHeader?.split(' ')[1];


  if (!token) {

    return res
      .status(401)
      .json('Unauthorized Access.Please contact administrator');

  }


  jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json('Session has expired.Please login again');

    }
    

    const authUser = await User.findById(user?.id).select('-password')
  
    if (_.isEmpty(authUser)) {
      return res
        .status(401)
        .json('Unauthorized Access.Please contact administrator');
    }


    const loggedInUser = {
      id: authUser?._id,
      profile: authUser?.profile,
      firstname: authUser?.firstname,
      lastname: authUser?.lastname,
      fullname: authUser?.fullname,
      username: authUser?.username,
      email: authUser?.email,
      phonenumber: authUser?.phonenumber,
      role: authUser?.role,
      active: authUser?.active,
    };

    req.session.user = loggedInUser;

    next();
  });
};


module.exports = {
  verifyJWT,verifyRefreshJWT
};
