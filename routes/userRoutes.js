const express = require('express');
const router = express.Router();

//Controllers
const { read } = require('../controllers/userController');
const {
  requireSignin,
  adminMiddleware,
  authMiddleware
} = require('../controllers/authController');

router.get('/profile', requireSignin, authMiddleware, read);

module.exports = router;
