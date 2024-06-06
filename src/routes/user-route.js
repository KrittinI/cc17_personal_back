const express = require('express');
const userController = require('../controllers/user-controller');

const userRouter = express.Router()

userRouter.get('/:userId', userController.getUserById)
userRouter.patch('/', userController.updateProfile)

module.exports = userRouter;