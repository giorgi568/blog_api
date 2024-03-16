import { NextFunction, Request, Response } from 'express';

const Post = require('../models/post');

exports.posts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const posts = await Post.find({})
      .sort({ timestamp: -1 })
      .populate('author')
      .exec();
    res.json({ posts: posts });
  } catch (err) {
    return next(err);
  }
};
