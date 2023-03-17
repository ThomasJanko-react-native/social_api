const User = require('../Models/user.model')
const Post = require('../Models/post.model')


//création utilisateur
exports.AddPost = async (req, res) => {

    try {
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.userId
        });
        const savedPost = await newPost.save();
        const updatedUser = await User.findOneAndUpdate({_id: req.userId}, {$push: {posts: savedPost._id}}, {new: true}).exec();
        console.log(updatedUser);
        res.status(201).send(savedPost);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.GetPosts =(req, res)=>{
    Post.find().populate('author')
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
