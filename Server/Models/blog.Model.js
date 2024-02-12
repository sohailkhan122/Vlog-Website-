const mongoose = require('mongoose');

const createBlogSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    userCreate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    userCreateName: {
        type: String,
        required: true,
    },
    image: {
        data: Buffer,
        contentType: String,
    },
}, {
    timestamps: true
});

const createBlog = mongoose.model('CreateBlog', createBlogSchema);

module.exports = createBlog;
