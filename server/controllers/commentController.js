const Comment = require('../models/comment');
const Post = require('../models/post');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.create_comment_post = [
    body('comment_username', 'Username must be specified').trim().isLength({ min: 1 }),
    body('comment', 'Comment must be between 1 and 160 characters').trim().isLength({ min: 1, max: 160 }),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const comment = new Comment({
            author: req.user._id,
            post: req.params.postId,
            text: req.body.comment,
        })
        if (!errors.isEmpty()) {
            return res.status(403).json({
                message: 'New Comment',
                errors: errors.array()
            })
        } else {
            await comment.save()
            let post = await Post.findOneAndUpdate({_id: req.params.postId}, { $push: {comments: comment}}).exec();
            res.status(200).json({
                message: 'Comment created successfully',
                comment: comment,
                post: post,
            })
        }
    })
]

exports.delete_comment = asyncHandler(async (req, res, next) => {

})