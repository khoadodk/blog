const express = require('express');
const router = express.Router();

//Controllers
const {
  requireSignin,
  adminMiddleware,
  authMiddleware,
  canUpdateDeleteBlog
} = require('../controllers/authController');
const {
  create,
  list,
  read,
  remove,
  listAllBlogsCategoriesTags,
  update,
  photo,
  listRelated,
  listSearch,
  listByUser
} = require('../controllers/blogController');

router.post('/blog', requireSignin, adminMiddleware, create);
router.get('/blogs', list);
router.post('/blogs-categories-tags', listAllBlogsCategoriesTags);
router.get('/blog/:slug', read);
router.delete('/blog/:slug', requireSignin, adminMiddleware, remove);
router.put('/blog/:slug', requireSignin, adminMiddleware, update);
router.get('/blog/photo/:slug', photo);
router.post('/blogs/related', listRelated);
router.get('/blogs/search', listSearch);

// User blog create route
router.post('/user/blog', requireSignin, authMiddleware, create);
router.delete(
  '/user/blog/:slug',
  requireSignin,
  authMiddleware,
  canUpdateDeleteBlog,
  remove
);
router.put(
  '/user/blog/:slug',
  requireSignin,
  authMiddleware,
  canUpdateDeleteBlog,
  update
);
//Only allow user to see the blogs that he/she posted
router.get('/:username/blogs', listByUser);

module.exports = router;
