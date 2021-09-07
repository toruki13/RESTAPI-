const Post = require('../models/post');
const { validationResult } = require('express-validator');
const ITEMS_PER_PAGE = 10;

exports.getPosts = (req, res, next) => {
  const page = +req.query.page || 1;

  Post.find()
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 404;
      return next(error);
    });
};

exports.getSinglePost = (req, res, next) => {
  postId = req.params?.id;

  Post.findById({ _id: postId })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 404;
      return next(error);
    });
};

exports.createPosts = (req, res, next) => {
  const errors = validationResult(req);
  if (errors) {
    const error = new Error('validations failed');
    error.statusCode = 422;
    throw error;
  }
  const { title, content, creator } = req.body;

  const post = new Post({
    title,
    content,
    creator,
  });

  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'success',
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
