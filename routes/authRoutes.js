const express = require('express');
const router = express.Router();
//Validator
const { runValidation } = require('../validators');
const {
  userRegisterValidator,
  userSigninValidator
} = require('../validators/auth');
//Controller
const {
  requireSignin,
  register,
  signin,
  signout
} = require('../controllers/authController');

router.post('/register', userRegisterValidator, runValidation, register);
router.post('/signin', userSigninValidator, runValidation, signin);
router.get('/signout', requireSignin, signout);

module.exports = router;
