const express = require('express');
const router = express.Router();
//Validator
const { runValidation } = require('../validators');
const { contactFormValidator } = require('../validators/contactForm');
//Controller
const {
  contactForm,
  contactBlogAuthorForm
} = require('../controllers/contactController');

router.post('/contact', contactFormValidator, runValidation, contactForm);
router.post(
  '/contact-blog-author',
  contactFormValidator,
  runValidation,
  contactBlogAuthorForm
);

module.exports = router;
