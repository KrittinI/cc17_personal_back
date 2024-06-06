const prisma = require("../models/prisma")

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
    where: { id }
})

module.exports = userService