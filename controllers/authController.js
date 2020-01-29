const User = require('../models/User');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

//this middleware'll verify the token and return object as req.user
//We could user req.user._id to find the user
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET
});

exports.authMiddleware = (req, res, next) => {
  User.findById({ _id: req.user._id }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'The user could not be found'
      });
    }
    req.profile = user;
    next();
  });
};

exports.adminMiddleware = (req, res, next) => {
  User.findById({ _id: req.user._id }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'The user could not be found'
      });
    }

    if (user.role !== 1) {
      return res.status(400).json({
        error: 'Admin resource. Access denied'
      });
    }

    req.profile = user;
    next();
  });
};

exports.register = (req, res) => {
  // 1. Check if user's email exist in DB
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: 'Email is already taken'
      });
    }
  });

  // 2. Generate unique username and save the user in the DB
  const { name, email, password } = req.body;
  let username = shortId.generate();
  let profile = `${process.env.CLIENT_URL}/profile/${username}`;
  let newUser = new User({ name, email, password, profile, username });
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    res.json({
      message: 'Register successfully!'
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (err || !user)
      return res.status(400).json({ error: 'Email does not exist' });
    //authenticate in the User schema
    if (!user.authenticate(password))
      return res.status(400).json({ error: 'Email/Password do not match' });

    // Generate token send to client, note: the _id is from mongoDB
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    // Store the token in cookie
    res.cookie('token', token, { expiresIn: '7d' });

    const { _id, name, email, role, username } = user;
    return res.json({ token, user: { _id, username, name, email, role } });
  });
};
