const express = require('express');
const router = express.Router();
const PostController = require('../Controllers/post.controller');
const CommentController = require('../Controllers/comment.controller');
const verifyToken = require('../Middlewares/verifyToken');


router.post('/comment', verifyToken, CommentController.AddComment)


module.exports = router;