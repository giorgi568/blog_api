import { NextFunction, Request, Response } from 'express';
const { body, validationResult } = require('express-validator');

const Post = require('../models/post');

exports.posts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const posts: Array<object> | undefined = await Post.find({})
      .sort({ timestamp: -1 })
      .populate('author')
      .exec();
    res.json({ posts: posts });
  } catch (err) {
    return next(err);
  }
};

exports.post = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const postId = req.params.id;
    const post: object | undefined = await Post.findById(postId).exec();
    res.json({ post: post });
  } catch (err) {
    return next(err);
  }
};

exports.post_add = [
  body('title', 'title must not be empty').trim().escape().isLength({ min: 1 }),
  body('text', 'text must not be empty').trim().escape().isLength({ min: 1 }),
  body('author', 'author must not be empty')
    .trim()
    .escape()
    .isLength({ min: 1 }),
  body('published', 'published status must be specified').trim().escape(),

  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const post = new Post({
        title: req.body.title,
        text: req.body.text,
        author: req.body.author,
        published: req.body.published,
      });
      console.log(post);
      await post.save();
      res
        .status(200)
        .json({ success: true, message: 'Post saved successfully'});
    } catch (err) {
      return next(err);
    }
  },
];
