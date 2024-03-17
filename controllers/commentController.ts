import { NextFunction, Request, Response } from 'express';
const { body, validationResult } = require('express-validator');

const Comment = require('../models/comment');

exports.comments_on_post = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const comments: Array<object> | undefined = await Comment.find({
      post: req.params.id,
    })
      .sort({ timestamp: -1 })
      .exec();
    if (!comments) {
      res
        .status(400)
        .json({ success: false, message: 'comments werent found' });
    } else {
      res.json({ comments: comments });
    }
  } catch (err) {
    return next(err);
  }
};

exports.comment_add = [
  body(
    'text',
    'text must not be empty and must not be more than 5000 characters'
  )
    .trim()
    .escape()
    .isLength({ min: 1, max: 5000 }),
  body(
    'author',
    'text must not be empty and must not be more than 25 characters'
  )
    .trim()
    .escape()
    .isLength({ min: 1, max: 25 }),

  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ success: false, message: errors });
      } else {
        const comment = new Comment({
          text: req.body.text,
          author: req.body.author,
          post: req.params.id,
        });
        await comment.save();
        res
          .status(200)
          .json({ success: true, message: 'comment added successfully' });
      }
    } catch (err) {
      return next(err);
    }
  },
];

exports.comment_update = [
  body(
    'text',
    'text must not be empty and must not be more than 5000 characters'
  )
    .trim()
    .escape()
    .isLength({ min: 1, max: 5000 }),
  body(
    'author',
    'text must not be empty and must not be more than 25 characters'
  )
    .trim()
    .escape()
    .isLength({ min: 1, max: 25 }),

  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ success: false, message: errors });
      } else {
        const comment = new Comment({
          text: req.body.text,
          author: req.body.author,
          post: req.params.postId,
          _id: req.params.commentId,
        });
        await Comment.findByIdAndUpdate(req.params.commentId, comment, {});
        res
          .status(200)
          .json({ success: true, message: 'Comment Updated Successfully' });
      }
    } catch (err) {
      return next(err);
    }
  },
];

exports.comment_delete = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: 'Comment Deleted Successfully' });
  } catch (err) {
    return next(err);
  }
};