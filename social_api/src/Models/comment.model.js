const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    content:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;