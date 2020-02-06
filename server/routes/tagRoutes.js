const express = require('express');
const router = express.Router();
//Validator
const { runValidation } = require('../validators');
const { tagCreateValidator } = require('../validators/tag');

//Controllers
const { create, list, read, remove } = require('../controllers/tagController');
const {
  requireSignin,
  adminMiddleware
} = require('../controllers/authController');

router.post(
  '/tag',
  runValidation,
  tagCreateValidator,
  requireSignin,
  adminMiddleware,
  create
);
router.get('/tags', list);
router.get('/tag/:slug', read);
router.delete('/tag/:slug', requireSignin, adminMiddleware, remove);

module.exports = router;
