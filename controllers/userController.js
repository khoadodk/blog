const User = require('../models/User');

exports.read = (req, res) => {
  //profile is avaiable from the authMiddleware
  req.profile.hash_password = undefined;
  return res.json(req.profile);
};
