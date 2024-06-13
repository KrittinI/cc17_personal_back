const prisma = require("../models/prisma")

const userFiltered = {
    id: true,
    userName: true,
    firstName: true,
    lastName: true,
    email: true,
    mobile: true,
    profileImage: true,
}

const relationService = {}

relationService.findRelation = (eventId, playerId) => prisma.eventrelation.findFirst({
    where: {
        eventId,
        playerId
    }
})

relationService.createRelation = (data) => prisma.eventrelation.create({
    data
})

relationService.getPlayerFromEventId = eventId => prisma.eventrelation.findMany({
    where: { eventId },
    include: {
        users: {
            select: {
                userName: true,
                profileImage: true
            }
        }
    }
})

relationService.countPlayerInEvent = (eventId) => prisma.eventrelation.aggregate({
    where: { eventId },
    _count: {
        id: true
    }
})

relationService.getEventByUserId = playerId => prisma.eventrelation.findMany({
    where: { playerId },
    include: {
        events: {
            include: {
                courts: true,
                users: {
                    select: userFiltered
                }
            }
        }
    }
})

relationService.deleteRelationByUser = (id) => prisma.eventrelation.delete({
    where: { id }
})

relationService.deleteAllPlayerByEventId = (eventId) => prisma.eventrelation.deleteMany({
    where: { eventId }
})

module.exports = relationService