const express = require('express');
const router = express.Router();
const PostController = require('../Controllers/post.controller');
const verifyToken = require('../Middlewares/verifyToken');


router.get('/posts', PostController.GetPosts)
router.post('/post', verifyToken, PostController.AddPost)
router.delete('/post', verifyToken, PostController.DeletePost)


module.exports = router;