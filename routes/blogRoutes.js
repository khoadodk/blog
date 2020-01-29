const express = require('express');
const router = express.Router();

//Controllers
const {
  requireSignin,
  adminMiddleware
} = require('../controllers/authController');
const {
  create,
  list,
  read,
  remove,
  listAllBlogsCategoriesTags,
  update
} = require('../controllers/blogController');

router.post('/blog', requireSignin, adminMiddleware, create);
router.get('/blogs', list);
router.post('/blogs-categories-tags', listAllBlogsCategoriesTags);
router.get('/blog/:slug', read);
router.delete('/blog/:slug', requireSignin, adminMiddleware, remove);
router.put('/blog/:slug', requireSignin, adminMiddleware, update);

module.exports = router;
