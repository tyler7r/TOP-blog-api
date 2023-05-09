const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PostSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true, maxLength: 40, minLength: 2 },
    text: { type: String, required: true, minLength: 10 },
    time: { type: Date, default: new Date() },
})

PostSchema.virtual('url').get(function() {
    return `/blog/posts/${this.id}`
})

module.exports = mongoose.model('Post', PostSchema);