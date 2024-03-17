var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

/* GET home page. */
router.get('/posts', postController.posts);
router.get('/post/:id', postController.post);
router.post('/post', postController.post_add);
router.put('/post/:id', postController.post_update);
router.delete('/post/:id', postController.post_delete);


router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
