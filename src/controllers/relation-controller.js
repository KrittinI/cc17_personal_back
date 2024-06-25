const eventService = require("../services/event-service");
const relationService = require("../services/relation-service");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");

const relationController = {}

relationController.createRealation = async (req, res, next) => {
    try {
        const existEvent = await eventService.findEventById(+req.params.eventId)
        if (!existEvent) {
            createError(400, "Event not exist")
        }
        if (existEvent.status !== "OPENED") {
            createError(400, "Too late to join this event")
        }
        const existRelation = await relationService.findRelation(+req.params.eventId, req.user.id)
        if (existRelation) {
            createError(400, "You already have relation with this event")
        }
        const playerInEvent = await relationService.countPlayerInEvent(+req.params.eventId)
        if (existEvent.limit !== 0 && existEvent.limit <= playerInEvent._count.id) {
            createError(400, "This event is already full")
        }
        const data = { eventId: +req.params.eventId, playerId: req.user.id }
        await relationService.createRelation(data)
        res.status(201).json({ relations: data })
    } catch (error) {
        next(error)
    }
}

relationController.getPlayerFromEventId = async (req, res, next) => {
    try {
        const existEvent = await eventService.findEventById(+req.params.eventId)
        if (!existEvent) {
            createError(400, "Event not exist")
        }
        const players = await relationService.getPlayerFromEventId(+req.params.eventId)
        res.status(200).json({ players })
    } catch (error) {
        next(error)
    }
}

relationController.getEventByUserId = async (req, res, next) => {
    try {
        const exisitUser = await userService.findUserById(+req.params.userId)
        if (!exisitUser) {
            createError(400, "User not exist")
        }
        const userEvents = await relationService.getEventByUserId(+req.params.userId)
        res.status(200).json({ relations: userEvents })
    } catch (error) {
        next(error)
    }
}

relationController.deleteRelationByUser = async (req, res, next) => {
    try {
        const existEvent = await eventService.findEventById(+req.params.eventId)
        if (!existEvent) {
            createError(400, "Event not exist")
        }
        const existRelation = await relationService.findRelation(+req.params.eventId, req.user.id)
        if (!existRelation) {
            createError(400, "You don't have relation with this event")
        }
        await relationService.deleteRelationByUser(existRelation.id)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}

relationController.deleteRelationByCreator = async (req, res, next) => {
    try {
        const existEvent = await eventService.findEventById(+req.params.eventId)
        if (!existEvent) {
            createError(400, "Event not exist")
        }
        if (existEvent.creatorId !== req.user.id) {
            createError(403, "No permission on this Event")
        }
        const existRelation = await relationService.findRelation(+req.params.eventId, +req.params.userId)
        if (!existRelation) {
            createError(400, "You don't have relation with this event")
        }
        await relationService.deleteRelationByUser(existRelation.id)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}

relationController.deleteAllPlayerByEventId = async (req, res, next) => {
    try {
        const existEvent = await eventService.findEventById(+req.params.eventId)
        if (!existEvent) {
            createError(400, "Event not exist")
        }
        console.log(existEvent.creatorId);
        if (existEvent.creatorId !== req.user.id) {
            createError(400, "No permission on this Event")
        }
        await relationService.deleteAllPlayerByEventId(+req.params.eventId)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}

module.exports = relationController