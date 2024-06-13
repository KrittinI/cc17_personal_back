const createError = require("../utils/create-error")

const adminValidate = (req, res, next) => {
    if (!req.user.isAdmin) {
        return createError(403, "User have no permission")
    }
    next()
}

module.exports = adminValidate