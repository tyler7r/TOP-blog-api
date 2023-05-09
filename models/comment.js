const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    text: { type: String, maxLength: 160, required: true },
    likes: { type: Number, default: 0 },
})

module.exports = mongoose.model('Comment', CommentSchema);