const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 2,
        maxLength: 50,
    },

    lastName:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 2,
        maxLength: 50,
    },

    email:{
        type: String,
        required: true,
        unique: true,

    },

    password:{
        type: String,
        required: true,
        minLength: 4,
        maxLength: 100,
    },
  
    
    avatar: {
        type: String,
        required: false,
        default: 'https://cdn-icons-png.flaticon.com/512/147/147144.png'

    },
    posts:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Post"
        }
    ],
    
});
     

module.exports = mongoose.model('User', userSchema)
