const router = require('express').Router();
const { body } = require('express-validator');
const { getPosts, createPosts, getSinglePost } = require('../controllers/feed');

//GET

router.get('/posts', getPosts);
router.get('/posts/:id', getSinglePost);
//POST
router.post(
  '/posts',
  [
    body('title').trim().isLength({ min: 8, max: 15 }),
    body('content').trim().isLength({ min: 15, max: 100 }),
  ],
  createPosts
);

module.exports = router;
