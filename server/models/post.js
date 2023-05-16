const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PostSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true, maxLength: 40, minLength: 2 },
    text: { type: String, required: true, minLength: 10 },
    publish: { type: Boolean, default: false },
    time: { type: Date, default: Date.now, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
    likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    likeCount: { type: Number, default: 0 },
})

PostSchema.virtual('adminUrl').get(function() {
    console.log(this.id);
    return `/admin/post/${this.id}`
})

PostSchema.virtual('url').get(function() {
    return `/blog/posts/${this.id}`
})

module.exports = mongoose.model('Post', PostSchema);