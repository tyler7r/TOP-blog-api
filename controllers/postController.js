const Post = require('../models/post');
const asyncHandler = require('express-async-handler');
const { body, validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.all_posts = asyncHandler(async (req, res, next) => {
    res.render('index', {
        title: "All Posts",
    })
})

exports.post_detail = asyncHandler(async (req, res, next) => {

})

exports.create_post_get = asyncHandler(async (req, res, next) => {

})

exports.create_post_post = asyncHandler(async (req, res, next) => {

})