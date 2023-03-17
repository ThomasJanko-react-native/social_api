const express = require('express');
const router = express.Router();
const UserRouter = require('./user.route.js')
const PostRouter = require('./post.route')

router.use('/user', UserRouter);
router.use('/post', PostRouter);
// router.use('/comment', CommentRouter);

module.exports = router;