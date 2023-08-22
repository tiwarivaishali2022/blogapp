const mongoose = require('mongoose');
const { Schema, model } = mongoose

const PostSchema = new Schema({
    title: String,
    summary: String,
    content: String,
    image: String,
    filepath: String,
    cover: String,
    category: String,
    author: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    comments: {
        type: Schema.Types.ObjectId, ref: 'Comment'
    },
}, {
    timestamps: true
});

const PostModel = model('Post', PostSchema)

module.exports = PostModel;