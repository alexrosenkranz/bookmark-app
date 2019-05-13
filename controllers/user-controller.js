/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const handle = require('../utils/promise-handler');

// hide this in a .env file (also in middleware/auth.js)
const secret = 'mysecretsshhh';

module.exports = {
  async getUserProfile(req, res) {
    const [err, profile] = await handle(User.findById(req._id));
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(profile);
    }
  },
  /* ================= */
  async register(req, res) {
    const { email, password, firstName, lastName } = req.body;

    const user = new User({ email, password, firstName, lastName });

    user.setFullName();

    user.save(err => {
      if (err) {
        console.log(err);
        res.status(500).send('Error registering new user please try again.');
      } else {
        res.status(200).send('Welcome to the club!');
      }
    });
  },
  /* ================= */
  async login(req, res) {
    const { email, password } = req.body;
    const [findErr, user] = await handle(User.findOne({ email }));
    if (findErr) {
      console.error(findErr);
      res.status(500).json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401).json({
        error: 'Incorrect email or password'
      });
    } else {
      const [pwErr, same] = await handle(user.isCorrectPassword(password));
      if (pwErr) {
        res.status(500).json({
          error: 'Internal error please try again'
        });
      } else if (!same) {
        res.status(401).json({
          error: 'Incorrect email or password'
        });
      } else {
        // Issue token
        console.log(user);
        const payload = { _id: user._id, email };
        const token = jwt.sign(payload, secret, {
          expiresIn: '1h'
        });
        res.status(200).json(token);
        // if you want session cookies
        // .cookie('token', token, { httpOnly: true })
      }
    }
  }
};
