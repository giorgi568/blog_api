import { NextFunction, Request, Response } from 'express';

const User = require('../models/user');

const jwt = require('jsonwebtoken');

exports.login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user: object = await User.findOne({
      username: username,
      password: password,
    }).exec();
    if (user) {
      type options = {
        expiresIn?: number;
      };
      const opts: options = {};
      opts.expiresIn = 3600;
      const secret = process.env.secret;
      const token = jwt.sign({ username, password}, secret, opts);
      res.status(200).json({
        message: 'Auth Passed',
        token,
      });
    } else {
      res.status(401).json({ message: 'Auth Failed' });
    }
  } catch (err) {
    return next(err);
  }
};
