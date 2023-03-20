const mongoose = require('mongoose')
const Schema = mongoose.Schema
const postSchema = new Schema(
    {
        date: {type: String, required: true},
        post: {type: String, required: true},
        private: Boolean
    }, {timestamps: true}
)

const Post = mongoose.model('Post', postSchema)
module.exports = Post