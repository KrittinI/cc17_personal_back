const express = require('express')
const authController = require('../controllers/auth-controller')
const authenticate = require('../middlewares/authenticate')

const authRouter = express.Router()

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.get('/me', authenticate, authController.getMe)


module.exports = authRouter