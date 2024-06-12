const prisma = require("../models/prisma")

const userFiltered = {
    id: true,
    userName: true,
    firstName: true,
    lastName: true,
    email: true,
    mobile: true,
    profileImage: true,
    isAdmin: true
}


const userService = {}

userService.findExistUser = (data) => prisma.user.findFirst({
    where: {
        OR: [
            { userName: data.userName }, { email: data.email }, { mobile: data.mobile }
        ]
    }
})

userService.createUser = (data) => prisma.user.create({ data })

userService.findUserById = (id) => prisma.user.findFirst({
    where: { id },
    select: userFiltered
})
userService.findUserByUserName = (userName) => prisma.user.findFirst({
    where: { userName }
})
userService.findUserByEmail = (email) => prisma.user.findFirst({
    where: { email }
})
userService.findUserByMobile = (mobile) => prisma.user.findFirst({
    where: { mobile }
})

userService.updateProfile = (id, data) => prisma.user.updateMany({
    where: { id },
    data,
})

module.exports = userService