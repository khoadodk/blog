const User = require('../models/user');
const Blog = require('../models/blog');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { OAuth2Client } = require('google-auth-library');

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

//Authorize user to update and delete their blogs.
exports.canUpdateDeleteBlog = (req, res, next) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug: slug }).exec((err, data) => {
    if (err) return res.status(400).json({ error: 'Server error!' });
    //Check if author id is correct with the profile in the authMiddleware
    let authorizedUser =
      data.postedBy._id.toString() === req.profile._id.toString();
    if (!authorizedUser)
      return res.status(400).json({ error: 'Unauthorized!' });
    next();
  });
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
exports.googleLogin = (req, res) => {
  const { idToken } = req.body;
  //verify the idToken from the front end
  client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
    .then(response => {
      // console.log('GOOGLE LOGIN RESPONSE', response);
      const { email_verified, name, email } = response.payload;
      //if the user's email has been verified by Google,
      //check if existing user in the database
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: '7d'
            });
            // return user's role, id, name, and email to the front end
            const { _id, email, name, role, username } = user;
            return res.json({
              token,
              user: { _id, email, name, role, username }
            });
          } else {
            //Because user does sign up with our OAuth, so we have to use their email as the password
            let password = email + process.env.JWT_SECRET;
            //Generate username and profile
            let username = shortId.generate();
            let profile = `${process.env.CLIENT_URL}/profile/${username}`;
            user = new User({ name, email, password, username, profile });
            user.save((err, data) => {
              if (err) {
                // console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
                return res.status(400).json({
                  error: 'Fail to sign up with Google.'
                });
              }
              const token = jwt.sign(
                { _id: data._id },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
              );
              const { _id, email, name, role, username } = data;
              return res.json({
                token,
                user: { _id, email, name, role, username }
              });
            });
          }
        });
      } else {
        return res.status(400).json({
          error: 'Fail to sign in with Google. Please try again! '
        });
      }
    });
};
