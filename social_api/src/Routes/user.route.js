const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/user.controller')
const verifyToken = require('../Middlewares/verifyToken')

router.post('/login', UserController.Login)
router.post('/register', UserController.Register)
router.get('/auth', verifyToken,  UserController.GetAuthUser)
router.get('/users',  UserController.GetUsers)


module.exports = router;