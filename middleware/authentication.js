/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhh';

const withAuth = (req, res, next) => {
  console.log(req.headers);
  let token = req.body.token || req.query.token || req.headers.authorization;

  token = token.split(' ').pop();

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.email = decoded.email;
        req._id = decoded._id;
        next();
      }
    });
  }
};

module.exports = withAuth;
