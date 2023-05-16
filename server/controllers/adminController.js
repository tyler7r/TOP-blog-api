const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Post = require('../models/post');
const { findOneAndUpdate } = require('../models/user');
const User = require('../models/user');

exports.admin_home = asyncHandler(async (req, res, next) => {
    let posts = await Post.find().populate('author').exec();
    return res.status(200).json({
        title: 'Admin',
        posts: posts,
    })
})

exports.create_post_post = [
    body('title').trim().isLength({ min: 1, max: 30 }).withMessage('Title must be between 1 and 30 characters'),
    body('text').trim().isLength({ min: 1, max: 160 }).withMessage('Text must be between 1 and 160 characters'),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const post = new Post({
            title: req.body.title,
            text: req.body.text,
            author: req.user._id,
        })
        if (!errors.isEmpty()) {
            return res.status(403).json({
                message: 'New Post',
                errors: errors.array(),
            })
        } else {
            await post.save()
            await User.findOneAndUpdate({ _id: req.user._id }, { $push: {posts: post}})
            res.status(200).json({
                message: 'Post create successfully',
                post: post,
            })
        }
    })
]

exports.update_post_get = asyncHandler(async (req, res, next) => {
    let post = await Post.findById(req.params.id).exec();
    return res.status(200).json({
        title: 'Update',
        post: post,
    })
})

exports.update_post_post = [
    body('title').trim().isLength({ min: 1, max: 30 }).withMessage('Title must be between 1 and 30 characters'),
    body('text').trim().isLength({ min: 1, max: 160 }).withMessage('Text must be between 1 and 160 characters'),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const post = new Post({
            title: req.body.title,
            text: req.body.text,
            author: req.user._id,
            _id: req.params.id,
        })
        if (!errors.isEmpty()) {
            return res.status(403).json({
                message: 'New Post',
                errors: errors.array(),
            })
        } else {
            await Post.findByIdAndUpdate(req.params.id, post);
            res.status(200).json({
                message: 'Post create successfully',
                post: post,
            })
        }
    })
]

exports.publish_post = asyncHandler(async (req, res, next) => {
    
})

exports.delete_post_get = asyncHandler(async (req, res, next) => {

})

exports.delete_post_post = asyncHandler(async (req, res, next) => {

})