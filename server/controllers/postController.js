const Post = require('../models/post');
const asyncHandler = require('express-async-handler');
const { body, validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.all_posts = asyncHandler(async (req, res, next) => {
    const posts = Post.find({ publish: true }).populate('author').exec();

    res.status(200).json({
        posts: posts,
    })
})

exports.post_detail = asyncHandler(async (req, res, next) => {

})