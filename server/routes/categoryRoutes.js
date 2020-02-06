const express = require('express');
const router = express.Router();
//Validator
const { runValidation } = require('../validators');
const { categoryCreateValidator } = require('../validators/category');

//Controllers
const {
  create,
  list,
  read,
  remove
} = require('../controllers/categoryController');
const {
  requireSignin,
  adminMiddleware
} = require('../controllers/authController');

router.post(
  '/category',
  runValidation,
  categoryCreateValidator,
  requireSignin,
  adminMiddleware,
  create
);
router.get('/categories', list);
router.get('/category/:slug', read);
router.delete('/category/:slug', requireSignin, adminMiddleware, remove);

module.exports = router;
