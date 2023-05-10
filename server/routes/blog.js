const express = require('express');
const router = express.Router();
require('../passport');
const passport = require('passport');

const user_controller = require('../controllers/userController');
const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');
const user = require('../models/user');

/// user routes ///

router.get('/login', user_controller.log_in_get);

router.post('/login', user_controller.log_in_post);

router.get('/signup', user_controller.signup_get);

router.post('/signup', user_controller.signup_post);

/// post routes ///

router.get('/', post_controller.all_posts);

router.get('/post/create', post_controller.create_post_get);

router.post('/post/create', post_controller.create_post_post);

// router.use('/post/create', passport.authenticate('jwt', {session: false}), user)

router.get('/posts/:id', post_controller.post_detail);

/// comment routes ///

router.get('/posts/:postId/comments', comment_controller.all_post_comments);

router.get('/posts/:postId/create/comment', comment_controller.create_comment_get);

router.post('/posts/:postId/create/comment', comment_controller.create_comment_post);

module.exports = router;