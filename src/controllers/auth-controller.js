const userService = require("../services/user-service");
const createError = require("../utils/create-error");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uuid = require('uuid').v4

const authController = {}

authController.register = async (req, res, next) => {
    try {
        const data = req.body

        if (data.password !== data.confirmPassword) {
            return createError(400, "password and confirm password is not match")
        }

        if (isNaN(Number(data.mobile))) {
            return createError(400, "phonenumber is not correct")
        }
        const index = data.email.indexOf('@')
        if (index === -1) {
            return createError(400, "email is not correct")
        }

        if (data.email.lastIndexOf('.') === data.email.length - 1 || !data.email.includes('.', index)) {
            return createError(400, "email is not correct")
        }

        if (!(data.userName && data.firstName && data.lastName)) {
            return createError(400, "please fill all form")
        }

        const exisitUser = await userService.findExistUser(req.body)
        console.log(exisitUser);
        if (exisitUser?.userName === data.userName) {
            return createError(400, "username has been used")
        }

        if (exisitUser?.email === data.email || exisitUser?.mobile === data.mobile) {
            return createError(400, "email or mobile has been used")
        }

        data.password = await bcrypt.hash(data.password, 10)
        delete data.confirmPassword
        await userService.createUser(data)
        res.status(201).json({ message: "Create Success" })
    } catch (error) {
        next(error)
    }
}

authController.login = async (req, res, next) => {
    try {
        const existUser = await userService.findExistUser(req.body)
        if (!existUser) {
            return next(createError(400, "user not found"))
            // createError(400, "user not found")
        }
        const isMatch = await bcrypt.compare(req.body.password, existUser.password)
        if (!isMatch) {
            // createError(400, "username, email, mobile or password is not correct")
            return next(createError(400, "incorrect username, email, mobile or password"))
        }
        const accessToken = jwt.sign({ id: existUser.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.status(200).json({ accessToken })
    } catch (error) {
        next(error)
    }
}

authController.getMe = (req, res, next) => {
    res.status(200).json({ user: req.user })
}

authController.verify = async (req, res, next) => {
    // console.log("Query from", req.query.id);
    const exisitUser = await userService.findUserById(+req.query.id)
    // await userService.updateProfile(+req.query.id, { isAdmin: false })
    console.log(exisitUser);
    res.status(200).json({ user: req.user })
}

authController.preregister = async (req, res, next) => {
    const register = req.body
    register.password = await bcrypt.hash(register.password, 10)
    console.log(register);
    const id = uuid()
    console.log(id);
    const data = { [id]: register }
    console.log(data);



    res.status(200).json({ register: register })
}

module.exports = authController