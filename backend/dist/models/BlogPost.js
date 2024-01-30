"use strict";
const mongoose = require('mongoose');
const blogPostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});
const BlogPost = mongoose.model('BlogPost', blogPostSchema);
module.exports = BlogPost;
