const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'user' },
    post: { type: Schema.Types.ObjectId, ref: 'post' },
    text: { type: String, maxLength: 160, required: true },
    likes: { type: Number, default: 0 },
    timeStamp: { type: Date, default: Date.now, required: true },
    likes: [{type: Schema.Types.ObjectId, ref: 'user'}]
})

module.exports = mongoose.model('Comment', CommentSchema);