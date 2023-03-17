
const bcrypt = require('bcrypt');
const User = require('../Models/user.model')
const jwt = require('jsonwebtoken');

exports.Test= (req, res) => {
    console.log('test request url /test')
    
    res.send({
        message: 'Status: 200',
        auth: false,
        products: [
            {
                id:1,
                name: 'product1'
            },
            {
                id:2,
                name: 'product2'
            },
        ]
    })  
}

exports.Login =(req, res) => {
   
        const email = req.body.email.toLowerCase();
        const password = req.body.password
       
        User.findOne({email: email }, function(err, user) {
            if(err){ return res.status(404)}
            if(user){
                bcrypt.compare(password,
                    user.password, function(err, result) {
                        if(!!result){
                            console.log('Login Successful')
                            var token = jwt.sign({id: user.id },process.env.JWT_SECRET );//process.env.JWT_SECRET
                            res.status(200).send(token);
                            
                        }
                        else{
                            console.log('Password Incorrect')
                            res.status(404).send(err)
                        }
                    }
                )
            }
            else{res.status(404).send('Email or Password Incorrect')}
        })
}

//création utilisateur
exports.Register =(req, res) => {
    console.log('Register API')

    if(!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName){
        return res.status(404).send({
            auth: false,
            message: 'Missing fields'
        })
    }
       const firstName= req.body.firstName
       const lastName= req.body.lastName
       const email= req.body.email.toLowerCase()
       const password = req.body.password
       const avatar = req.body.avatar
//Hash password
    bcrypt.hash(password, 6)
    .then(hashedPassword => {
        const newUser = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword,
                avatar: avatar
            });
            newUser.save()
            .then((user)=>{
                var token = jwt.sign({id: user.id }, process.env.JWT_SECRET);//Math.floor(Date.now() / 1000) + (60 * 60)
                res.send(token);
                // res.send({user, token});
            })
            .catch((err)=>{
                res.status(404).send(err)
            });
        });
}


//update User Auth
exports.EditMe =(req, res) =>{
    User.findByIdAndUpdate(req.userId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isAdmin: req.body.isAdmin,
        //password: req.body.password,
        avatar: req.body.avatar
    }, {new: true}) //retourne User avec changements
    .then((user)=>{
        res.send(user);
    })
    .catch((err)=>{
        res.status(404).send(err)
    })
}



//FindUserbyId
exports.GetOneUser = (req, res)=>{
    User.findById(req.params.id)
    // User.findById(req.userId)
    .then((users)=>{
        res.send(users)
    })
    .catch((err)=>{
        res.status(500).send(err)
    })
}
//GetAuthUser
exports.GetAuthUser = (req, res)=>{
    // User.findById(req.params.id)
    // console.log(req.userId)
    User.findById(req.userId).populate('posts')
    // .populate('posts').populate({path: 'posts', populate: {path: 'author'}})
    .then((users)=>{
        res.send(users)
    })
    .catch((err)=>{
        res.status(500).send(err)
    })
}

//findAllUsers
exports.GetUsers =(req, res)=>{
    User.find().populate('places')
    .then((users)=>{
         res.send(users)
        // res.status(200).json(users)

    })
    .catch((err)=>{
        res.status(500).send(err)
    })


}
