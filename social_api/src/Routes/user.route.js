const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/user.controller')

router.get('/test', UserController.Test)
router.post('/login', UserController.Login)
router.post('/register', UserController.Register)


module.exports = router;