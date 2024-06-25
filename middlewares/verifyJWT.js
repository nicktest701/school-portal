const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader =
    req.headers['authorization'] || req.headers['Authorization'];

  if (!authHeader) {
    if (process.env.NODE_ENV === 'production') {
      return res.redirect('/');
    } else {
      return res
        .status(401)
        .json('Unauthorized Access.Please contact administrator');
    }
  }

  const token = authHeader?.split(' ')[1];

  if (!token) {
    if (process.env.NODE_ENV === 'production') {
      return res.redirect('/');
    } else {
      return res
        .status(403)
        .json('Unauthorized Access.Please contact administrator');
    }
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(404).json('Session has expired.Please login again');
    }

    req.session.user = user;

    next();
  });
};

module.exports = verifyJWT;
