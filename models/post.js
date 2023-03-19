const mongoose = require('mongoose')
const Schema = mongoose.Schema
const postSchema = new Schema(
    {
        date: String,
        post: String,
        private: Boolean
    }, {timestamps: true}
)

const Post = mongoose.model('Post', postSchema)
module.exports = Post