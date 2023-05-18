const Post = require('../models/post');
const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');
const { body, validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.all_posts = asyncHandler(async (req, res, next) => {
    const posts = await Post.find().populate('author').exec();

    res.status(200).json({
        posts: posts,
    })
})

exports.post_detail = asyncHandler(async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.postId).populate('comments').exec();
        let postComments = await Comment.find({post: req.params.postId}).populate('author').exec();
        res.status(200).json({
            post: post,
            comments: postComments,
        })
    } catch (err) {
        console.error(err)
    }
})