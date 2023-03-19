const User = require('../Models/user.model')
const Post = require('../Models/post.model');
const Comment = require('../Models/comment.model');


//création utilisateur
exports.AddPost = async (req, res) => {
    try {
      // Create a new comment using the Comment model
      const newComment = new Comment({
        author: req.userId,
        content: req.body.content
      });
  
      // Create a new post using the Post model
      const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.userId,
        image: req.body.image,
        comments: [newComment]
      });
  
      // Save the new post and comment to the database
      await newPost.save();
      await newComment.save();
  
      // Return the new post and comment to the client
      res.status(201).json({ post: newPost, comment: newComment });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  };

exports.GetPosts =(req, res)=>{
    console.log('API GET POSTS')
    Post.find().populate('author').populate({path: 'comments', populate: {path: 'author'}})
    .then((posts)=>{
         res.send(posts)
    })
    .catch((err)=>{
        res.status(500).send(err)
    })
}
exports.GetMyPosts =(req, res)=>{
    // console.log(req.userId)
    User.findById(req.userId).populate('posts')
    .then((user)=>{
        res.send(user)
    })
    .catch((err)=>{
        res.status(500).send(err)
    })
}
exports.GetPlaceId =(req, res)=>{
    Post.findById(req.params.id).populate('author')
    .then((place)=>{
        res.send(place)
    })
    .catch((err)=>{
        res.status(500).send(err)
    })
}
exports.DeletePost =(req, res)=>{
    console.log(req.body);
    if(req.body.author == req.userId){
        Post.findByIdAndDelete(req.body._id)
        .then((place)=>{
            res.status(200).json({
                message: `Post with ID ${req.params.id} successfully deleted.`
            });
        })
        .catch((err)=>{
            res.status(500).send(err)
        })
    }
    else{
        return res.status(403).json({
            error: 'You are not authorized to delete this post.'
          });
    }
   
}

//ajouter un commentaire
exports.AddComment = async (req, res) => {
    try {
        const postId = req.params.id;

        const comment = new Comment({
            author: req.userId, 
            content: req.body.content,
        });
        await comment.save();
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: comment } },
            { new: true }
        );

        res.status(200).send(updatedPost);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
