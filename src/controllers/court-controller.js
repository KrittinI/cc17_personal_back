const courtService = require("../services/court-service");
const createError = require("../utils/create-error");

const courtController = {}

courtController.createCourt = async (req, res, next) => {
    try {

        if (!req.body.name && !req.body.mobile) {
            return createError(400, "invalid name or mobile")
        }
        if (!req.body.name.trim() || !req.body.mobile.trim()) {
            return createError(400, "fill name or mobile")
        }
        if (isNaN(req.body.mobile)) {
            return createError(400, "invalid mobile")
        }

        const existCourt = await courtService.findExistCourt(req.body.name)
        if (existCourt) {
            createError(400, "court name already existed")
        }

        await courtService.createCourt(req.body)
        res.json({ message: "adding court done" })
    } catch (error) {
        next(error)
    }
}

courtController.getAllCourt = async (req, res, next) => {
    try {
        const allCourt = await courtService.getAllCourt()
        res.status(200).json({ courts: allCourt })
    } catch (error) {
        next(error)
    }
}

courtController.getCourtById = async (req, res, next) => {
    try {
        const foundCourt = await courtService.findCourtById(+req.params.courtId)
        if (!foundCourt) {
            return createError(400, "court not found")
        }
        res.status(200).json({ courts: foundCourt })
    } catch (error) {
        next(error)
    }
}
courtController.getCourtByPrice = async (req, res, next) => {
    try {
        const foundCourt = await courtService.getCourtByPrice(+req.params.min, +req.params.max)
        if (!foundCourt.length) {
            return createError(400, "court not found")
        }
        res.status(200).json({ courts: foundCourt })
    } catch (error) {
        next(error)
    }
}

courtController.updateCourt = async (req, res, next) => {
    try {
        const foundCourt = await courtService.findCourtById(+req.params.courtId)
        if (!foundCourt) {
            return createError(400, "court not found")
        }
        if (req.body.name && !req.body.name?.trim()) {
            createError(400, "court must have name")
        }
        if (req.body.mobile && !req.body.mobile?.trim()) {
            createError(400, "court must have mobile")
        }
        if (req.body.mobile && isNaN(req.body.mobile)) {
            return createError(400, "invalid mobile")
        }
        const updateData = { ...foundCourt, ...req.body }
        await courtService.updateCourt(+req.params.courtId, updateData)
        res.status(200).json({ courts: updateData })
    } catch (error) {
        next(error)
    }
}

module.exports = courtController;