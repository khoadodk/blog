const User = require('../models/user');

exports.read = (req, res) => {
  //profile is avaiable from the authMiddleware
  req.profile.hash_password = undefined;
  return res.json(req.profile);
};
