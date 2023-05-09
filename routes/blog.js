const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');

/// user routes ///

router.get('/login', user_controller.log_in_get);

router.post('/login', user_controller.log_in_post);

router.get('/user/create', user_controller.create_user_get);

router.get('/user/create', user_controller.create_user_post);

/// post routes ///

router.get('/', post_controller.all_posts);

router.get('/post/create', post_controller.create_post_get);

router.post('/post/create', post_controller.create_post_post);

router.get('/posts/:id', post_controller.post_detail);

/// comment routes ///

router.get('/posts/:postId/comments', comment_controller.all_post_comments);

router.get('/posts/:postId/create/comment', comment_controller.create_comment_get);

router.post('/posts/:postId/create/comment', comment_controller.create_comment_post);

module.exports = router;