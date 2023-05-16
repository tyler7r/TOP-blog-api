const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: { type: String, required: true, maxLength: 15, minLength: 2 },
    password: { type: String, required: true, minLength: 3 },
    admin: { type: Boolean, default: false},
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
})

module.exports = mongoose.model('User', UserSchema);