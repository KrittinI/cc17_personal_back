const userService = require("../services/user-service")
const createError = require("../utils/create-error")
const bcrypt = require('bcryptjs')

const userController = {}

userController.getUserById = async (req, res, next) => {
    try {
        const exisitUser = await userService.findUserById(+req.params.userId)
        if (!exisitUser) {
            createError(400, "user not found")
        }
        delete exisitUser.password
        res.status(200).json({ userProfile: exisitUser })
    } catch (error) {
        next(error)
    }
}

userController.updateProfile = async (req, res, next) => {
    try {
        const data = req.body
        const exisitUserName = await userService.findUserByUserName(data?.userName)
        const exisitEmail = await userService.findUserByEmail(data?.email)
        const exisitMobile = await userService.findUserByMobile(data?.mobile)
        if (data.userName) {
            if (exisitUserName?.userName === data.userName && exisitUserName.id !== req.user.id) {
                return createError(400, "username has been used")
            }
        }
        if (data.email) {
            if (exisitEmail?.email === data.email && exisitEmail.id !== req.user.id) {
                return createError(400, "email has been used")
            }
        }
        if (data.mobile) {
            if (exisitMobile?.mobile === data.mobile && exisitMobile.id !== req.user.id) {
                return createError(400, "mobile has been used")
            }
        }
        if (data.password) {
            data.password = await bcrypt.hash(data?.password, 10)
        }
        const myProfile = await userService.findUserById(req.user.id)
        console.log(myProfile);
        const updateData = { ...myProfile, ...data }
        // delete updateData.createdAt
        // delete updateData.isActive
        // delete updateData.isAdmin
        // delete updateData.updatedAt

        await userService.updateProfile(req.user.id, updateData)
        delete updateData.password

        res.json({ userProfile: updateData })
    } catch (error) {
        next(error)
    }
}

module.exports = userController;
