const Post = require('../Models/post.model');

exports.AddComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const comment = req.body.comment;
        const updatedPost = await Post.findOneAndUpdate({_id: postId}, {$push: {comments: comment}}, {new: true}).exec();
        res.status(200).send(updatedPost);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}