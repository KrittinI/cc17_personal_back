const prisma = require("../models/prisma")

const eventService = {}

eventService.createEvent = (data) => prisma.event.create({ data })

eventService.getAllEvent = () => prisma.event.findMany({
    include: {
        users: {
            select: {
                userName: true
            }
        },
        courts: {
            select: {
                name: true
            }
        }
    }
})

eventService.getEventById = (id) => prisma.event.findFirst({
    where: { id },
    include: {
        users: {
            select: {
                userName: true,
                mobile: true,
                profileImage: true
            }
        },
        courts: {
            select: {
                name: true,
                location: true,
                courtImage: true
            }
        }
    }
})
eventService.getEventByCourtId = (courtId) => prisma.event.findMany({
    where: { courtId },
    include: {
        users: {
            select: {
                userName: true
            }
        }
    }
})

// eventService.getEventByDate = (date) => prisma.event.findFirst({
//     where: { eventDay: date }
// })

eventService.updateEvent = (id, data) => prisma.event.updateMany({
    where: { id },
    data
})

module.exports = eventService;