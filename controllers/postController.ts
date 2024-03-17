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
  body('published', 'published status must be specified').trim().escape().isBoolean(),

  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ success: false, message: 'Validation Error' });
      } else {
        const post = new Post({
          title: req.body.title,
          text: req.body.text,
          author: req.body.author,
          published: req.body.published,
        });
        await post.save();
        res
          .status(200)
          .json({ success: true, message: 'Post saved successfully' });
      }
    } catch (err) {
      return next(err);
    }
  },
];

exports.post_update = [
  body('title', 'title must not be empty').trim().escape().isLength({ min: 1 }),
  body('text', 'text must not be empty').trim().escape().isLength({ min: 1 }),
  body('author', 'author must not be empty')
    .trim()
    .escape()
    .isLength({ min: 1 }),
  body('published', 'published status must be specified')
    .trim()
    .escape()
    .isBoolean(),

  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log(req.body)
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ success: false, message: 'Validation Error' });
      } else {
        const post = new Post({
          title: req.body.title,
          text: req.body.text,
          author: req.body.author,
          published: req.body.published,
          _id: req.params.id,
        });
        await Post.findByIdAndUpdate(req.params.id, post, {});
        res
          .status(200)
          .json({ success: true, message: 'Post Updated successfully' });
      }
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },
];

exports.post_delete = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: 'Post Deleted successfully' });
  } catch (err) {
    return next(err);
  }
};
