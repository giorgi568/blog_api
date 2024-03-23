import { NextFunction } from 'express';

var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const userController = require('../controllers/userController');

//passport configuration
const passport = require('passport');
const jwtStrategy = require('../jwtStrategy');
passport.use(jwtStrategy);

/* GET home page. */
router.get('/posts', postController.posts);
router.get('/post/:id', postController.post);
router.post(
  '/post',
  passport.authenticate('jwt', { session: false }),
  postController.post_add
);
router.put(
  '/post/:id',
  passport.authenticate('jwt', { session: false }),
  postController.post_update
);
router.delete(
  '/post/:id',
  passport.authenticate('jwt', { session: false }),
  postController.post_delete
);

router.get('/post/:id/comments', commentController.comments_on_post);
router.post('/post/:id/comment', commentController.comment_add);
router.put(
  '/post/:postId/comment/:commentId',
  passport.authenticate('jwt', { session: false }),
  commentController.comment_update
);
router.delete(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  commentController.comment_delete
);

router.post('/login', userController.login);

interface Response {
  render?: any;
}
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
