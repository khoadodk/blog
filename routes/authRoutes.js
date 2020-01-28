const express = require('express');
const router = express.Router();
//Validator
const { runValidation } = require('../validators');
const { userRegisterValidator } = require('../validators/auth');
//Controller
const { register } = require('../controllers/authController');

router.post('/register', userRegisterValidator, runValidation, register);

module.exports = router;
