const express = require('express');
const router = express.Router();
require('../passport');
const passport = require('passport');

const user_controller = require('../controllers/userController');
const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');
const user = require('../models/user');

/// user routes ///

router.post('/login', user_controller.log_in_post);

router.post('/signup', user_controller.signup_post);

/// post routes ///

router.get('/', post_controller.all_posts);

router.get('/posts/:postId', post_controller.post_detail);

/// comment routes ///

router.post('/posts/:postId/create/comment', passport.authenticate('jwt', { session: false }), comment_controller.create_comment_post);

router.get('/comments/:commentId/like', passport.authenticate('jwt', { session: false }), comment_controller.like_comment);

router.get('/comments/:commentId/delete', passport.authenticate('jwt', { session: false }), comment_controller.delete_comment);

module.exports = router;