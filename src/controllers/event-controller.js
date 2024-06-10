const courtService = require("../services/court-service")
const eventService = require("../services/event-service")
const createError = require("../utils/create-error")

const eventController = {}

eventController.createEvent = async (req, res, next) => {
    try {
        const data = req.body
        const existCourt = await courtService.findCourtById(data.courtId)
        if (!existCourt) {
            return createError(400, "court not found")
        }
        if (!data.eventDay) {
            return createError(400, "event must have day")
        }
        if (!data.name) {
            data.name = existCourt.name + "-by-" + req.user.userName
        }
        data.creatorId = req.user.id
        await eventService.createEvent(data)
        res.json({ message: data })
    } catch (error) {
        next(error)
    }
}

eventController.getAllEvent = async (req, res, next) => {
    try {
        const events = await eventService.getAllEvent()
        res.status(200).json({ events })
    } catch (error) {
        next(error)
    }
}

eventController.getEventById = async (req, res, next) => {
    try {
        const events = await eventService.getEventById(+req.params.eventId)
        if (!events) {
            return createError(400, "event not found")
        }
        res.status(200).json({ events })
    } catch (error) {
        next(error)
    }
}

// eventController.getEventByDate = async (req, res, next) => {
//     try {
//         const events = await eventService.getEventByDate()
//     } catch (error) {
//         next(error)
//     }
// }
eventController.getEventByCourtId = async (req, res, next) => {
    try {
        const events = await eventService.getEventByCourtId(+req.params.courtId)
        if (!events) {
            return createError(400, "no event in this court")
        }
        res.status(200).json({ events })
    } catch (error) {
        next(error)
    }
}

eventController.updateEvent = async (req, res, next) => {
    try {
        const selectEvent = await eventService.getEventById(+req.params.eventId)
        if (!selectEvent) {
            return createError(400, "event not found")
        }
        delete selectEvent.createdAt
        delete selectEvent.updatedAt

        const data = req.body
        const updateData = { ...selectEvent, ...data }
        await eventService.updateEvent(+req.params.eventId, updateData)
        res.status(200).json({ events: updateData })
    } catch (error) {
        next(error)
    }
}

eventController.deleteEvent = (req, res, next) => {

}

module.exports = eventController;