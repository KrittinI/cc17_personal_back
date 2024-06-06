const createError = require("../utils/create-error")

// username, firstname, lastname, email, phone, password
const validator = {}

validator.register = (req, res, next) => {
    const { ...data } = { ...req.body }

    if (data.password !== data.confirmPassword) {
        return createError(400, "password and confirm password is not match")
    }




    next()
}

module.exports = validator