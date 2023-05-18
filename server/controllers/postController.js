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

exports.like_post = asyncHandler(async (req, res, next) => {
    let post = await Post.findById(req.params.postId);
    if (post.likes.includes(req.user._id)) {
        await Post.findByIdAndUpdate(req.params.postId, { $pull: { likes: req.user._id }}).exec();
    } else {
        await Post.findByIdAndUpdate(req.params.postId, { $push: { likes: req.user._id }}).exec();
    }
    res.status(200).json({
        message: 'Post liked',
        post: post,
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