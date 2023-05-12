const express = require('express');
const router = express.Router();
require('../passport');
const passport = require('passport');

const admin_controller = require('../controllers/adminController');

router.get('/', passport.authenticate('jwt', { session: false }), admin_controller.admin_home);

router.post('/post/create', passport.authenticate('jwt', { session: false }), admin_controller.create_post_post);

module.exports = router;