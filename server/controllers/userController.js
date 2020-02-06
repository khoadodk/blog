const User = require('../models/user');
const Blog = require('../models/blog');
const _ = require('lodash');
const fs = require('fs');
const formidable = require('formidable');
const { ErrorHandler } = require('../helpers/dbErrorHandler');

exports.read = (req, res) => {
  //profile is avaiable from the authMiddleware
  req.profile.hash_password = undefined;
  return res.json(req.profile);
};

//Similar to update blog
exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err)
      return res.status(400).json({
        error: 'Photo could not be updated'
      });
    //profile from authMiddleware
    let user = req.profile;
    //update user with the new fields
    user = _.extend(user, fields);

    if (fields.password && fields.password.length < 6) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters long'
      });
    }

    if (files.photo) {
      if (files.photo.size > 10000000) {
        return res.status(400).json({
          error: 'Image should be less then 1mb in size'
        });
      }
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
      // save the user into db
    }
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: ErrorHandler(err)
        });
      }
      user.hash_password = undefined;
      user.salt = undefined;
      res.json(result);
    });
  });
};

exports.photo = (req, res) => {
  const username = req.params.username;
  User.findOne({ username }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User does not exist'
      });
    }
    if (user.photo.data) {
      res.set('Content-Type', user.photo.contentType);
      return res.send(user.photo.data);
    } else {
      res.status(400).json({
        error: 'User does not have a profile photo'
      });
    }
  });
};

exports.publicProfile = (req, res) => {
  let username = req.params.username;
  let user;

  User.findOne({ username }).exec((err, userFromDB) => {
    if (err || !userFromDB) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
    user = userFromDB;
    let userId = user._id;
    Blog.find({ postedBy: userId })
      .populate('categories', '_id name slug')
      .populate('tags', '_id name slug')
      .populate('postedBy', '_id name')
      .limit(10)
      .select(
        '_id title slug excerpt categories tags postedBy createdAt updatedAt'
      )
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: ErrorHandler(err)
          });
        }
        user.photo = undefined;
        user.hashed_password = undefined;
        res.json({
          user,
          blogs: data
        });
      });
  });
};
