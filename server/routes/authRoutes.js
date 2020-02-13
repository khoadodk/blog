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
  register,
  signin,
  googleLogin
} = require('../controllers/authController');

router.post('/register', userRegisterValidator, runValidation, register);
router.post('/signin', userSigninValidator, runValidation, signin);

router.post('/google-login', googleLogin);

module.exports = router;
